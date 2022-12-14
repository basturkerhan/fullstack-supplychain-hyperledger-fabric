import React, { Fragment } from "react";
import { Col, Row, Table } from "react-bootstrap";
import LineChart from "./Line";
import Doughnot from "./Doughnot";
import { useUserId } from "../../hooks/useUserId";

const Charts = () => {
  const userId = useUserId();

  return (
    <Fragment>
      <Row>
        <Col md={8}>
          <LineChart />
        </Col>
        <Col>
          <Table striped>
            <thead>
              <tr>
                <th>Sipariş Kodu</th>
                <th>Ürün Adı</th>
                <th>Son Aktivite</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Order003</td>
                <td>Lorem</td>
                <td>Sipariş Oluşturuldu</td>
              </tr>
              <tr>
                <td>Order003</td>
                <td>Lorem</td>
                <td>Sevkiyat Tanımlandı</td>
              </tr>
              <tr>
                <td>Order004</td>
                <td>Lorem</td>
                <td>Sevkiyat Tanımlandı</td>
              </tr>
              <tr>
                <td>Order003</td>
                <td>Lorem</td>
                <td>Sevkiyat Tanımlandı</td>
              </tr>
              <tr>
                <td>Order005</td>
                <td>Lorem</td>
                <td>Sevkiyat Onaylandı</td>
              </tr>
              <tr>
                <td>Order006</td>
                <td>Lorem</td>
                <td>Sipariş Oluşturuldu</td>
              </tr>
              <tr>
                <td>Order001</td>
                <td>Lorem</td>
                <td>Sipariş Oluşturuldu</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <br />
      <Row>
        <Col>
          <h4>Kullanıcı Bilgileri</h4>
          <Row style={{ marginBottom: "1rem" }}>
            <Col>
              <b>Kullanıcı Adı</b>
            </Col>
            <Col>{userId}</Col>
          </Row>
          <Row style={{ marginBottom: "1rem" }}>
            <Col>
              <b>Kullanıcı Adresi</b>
            </Col>
            <Col>Lorem ipsum dolor sit amet</Col>
          </Row>
        </Col>
        <Col>
          {/* <h4>Ürün Durumları</h4>
          <Doughnot /> */}
        </Col>
        <Col>
          <h4>Ürün Durumları</h4>
          <Doughnot />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Charts;
