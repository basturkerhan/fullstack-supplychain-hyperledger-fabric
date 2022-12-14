import React from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axiosHelper from "../../helpers/axiosHelper";

const CreateUser = ({ memberRole }) => {

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("*Kullanıcı adı boş bırakılamaz"),
    password: Yup.string().required("*Şifre boş bırakılamaz"),
    role:  Yup.string().required("*Rol boş bırakılamaz")
  });

  const createHandler = async (values) => {
    await axiosHelper.Users.register(values);
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        role: memberRole
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
            <Form.Label>Kullanıcı ID</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              placeholder="kullanıcı id..."
            />
            {errors.username && touched.username && (
              <Form.Text className="text-danger">{errors.username}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Kullanıcı Şifresi</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="kullanıcı şifre..."
            />
            {errors.password && touched.password && (
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Kullanıcı Rolü</Form.Label>
            <Form.Control
              type="text"
              name="role"
              onChange={null}
              disabled
              onBlur={handleBlur}
              value={values.role}
              placeholder="kullanıcı rolü..."
            />
            {errors.role && touched.role && (
              <Form.Text className="text-danger">{errors.role}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mt-3">
            <Button
              size="sm"
              variant="success"
              type="submit"
              disabled={isSubmitting}
            >
              Kullanıcı Ekle
            </Button>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUser;
