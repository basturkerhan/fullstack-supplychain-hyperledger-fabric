/*
 * Copyright IBM Corp. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;
const OrderState = {
    ORDER_CREATED: 1,       // Producer
    SHIPMENT_ASSIGNED: 2,   // Producer
    SHIPMENT_CREATED: 3,    // Shipper
    SHIPMENT_IN_TRANSIT: 4, // Shipper
    SHIPMENT_RECEIVED: 5,    // Retailer
    SUBPRODUCT_ADDED: 6,
    SUBPRODUCT_CONFIRMED: 7
};

class SupplychainContract extends Contract {

    // Init function
    async InitLedger(ctx) {
        console.info(`Chaincode Initialized`);
    }

    async ToBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    async SelectOrderByID(ctx, orderId) {
        let orderAsBytes = await ctx.stub.getState(orderId);
        if(!(orderAsBytes && this.IsVariableConfirmed(orderAsBytes.length))) {
            return null;
        }

        return JSON.parse( orderAsBytes );
        // throw new Error(`The order ${id} does not exist`);
        // return orderJSON.toString();
    }

    async SignIn(ctx, username, password) { 
        if(username == 'admin' && password == 'adminpw'){
            return {status: true, id: username, role: 'admin'};
        }

        let cid = new ClientIdentity(ctx.stub); 
        if (cid.assertAttributeValue('pswd', password)) {
            return {
                status: true,
                id: username,
                role: cid.getAttributeValue('role')
            }
        }
        return {status: false, error: {message: 'Incorrect Password!! Please try again'}};
    }

    async CreateProduct(
        ctx,
        userid, 
        orderId, 
        productId,
        productName,
        productColor,
        productDescription,
        productPrice,
        productQuantity,
        producerId,
        retailerId
    ) {
        // Access Control: This transaction should only be invoked by a Producer or Admin
        if(!(this.IsAdmin(userid) || this.IsProducer(ctx, userid))) {
            return {status: false, message: `This user ${userid} does not have access to create an order!!`};
        }

        let order = await this.SelectOrderByID(ctx, orderId);
        // Check if an order already exists with id=orderId
        if (order != null) {
            return {status: false, message: `Order with orderId ${orderId} already exists`};
        }

        order = {
            ID: orderId,
            productId: productId,
            productPrice: productPrice,
            productQuantity: productQuantity,
            productName: productName,
            productColor: productColor,
            productDescription: productDescription,
            producerId: producerId,
            productChildProducts: [],
            retailerId: retailerId,
            currentState: OrderState.ORDER_CREATED,
            modifiedBy:userid,
        };
        const result = await ctx.stub.putState(orderId, Buffer.from(JSON.stringify(order)));
        return {status: true,  result:result, message: `Order ${orderId} Successfully Created!!`};     
    }

    async AddChildProduct(ctx, userid, parentOrderId, childOrderId) {
        // parent order ID geldi mi?
        if (!this.IsVariableConfirmed(parentOrderId.length)) {
            return {status: false, message: `Parent OrderId is required as input!!`};
        }
        // child order ID geldi mi?
        if (!this.IsVariableConfirmed(childOrderId.length)) {
            return {status: false, message: `Child ShipperId is required as input!!`};
        }
        // parent order mevcut mu?
        let parentOrder = await this.SelectOrderByID(ctx, parentOrderId);
        if (parentOrder == null) {
            return {status: false, message: `Order with orderId ${parentOrderId} not exists`};
        }
        // child order mevcut mu?
        let childOrder = await this.SelectOrderByID(ctx, childOrderId);
        if (childOrder == null) {
            return {status: false, message: `Order with orderId ${childOrderId} not exists`};
        }
        // child ekleyen kişi parent in sahibi mi?
        if( !(this.IsAdmin(userid) || this.IsProductOwner(userid, parentOrder)))
            return {status: false, message: `${userid} does not have access to assign a shipper to order ${parentOrderId}!!`};
        // parent teslim edilmişse ona alt ürün eklenemesin
        if (parentOrder.currentState == OrderState.SHIPMENT_RECEIVED)
            return {status: false, message: `${order.ID} is in Order Received State!!`};
        // child henüz teslim edilmemişse alt ürün olarak eklenemesin
        if (childOrder.currentState != OrderState.SHIPMENT_RECEIVED)
            return {status: false, message: `${order.ID} is not in Order Received State!!`};

        parentOrder.productChildProducts = [...parentOrder.productChildProducts, {
            childOrderId: childOrderId,
            childOrderName: childOrder.productName
        }];
        order.currentState = OrderState.SUBPRODUCT_ADDED;
        order.modifiedBy = userid;
        const result = await ctx.stub.putState(parentOrder.ID, Buffer.from(JSON.stringify(parentOrder)));
        return {status: true,  result:result, message: `Child order ${childOrderId} succesfully added to ${parentOrderId}!!`};
    }

    async AssignShipper(
        ctx,
        userid, 
        orderId, 
        newShipperId
    ) {
        if (!this.IsVariableConfirmed(orderId.length)) {
            return {status: false, message: `OrderId is required as input!!`};
        }
        if (!this.IsVariableConfirmed(newShipperId.length)) {
            return {status: false, message: `ShipperId is required as input!!`};
        }

        let order = await this.SelectOrderByID(ctx, orderId);
        // Check if an order already exists with id=orderId
        if (order == null) {
            return {status: false, message: `Order with orderId ${orderId} not exists`};
        }

        // Access Control: This transaction should only be invoked by designated Producer
        if( !(this.IsAdmin(userid) || this.IsProductOwner(userid, order)))
            return {status: false, message: `${userid} does not have access to assign a shipper to order ${orderId}!!`};

        if (order.currentState != OrderState.ORDER_CREATED)
            return {status: false, message: `${order.ID} is not in Order Created State!!`};

        // Change currentOrderState to SHIPMENT_ASSIGNED;
        order.currentState = OrderState.SHIPMENT_ASSIGNED;
        order.shipperId = newShipperId;
        order.modifiedBy = userid;
        const result = await ctx.stub.putState(order.ID, Buffer.from(JSON.stringify(order)));
        return {status: true,  result:result, message: `Order ${orderId} Successfully Assigned to ${newShipperId}!!`};
    }



    async CreateShipment(
        ctx,
        userid, 
        orderId, 
        trackingInfo
    ) {
        if (!this.IsVariableConfirmed(orderId.length)) {
            return {status: false, message: `OrderId is required as input!!`};
        }
        if (!this.IsVariableConfirmed(trackingInfo.length)) {
            return {status: false, message: `ShipperId is required as input!!`};
        }

        let order = await this.SelectOrderByID(ctx, orderId);
        // Check if an order already exists with id=orderId
        if (order == null) {
            return {status: false, message: `Order with orderId ${orderId} not exists`};
        }

        // Access Control: This transaction should only be invoked by designated Producer
        if( !(this.IsAdmin(userid) || this.IsProductShipper(userid, order)))
            return {status: false, message: `${userid} does not have access to create a shipment to order ${orderId}!!`};

        if (order.currentState != OrderState.SHIPMENT_ASSIGNED)
            return {status: false, message: `${order.ID} is not in Shipment Assigned State!!`};

        // Change currentOrderState to SHIPMENT_ASSIGNED;
        order.currentState = OrderState.SHIPMENT_CREATED;
        order.trackingInfo = trackingInfo;
        order.modifiedBy = userid;
        const result = await ctx.stub.putState(order.ID, Buffer.from(JSON.stringify(order)));
        return {status: true,  result:result, message: `Order ${orderId} Successfully Create Shipment to ${trackingInfo}!!`};
    }




    // async CreateShipment(ctx,userid, orderId, newTrackingInfo) {
    //     //  NOTE: There is no shipment asset.  A shipment is created for each order.
    //     //  Shipment is tracked using order asset.
    //     if (!this.IsVariableConfirmed(orderId)) {
    //         return {status: false, message: `OrderId is required as input!!`};
    //     }
    //     if (!this.IsVariableConfirmed(newTrackingInfo)) {
    //         return {status: false, message: `Tracking # is required as input!!`};
    //     }

    //     // Retrieve the current order using key provided
    //     let order = await this.SelectOrderByID(ctx, orderId);
    //     if (order == null) {
    //         return {status: false, message: `Order with orderId = ${orderId} does not exist`};
    //     }

    //     // Access Control: This transaction should only be invoked by a designated Shipper
    //     // let userId = await this.getCurrentUserId(ctx);
    //     if (!(this.IsAdmin(userid) || this.IsProductShipper(userid, order)))
    //         return {status: false, message: `${userid} does not have access to create a shipment for order ${orderId}!!`};

    //     if (order.currentState != OrderState.SHIPMENT_ASSIGNED)
    //         return {status: false, message: `${order.ID} is not in Shipment Assigned State!!`};

    //     // Change currentOrderState to SHIPMENT_CREATED;
    //     order.currentState = OrderState.SHIPMENT_CREATED;
    //     order.trackingInfo = newTrackingInfo;
    //     order.modifiedBy = userid;
    //     const result = await ctx.stub.putState(order.ID, Buffer.from(JSON.stringify(order)));
    //     return {status: true,  result:result, message: `Shipment successfully created for Order ${orderId}!!`};
    // }

    async TransportShipment(ctx,userid, orderId) {
        if (!this.IsVariableConfirmed(orderId.length)) {
            return {status: false, message: `OrderId is required as input!!`};
        }

        let order = await this.SelectOrderByID(ctx, orderId);
        if (order == null) {
            return {status: false, message: `Order with orderId ${orderId} does not exists`};
        }

        if (!(this.IsAdmin(userid) || this.IsProductShipper(userid, order))) 
            return {status: false, message: `${userid} does not have access to transport shipment for order ${orderId}!!`};
            
        if (order.currentState != OrderState.SHIPMENT_CREATED)
            return {status: false, message: `${order.ID} is not in Shipment Created State!!`};
            
        // Change currentOrderState to SHIPMENT_IN_TRANSIT;
        order.currentState = OrderState.SHIPMENT_IN_TRANSIT;
        order.modifiedBy = userid;
        const result = await ctx.stub.putState(order.ID, Buffer.from(JSON.stringify(order)));
        return {status: true,  result:result, message: `Shipment successfully transported for Order ${orderId}!!`};
    }

    async ReceiveShipment(ctx,userid, orderId) {
        if (!this.IsVariableConfirmed(orderId.length)) {
            return {status: false, message: `OrderId is required as input!!`};
        }

        let order = await this.SelectOrderByID(ctx, orderId);
        if (order == null) {
            return {status: false, message: `Order with orderId ${orderId} does not exists`};
        }
   
        if (!(this.IsAdmin(userid) || this.IsProductRetailer(userid, order))) // This transaction should only be invoked by
            return {status: false, message: `${userid} does not have access to receive shipment for order ${orderId}!!`};

        if (order.currentState != OrderState.SHIPMENT_IN_TRANSIT)
            return {status: false, message: `${order.ID} is not in Shipment in Transit State!!`};
        // Change currentOrderState to SHIPMENT_RECEIVED;
        order.currentState = OrderState.SHIPMENT_RECEIVED;
        order.modifiedBy = userid;
        const result = await ctx.stub.putState(order.ID, Buffer.from(JSON.stringify(order)));
        return {status: true,  result:result, message: `Shipment successfully received for Order ${orderId}!!`};
    }

    async GetOrderHistory(ctx,userid, orderId) {
        let userType = await this.GetUserRole(ctx, userid);

        if (!this.IsVariableConfirmed(orderId.length)) {
            return {status: false, message: `OrderId is required as input!!`, variable:orderId};
        }
        // Retrieve the current order using key provided
        let order = await this.SelectOrderByID(ctx, orderId);
        if (order == null) {
            return {status: false, message: `Order with orderId = ${orderId} does not exist!!`};
        }

        // Access Control:
        if ((userType != "admin")             // admin only has access as a precaution.
            && (userType != "customer")      // Customers can see any order if it's in the correct state
            && (userType != "regulator")     // Regulators can see any order
            && (userid != order.producerId) // Only producer, retailer, shipper associated
            && (userid != order.retailerId) //      with this order can see its details
            && (userid != order.shipperId))
            return {status: false, message: `${userid} does not have access to order ${orderId}!!`};

        // Customer can only view order history if order has completed cycle
        if ((userType == "customer") && (order.currentState != OrderState.SHIPMENT_RECEIVED))
        return {status: false, message: `Information about order ${orderId} is not available to ${userid} yet. Order status needs to be SHIPMENT_RECEIVED!!`};
        // Get list of transactions for order
        const iterator = await ctx.stub.getHistoryForKey(orderId);
        const orderHistory = [];
        
        while (true) {
            let history = await iterator.next();
            if (history.value && history.value.value.toString()) {
                 let jsonRes = {};
                 jsonRes.TxId = history.value.tx_id;
                 
                 var d = new Date(0);
                 d.setUTCSeconds(history.value.timestamp.seconds.low);
                 jsonRes.Timestamp = d.toLocaleString("tr-TR");
                // Store Order details
                try {
                    jsonRes.Value = JSON.parse(history.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Value = history.value.value.toString('utf8');
                }

                // Add to array of transaction history on order
                orderHistory.push(jsonRes);
            }

            if (history.done) {
                await iterator.close();
                return orderHistory;
            }
        }  
    }

    GetUserRole(ctx, userid) {
        if(this.IsAdmin(userid))
            return "admin";

        let cid = new ClientIdentity(ctx.stub); 
        let userType = cid.getAttributeValue('role');
        return userType;
    }

    IsAdmin = (userId) => (userId == "admin");
    IsProducer = async(ctx, userid) => (await this.GetUserRole(ctx, userid) == "producer");
    IsProductOwner = (userId, product) => (userId == product.producerId);
    IsProductShipper = (userId, product) => (userId == product.shipperId);
    IsProductRetailer = (userId, product) => (userId == product.retailerId);
    IsVariableConfirmed = (variable) => (variable>0);
}

module.exports = SupplychainContract;