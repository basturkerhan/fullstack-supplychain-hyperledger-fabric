import React from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { batch, useDispatch } from "react-redux";
import {
  setUserRole,
  setUserId,
  setUserOrganization,
} from "../../store/slices/user";
import { useNavigate } from "react-router-dom";
import { organizationToRole } from "../../mappings/roleOrganizationMapping";
import axiosHelper from "../../helpers/axiosHelper";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("*Kullanıcı adı boş bırakılamaz"),
    password: Yup.string().required("*Şifre boş bırakılamaz"),
    organization: Yup.string().required("*Organizasyon boş bırakılamaz"),
  });

  const loginHandler = async (values) => {
    const user = await axiosHelper.Users.login(values);
    batch(() => {
      dispatch(setUserRole(user.role));
      dispatch(setUserId(user.id));
      dispatch(setUserOrganization(user.organization));
    });
    localStorage.setItem("token", JSON.stringify(user.accessToken));
    navigate(`/${organizationToRole[values.organization]}`);
  };

  return (
    <div id="login" className="justify-center align-center vh-100">
      <Formik
        initialValues={{ username: "", password: "", organization: "org1" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await loginHandler(values);
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
              {/* <Form.Label>Kullanıcı Adı</Form.Label> */}
              <Form.Control
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                placeholder="kullanıcı adınız..."
              />
            </Form.Group>
            {errors.username && touched.username && (
              <Form.Text className="text-danger">{errors.username}</Form.Text>
            )}
            <Form.Group className="mt-3">

              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="şifreniz..."
              />
            </Form.Group>
            {errors.password && touched.password && (
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            )}
            <Form.Group className="mt-3">

              <Form.Select
                onChange={handleChange}
                onBlur={handleBlur}
                name="organization"
                value={values.organization}
              >
                <option value="org1">Üretici</option>
                <option value="org2">Nakliyeci</option>
                <option value="org3">Perakendeci</option>
              </Form.Select>
            </Form.Group>
            {errors.organization && touched.organization && (
              <Form.Text className="text-danger">
                {errors.organization}
              </Form.Text>
            )}
            <Form.Group className="mt-3">
              <Button
                size="sm"
                variant="success"
                type="submit"
                disabled={isSubmitting}
              >
                Giriş Yap
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
