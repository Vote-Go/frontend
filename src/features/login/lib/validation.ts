// describes the form fields for each form
const formFields = [
  {
    type: "email",
    name: "email",
    placeholder: "Email",
    label: "Email",
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
    required: { value: true, message: "Email is required" },
  },

  {
    required: { value: true, message: "Password is required" },
  },
];

export { formFields, validationFields };
