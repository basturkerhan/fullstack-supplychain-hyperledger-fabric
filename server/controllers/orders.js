require('dotenv').config()
const Network = require("../fabric/network");
const customResponse = require("../helpers/customResponse");
const contractName = process.env.CONTRACT;

const create = async (req,res) => {
    let {loggedUserOrganization, loggedUserId, loggedUserType, orderId, productId, productName, productColor, productDescription, productPrice,productQuantity,retailerId} = req.body;
    let producerId = (loggedUserType === "producer") ? loggedUserId : req.body.producerId;

    try {
        const network = await Network.connect(loggedUserOrganization, loggedUserId);
        if(network === null) {
            return customResponse.badRequest(res, "User not found");
        }
        const result = await Network.invoke(network, contractName, 'CreateProduct', loggedUserId, orderId, productId, productName, productColor, productDescription, productPrice, productQuantity, producerId, retailerId);
        return customResponse.success(res, "Creating order successfully", result);
    } catch (err) {
        return customResponse.badRequest(res, err.message);
    }
}

const history = async (req,res) => {
    const {orderId} = req.query;
    const {loggedUserOrganization, loggedUserId} = req.body;

    try {
        const network = await Network.connect(loggedUserOrganization, loggedUserId);
        if(network === null) {
            return customResponse.badRequest(res, "User not found");
        }
        const result = await Network.query(network, contractName, 'GetOrderHistory', loggedUserId, orderId);
        return customResponse.success(res, "Order History", result);
    } catch (err) {
        return customResponse.badRequest(res, err.message);
    }
}

const assign = async (req,res) => {
    const {loggedUserOrganization, loggedUserId, orderId, shipperId} = req.body;
    try {
        const network = await Network.connect(loggedUserOrganization, loggedUserId);
        if(network === null) {
            return customResponse.badRequest(res, "User not found");
        }
        const result = await Network.invoke(network, contractName, 'AssignShipper', loggedUserId, orderId, shipperId);
        return customResponse.success(res, "Assign  Shipper successfully", result);
    } catch (err) {
        return customResponse.badRequest(res, err.message);
    }
}

const createShipment = async (req, res) => {
    const {loggedUserOrganization, loggedUserId, orderId, trackingId} = req.body;
    try {
        const network = await Network.connect(loggedUserOrganization, loggedUserId);
        if(network === null) {
            return customResponse.badRequest(res, "User not found");
        }
        const result = await Network.invoke(network, contractName, 'CreateShipment', loggedUserId, orderId, trackingId);
        console.log(result);
        return customResponse.success(res, "Create Shipment successfully", result);
    } catch (err) {
        return customResponse.badRequest(res, err.message);
    }
}

const transportShipment = async (req, res) => {
    const {loggedUserId, orderId, loggedUserOrganization} = req.body;
    try {
        const network = await Network.connect(loggedUserOrganization, loggedUserId);
        if(network === null) {
            return customResponse.badRequest(res, "User not found");
        }
        const result = await Network.invoke(network, contractName, 'TransportShipment', loggedUserId, orderId);
        return customResponse.success(res, "Transport Shipment successfully", result);
    } catch (err) {
        return customResponse.badRequest(res, err.message);
    }
}

const receiveShipment = async (req, res) => {
    const {loggedUserId, orderId, loggedUserOrganization} = req.body;
    try {
        const network = await Network.connect(loggedUserOrganization, loggedUserId);
        if(network === null) {
            return customResponse.badRequest(res, "User not found");
        }
        const result = await Network.invoke(network, contractName, 'ReceiveShipment', loggedUserId, orderId);
        console.log(result);
        return customResponse.success(res, "Receive Shipment successfully", result);
    } catch (err) {
        return customResponse.badRequest(res, err.message);
    }
}

module.exports = {
    create,
    assign,
    history,
    createShipment,
    transportShipment,
    receiveShipment
}