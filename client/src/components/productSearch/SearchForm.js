import React from "react";
import { Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axiosHelper from "../../helpers/axiosHelper";
import { AiOutlineSearch } from "react-icons/ai";

const SearchForm = ({ setHistory }) => {

  const validationSchema = Yup.object().shape({
    orderId: Yup.string().required("*Sipariş ID boş bırakılamaz"),
  });

  const searchHandler = async (values) => {
    const response = await axiosHelper.Orders.history(values.orderId);
    setHistory(response);
  };

  return (
      <Formik
        initialValues={{ orderId: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await searchHandler(values);
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
          <Form className="history-form" onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              className="history-form-input"
              name="orderId"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.orderId}
              placeholder="sipariş id..."
            />
            <span className="left-pan">
              <button
                className="search-button"
                type="submit"
                disabled={isSubmitting}
              >
                <AiOutlineSearch />
              </button>
            </span>
            {errors.orderId && touched.orderId && (
              <Form.Text className="text-danger">{errors.orderId}</Form.Text>
            )}
          </Form>
        )}
      </Formik>
  );
};

export default SearchForm;
