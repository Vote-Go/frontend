// input field constraints for validation
//const serverConfirmationCode = "1234"; // code that is being sent via email

// describes the form fields for each form
const formFields = [
  {
    type: "text",
    name: "nickname",
    placeholder: "Username",
    label: "Username",
  },
  {
    type: "text", // set the email to type text to override the in-built browser email validation
    name: "email",
    placeholder: "xxx@gmail.com",
    label: "Email",
  },
  {
    type: "password",
    name: "password",
    placeholder: "password",
    label: "Password",
  },
  {
    type: "password",
    name: "confirmPassword",
    placeholder: "Confirm password",
    label: "Confirm your password",
  },
];

const validationFields = [
  {
    required: { value: true, message: "Username is required" },
    minLength: {
      value: 4,
      message: "Username must be between 4 to 25 characters",
    },
    maxLength: {
      value: 25,
      message: "Name must be between 4 to 25 characters",
    },
  },
  {
    required: { value: true, message: "Email field is required" }, // email field
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      message: "Email is invalid!",
    },
  },
  {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  },
];

export { serverConfirmationCode, formFields, validationFields };
