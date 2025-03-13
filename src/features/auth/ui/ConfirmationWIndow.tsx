import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { serverConfirmationCode } from "../../signup/lib/validation";
import { Code } from "../../../entities/signup/types/signup";
import axios from "axios";
import { useNavigate } from "react-router";

const VERIFICATION_URL = "https://yamata-no-orochi.nktkln.com/auth/verify_code";
// userCode = 123456, serverCode = 122456 => no match; userCode = 1234, serverCode = 1234 => account is created
const ConfirmationWindow = ({ onNext, email }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Code>({ mode: "onChange" });

  const code = watch("code");
  const redirect = useNavigate();

  const onSubmit: SubmitHandler<Code> = async (data) => {
    const response = await axios.post(VERIFICATION_URL, {
      code: data.code,
      email: email,
    });

    redirect("/");
  };

  return (
    <div className="border-t-1 border-t-gray-300 w-full sm:w-1/2 lg:w-1/3 shadow-xl mx-auto h-auto  rounded-xl p-4">
      <div className="flex flex-col">
        <span className="text-center text text-xl">Almost done!</span>
        <span className="text-center text text-md pt-4">
          Check your email, we have sent you a 6-digt confirmation code so that
          you can finish the registration
        </span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4"
        action=""
        method="post"
      >
        <label className="flex  text flex-col gap-2 text-lg">
          Your code
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            autoComplete="off"
            className="border-gray-300 focus:border-blue-400 py-1 px-2 focus:outline-none border-1 rounded-lg"
            {...register("code", {
              required: "Code is required",
              pattern: {
                value: /^\d{6}$/,
              },
            })}
          />
          {errors.code && (
            <span className="text-sm text-red-500 dark:text-red-600 py-1 block">
              {errors.code.message}
            </span>
          )}
        </label>
      </form>
    </div>
  );
};

export default ConfirmationWindow;

