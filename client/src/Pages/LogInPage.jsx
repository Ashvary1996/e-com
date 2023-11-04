import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LogInPage() {
  let navigate = useNavigate();
  const inititalValues = {
    firstName: "",
    password: "",
  };
  const [formData, setFormData] = useState({});
  console.log("formDasdata");

  const submitForm = async (values) => {
    values.firstName && values.password ? setFormData(values) : null;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        JSON.stringify({
          firstName: values.firstName,
          password: values.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));
      if (response?.data.logInSuccess) {
        navigate("/home", { replace: true });
      }
    } catch (error) {
      console.log("error in fetching", error);
    }

    // ...........................//
  };

  return (
    <>
      <h1>Log-In Page</h1>
      <div>
        <Formik
          initialValues={inititalValues}
          onSubmit={submitForm}
          //   validationSchema={validationSchema}
        >
          <Form>
            <div>
              <label htmlFor="firstName">First Name : </label>
              <Field type="text" name="firstName" placeholder="firstName" />
              <ErrorMessage
                className="errorMsg"
                name="firstName"
                component="div"
              />
            </div>

            <div>
              <label htmlFor="password">Password : </label>
              <Field type="password" name="password" placeholder="password" />
              <ErrorMessage
                className="errorMsg"
                name="password"
                component="div"
              />
            </div>

            <button type="submit">Log-in</button>
            <p>Not a User?</p>
            <Link to="signup" replace={true}>
              Sign-up-now
            </Link>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default LogInPage;
