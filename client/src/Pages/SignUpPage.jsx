import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import validationSchema from "../components/validation";
import { Link, Navigate, useNavigate } from "react-router-dom";

function SignUpPage() {
  let navigate = useNavigate();
  const inititalValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
    phone: "",
    checked: false,
  };

  // const [formData, setFormData] = useState([inititalValues]);
  const [formData, setFormData] = useState([]);
  // console.log("formData", formData);

  const submitForm = async (values) => {
    await axios
      .post("http://localhost:8000/api/signup", values)
      .then(() => {
        setFormData((pdata) => [...pdata, values]);
        alert("signUP");
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.log("possible error : failed to fetch api or ->", err);
      });
    // ...........................//
  };
  // This useEffect is for Checking the registered users
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/allusers")
  //     .then((user) => {
  //       for (let i = 0; i < user.data.length; i++) {
  //         let emails = user.data[i].email;
  //         console.log(emails);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [submitForm]);

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
            <p>Already a user?</p>
            <Link to="login">Log-in</Link>
            {/* <Link to="me">My Profile</Link> */}
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default SignUpPage;
