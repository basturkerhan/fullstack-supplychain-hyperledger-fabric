import React from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axiosHelper from "../../helpers/axiosHelper";
import PageLayout from "../panel/layout/PageLayout";

export const AssignShipment = () => {

  const assignHandler = async (values) => {
    await axiosHelper.Orders.assignShipment(values);
  };

  const validationSchema = Yup.object().shape({
    orderId: Yup.string().required("*Sipariş ID boş bırakılamaz"),
    shipperId: Yup.string().required("*Nakliyeci ID boş bırakılamaz"),
  });

  return (
    <PageLayout page="Sevkiyat Tanımla">
      <Formik
        initialValues={{ orderId: "", shipperId: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await assignHandler(values);
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
              <Form.Label>Nakliyeci ID</Form.Label>
              <Form.Control
                type="shipperId"
                name="shipperId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.shipperId}
                placeholder="nakliyeci id..."
              />
              {errors.shipperId && touched.shipperId && (
                <Form.Text className="text-danger">
                  {errors.shipperId}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Button
                size="sm"
                variant="success"
                type="submit"
                disabled={isSubmitting}
              >
                Nakliyeci Tanımla
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
};

export default AssignShipment;
