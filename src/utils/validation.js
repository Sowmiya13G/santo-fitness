import * as yup from "yup";

export const loginSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Enter valid Phone number"),
  password: yup.string().required("Please enter your password"),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Mail ID is required"),
});

export const setPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Must include uppercase, lowercase, number, and special character",
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords do not match"),
});

const transformEmptyStringToUndefined = (value, originalValue) =>
  originalValue === "" ? undefined : value;

export const nutrientsValidationSchema = yup.object().shape({
  protein: yup
    .number()
    .transform(transformEmptyStringToUndefined)
    .typeError("Protein must be a number")
    .required("Protein is required")
    .min(0, "Protein must be non-negative"),

  fat: yup
    .number()
    .transform(transformEmptyStringToUndefined)
    .typeError("Fat must be a number")
    .required("Fat is required")
    .min(0, "Fat must be non-negative"),

  kcal: yup
    .number()
    .transform(transformEmptyStringToUndefined)
    .typeError("KCal must be a number")
    .required("KCal is required")
    .min(0, "KCal must be non-negative"),

  carbs: yup
    .number()
    .transform(transformEmptyStringToUndefined)
    .typeError("Carbs must be a number")
    .required("Carbs is required")
    .min(0, "Carbs must be non-negative"),

  comment: yup.string().nullable(),
});