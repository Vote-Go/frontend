// describes the form fields for each form
const formFields = [
  {
    type: "text",
    name: "username",
    placeholder: "Username",
    label: "Username",
  },
  {
    type: "password",
    name: "password",
    placeholder: "password",
    label: "Password",
  },
];

const validationFields = [
  {
    required: { value: true, message: "Username is required" },
  },

  {
    required: { value: true, message: "Password is required" },
  },
];

export { formFields, validationFields };
