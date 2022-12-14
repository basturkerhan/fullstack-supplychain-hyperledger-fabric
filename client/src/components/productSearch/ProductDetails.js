import React, { Fragment } from "react";
import Colors from "./Colors";
import { Row, Col } from "react-bootstrap";

const ProductDetails = ({ product }) => {
  console.log(product);
  return (
    <Fragment>
      {product && (
        <div className="app">
          <Row className="details">
            <Col className="box">
              <Row>
                <h2>{product.Value.productName}</h2>
                <span>ID: {product.Value.productId}</span>
              </Row>
              <Colors color={product.Value.productColor} />
              <Row>
                <p>
                  <b>{product.Value.productName}</b> adlı ürün,{" "}
                  <b>{product.Timestamp}</b> tarihi itibariyle{" "}
                  <b>{product.Value.modifiedBy}</b> konumunda bulunuyor.
                  Sipariş; ürünü <b>{product.Value.retailerId}</b> konumuna
                  göndermek üzere oluşturuldu.
                </p>
                <Col md={4}>
                  <b>Üretici:</b>
                </Col>
                <Col>{product.Value.producerId}</Col>
              </Row>
              <Row>
                <Col md={4}>
                  <b>Son Güncelleme:</b>
                </Col>
                <Col>{product.Value.modifiedBy}</Col>
              </Row>
              <Row>
                <Col md={4}>
                  <b>Alıcı:</b>
                </Col>
                <Col>{product.Value.retailerId}</Col>
              </Row>
              <Row>
                <Col md={4}>
                  <b>Fiyat:</b>
                </Col>
                <Col>{product.Value.productPrice} TL</Col>
              </Row>
              <Row>
                <Col md={4}>
                  <b>Miktar:</b>
                </Col>
                <Col>{product.Value.productQuantity} top</Col>
              </Row>
              
            </Col>

            <Col className="box">
              <img
                alt="product"
                className="img img-fluid"
                src="https://thumbs.dreamstime.com/b/beige-grey-cotton-fabric-texture-canvas-background-top-view-grey-cotton-fabric-texture-canvas-background-137105119.jpg"
              />
            </Col>
          </Row>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
