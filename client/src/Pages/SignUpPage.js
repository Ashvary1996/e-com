import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

import validationSchema from "../components/validation";

function SignUpPage() {
  const inititalValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
    phone: "",
    checked: false,
  };

  const [formData, setFormData] = useState([inititalValues]);
  // console.log("formData", formData);

  const submitForm = (values) => {
    setFormData((pdata) => [...pdata, values]);
    console.log("Submitted", values);
  };
  return (
    <>
      <h1>Sign Up Page</h1>
      <div>
        <Formik
          initialValues={inititalValues}
          onSubmit={submitForm}
          validationSchema={validationSchema}
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
              <label htmlFor="lastName">Last Name : </label>
              <Field type="text" name="lastName" placeholder="lastName" />
              <ErrorMessage
                className="errorMsg"
                name="lastName"
                component="div"
              />
            </div>
            <div>
              <label htmlFor="email">E-mail : </label>
              <Field type="text" name="email" placeholder="email" />
              <ErrorMessage className="errorMsg" name="email" component="div" />
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
            <div>
              <label htmlFor="verifyPassword">Verify Password : </label>
              <Field
                type="password"
                name="verifyPassword"
                placeholder="verifyPassword"
              />
              <ErrorMessage
                className="errorMsg"
                name="verifyPassword"
                component="div"
              />
            </div>
            <div>
              <label htmlFor="phone">Phone Number: </label>
              <Field type="number" name="phone" placeholder="phone" />
              <ErrorMessage className="errorMsg" name="phone" component="div" />
            </div>
            <div>
              <label>
                <Field type="checkbox" name="checked" />I accept all terms and
                condition
              </label>

              <ErrorMessage
                className="errorMsg"
                name="checked"
                component="div"
              />
            </div>

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default SignUpPage;
