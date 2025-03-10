import { Hero } from "../widgets/hero";
import { Container } from "../shared/ui/Container";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import { Fields, Code } from "../entities/signup/types/signup";
import {
  serverConfirmationCode,
  formFields,
  validationFields,
} from "../features/signup/lib/validation";

import ConfirmationWindow from "../features/signup/ui/ConfirmationWindow";
import SuccessfullRegistration from "../features/signup/ui/SuccessfullRegistration";
import FieldInput from "../features/signup/ui/FieldInput";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Fields>({ mode: "onChange" });

  const [isSubmit, setIsSubmit] = useState(false);
  const [next, setNext] = useState(0); // redirects the user to the next registration step; 0 -> code request, 1 -> message about successfull creation of the account
  const [confirmation, setConfirmation] = useState(false); // tell user to type the code that is being sent to email

  watch("username");
  watch("email");
  watch("password");
  watch("confirmPassword");

  const onSubmit: SubmitHandler<Fields> = (data) => {
    setConfirmation(true);
  };

  const registrationSteps = [
    <ConfirmationWindow onNext={setNext} />,
    <SuccessfullRegistration />,
  ];

  return (
    <Container>
      <Hero title="Signup" subtitle="Signup if you want to vote!" />
      {!confirmation ? (
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto border-1 border-gray-100 dark:border-gray-300 p-8 rounded-lg">
          <form
            className="flex gap-2 flex-col justify-center items-center"
            action=""
            onSubmit={handleSubmit(onSubmit)}
          >
            {formFields.map(({ type, name, placeholder, label }, index) => {
              return (
                <FieldInput
                  key={index}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  label={label}
                  index={index}
                  register={register}
                  errors={errors}
                  isSubmit={isSubmit}
                  watch={watch}
                />
              );
            })}

            <input
              onClick={() => setIsSubmit(true)}
              type="submit"
              value="Signup"
              className="border-none rounded-lg cursor-pointer  bg-gray-100 text-gray-800  dark:hover:bg-blue-500/75 dark:bg-blue-500 dark:text-white font-medium text-center w-3/4 h-10 mt-8"
            />
          </form>
        </div>
      ) : (
        registrationSteps[next]
      )}
    </Container>
  );
};

export default Signup;

// TO-DO: Rewrite to FSD
