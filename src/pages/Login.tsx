import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Hero } from "../widgets/hero";
import { Container } from "../shared/ui/Container";
import { Fields } from "../entities/login/types/login";
import { formFields } from "../features/login/lib/validation";
import { useNavigate } from "react-router";
import LoginLoader from "../features/login/ui/LoginLoader";
import FieldInput from "../features/login/ui/Fieldinput";

const validateUser = async (
  username: string,
  password: string
): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // will be later replaced with an actual data
  // when backend is ready
  const databaseSchema = {
    username: "marat2005",
    password: "P@ssword",
  };

  return (
    username === databaseSchema.username && password === databaseSchema.password
  );
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Fields>({ mode: "onChange" });

  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const redirect = useNavigate();

  watch("username");
  watch("password");

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const isUserExist = await validateUser(data.username, data.password);

      if (isUserExist) {
        redirect("/");
      } else {
        setLoginError("Invalid username or password!");
      }
    } catch (error) {
      setLoginError("An error occured. Plase try again later!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Hero title="Login" subtitle="Login if you want to vote!" />

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

          <div className="w-full ">
            <span className="font-medium text-red-500">{loginError}</span>
          </div>

          <div className="w-full flex flex-col">
            <span className="font-medium dark:text-gray-600 text-gray-200">
              Don't have an account yet?
            </span>
            <span className="text-lg dark:text-blue-600 text-blue-300">
              <Link to="/signup">Sign Up</Link>
            </span>
          </div>

          <button
            onClick={() => setIsSubmit(true)}
            type="submit"
            className={` border-none rounded-lg cursor-pointer  bg-gray-100 text-gray-800  dark:hover:bg-blue-500/75 dark:bg-blue-500 dark:text-white font-medium text-center w-3/4 h-10 mt-8`}
          >
            <span className="px-2">Log in</span>
            {isLoading && <LoginLoader />}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Login;

// TO-DO: Rewrite to FSD
