import * as Yup from "yup";

export const SchemaLogin = Yup.object().shape({
  email: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Must be at least 8 symbols!")
    .required("Required"),
});
