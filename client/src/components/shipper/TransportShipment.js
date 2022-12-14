import React from "react";
import PageLayout from "../panel/layout/PageLayout";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axiosHelper from "../../helpers/axiosHelper";

const TransportShipment = () => {
  const transportHandler = async (values) => {
    await axiosHelper.Orders.transportShipment(values);
  };

  const validationSchema = Yup.object().shape({
    orderId: Yup.string().required("*Sipariş ID adı boş bırakılamaz"),
  });

  return (
    <PageLayout page="Sevkiyat Kaydı Oluştur">
      <Formik
        initialValues={{ orderId: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await transportHandler(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form className="login-box" onSubmit={handleSubmit}>
            <Form.Group className="mt-3">
              <Form.Label>Sipariş ID</Form.Label>
              <Form.Control
                type="text"
                name="orderId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.orderId}
                placeholder="sipariş id..."
              />
              {errors.orderId && touched.orderId && (
                <Form.Text className="text-danger">{errors.orderId}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Button
                size="sm"
                variant="success"
                type="submit"
                disabled={isSubmitting}
              >
                Teslimati Tamamla
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
};

export default TransportShipment;
