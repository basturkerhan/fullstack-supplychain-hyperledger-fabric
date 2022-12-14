import React from "react";
import { Table } from "react-bootstrap";

export const HistoryTable = ({ history }) => {
  console.log(history);
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Order ID</th>
          <th>Product ID</th>
          <th>State</th>
          <th>Modified</th>
          <th>Color</th>
          <th>Description</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Retailer</th>
          <th>Shipper</th>
          <th>Tracking Info</th>
        </tr>
      </thead>
      <tbody>
        {history.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.Timestamp}</td>
              <td>{item.Value.ID}</td>
              <td>{item.Value.productId}</td>
              <td>{item.Value.currentState}</td>
              <td>{item.Value.modifiedBy}</td>
              <td>{item.Value.productColor}</td>
              <td>{item.Value.productDescription}</td>
              <td>{item.Value.productName}</td>
              <td>{item.Value.productPrice}</td>
              <td>{item.Value.productQuantity}</td>
              <td>{item?.Value?.retailerId ? item.Value?.retailerId : "-"}</td>
              <td>{item?.Value?.shipperId ? item.Value?.shipperId : "-"}</td>
              <td>{item?.Value?.trackingInfo ? item.Value?.trackingInfo : "-"}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
