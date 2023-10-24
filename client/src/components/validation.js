import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),

  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),

  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  verifyPassword: Yup.string().required("Required"),
  phone: Yup.string().required("Required "),
  checked: Yup.boolean().oneOf([true], "You must accept the terms and conditions")
});

export default validationSchema;
