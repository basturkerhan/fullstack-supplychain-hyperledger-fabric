import React from "react";
import PageLayout from "../panel/layout/PageLayout";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useUserId } from "../../hooks/useUserId";
import { useUserRole } from "../../hooks/useUserRole";
import axiosHelper from "../../helpers/axiosHelper";

const CreateOrder = () => {
  const userId = useUserId();
  const userRole = useUserRole();

  const createHandler = async (values) => {
    await axiosHelper.Orders.create(values);
  };

  const validationSchema = Yup.object().shape({
    producerId: Yup.string().required("*Üretici ID gereklidir"),
    orderId: Yup.string().required("*Sipariş ID gereklidir"),
    productId: Yup.string().required("*Ürün ID gereklidir"),
    productName: Yup.string().required("*Ürün adı gereklidir"),
    productColor: Yup.string().required("*Ürün rengi gereklidir"),
    productDescription: Yup.string().required("*Ürün açıklaması gereklidir"),
    productPrice: Yup.string().required("*Ürün fiyatı gereklidir"),
    productQuantity: Yup.string().required("*Ürün miktarı gereklidir"),
    retailerId: Yup.string().required("*Alıcı ID gereklidir")
  });

  return (
    <PageLayout page="Ürün Ekle">
      <Formik
        initialValues={{
          producerId: userRole === "admin" ? "" : userId,
          orderId: "",
          productId: "",
          productName: "",
          productColor: "",
          productDescription: "",
          productPrice: "",
          productQuantity: "",
          retailerId: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await createHandler(values);
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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-3">
              <Form.Label>Üretici</Form.Label>
              <Form.Control
                type="text"
                name="producerId"
                onChange={userRole !== "admin" ? null : handleChange}
                disabled={userRole !== "admin"}
                onBlur={handleBlur}
                value={values.producerId}
                placeholder="üretici id..."
              />
              {errors.producerId && touched.producerId && (
                <Form.Text className="text-danger">{errors.producerId}</Form.Text>
              )}
            </Form.Group>

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
              <Form.Label>Ürün ID</Form.Label>
              <Form.Control
                type="text"
                name="productId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productId}
                placeholder="ürün id..."
              />
              {errors.productId && touched.productId && (
                <Form.Text className="text-danger">
                  {errors.productId}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Ürün Adı</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productName}
                placeholder="enter product name..."
              />
              {errors.productName && touched.productName && (
                <Form.Text className="text-danger">
                  {errors.productName}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Ürün Rengi</Form.Label>
              <Form.Control
                type="text"
                name="productColor"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productColor}
                placeholder="ürün rengi..."
              />
              {errors.productColor && touched.productColor && (
                <Form.Text className="text-danger">
                  {errors.productColor}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Ürün Açıklaması</Form.Label>
              <Form.Control
                type="text"
                name="productDescription"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productDescription}
                placeholder="ürün açıklaması..."
              />
              {errors.productDescription && touched.productDescription && (
                <Form.Text className="text-danger">
                  {errors.productDescription}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Ürün Fiyatı</Form.Label>
              <Form.Control
                type="number"
                name="productPrice"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productPrice}
                placeholder="ürün fiyatı..."
              />
              {errors.productPrice && touched.productPrice && (
                <Form.Text className="text-danger">
                  {errors.productPrice}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Ürün Miktarı</Form.Label>
              <Form.Control
                type="number"
                name="productQuantity"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productQuantity}
                placeholder="ürün miktarı..."
              />
              {errors.productQuantity && touched.productQuantity && (
                <Form.Text className="text-danger">
                  {errors.productQuantity}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Alıcı</Form.Label>
              <Form.Control
                type="text"
                name="retailerId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.retailerId}
                placeholder="alıcı id..."
              />
              {errors.retailerId && touched.retailerId && (
                <Form.Text className="text-danger">
                  {errors.retailerId}
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
                Ürün Ekle
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
};

export default CreateOrder;
