import { useState } from "react";
import { validationFields } from "../lib/validation";
import ErrorField from "./ErrorField";
import { Eye, EyeOff } from "lucide-react";

const FieldInput = ({
  type,
  name,
  placeholder,
  label,
  register,
  index,
  errors,
  isSubmit,
  watch,
}) => {
  const [isChange, setIsChange] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <div className="w-full group">
      <label
        className="group-hover:cursor-pointer dark:text-black text-gray-300 mb-2 flex flex-col font-medium text-lg"
        key={index}
      >
        <span className="flex gap-2 items-center">
          <span>{label}</span>
          {label == "Password" && (
            <span
              onClick={() => setHidePassword(!hidePassword)}
              className="text-gray-500 relative top-0.5"
            >
              {hidePassword ? <Eye /> : <EyeOff />}
            </span>
          )}
        </span>

        <span className="relative">
          <input
            {...register(name, validationFields[index])}
            type={hidePassword ? type : "text"}
            placeholder={placeholder}
            name={name}
            onInput={() => setIsChange(true)}
            className="mt-2 placeholder-gray-500 text-gray-200 w-full border-1 px-2 py-2  focus:outline-blue-400 focus:outline-1 dark:focus:outline-purple-300 focus:text-gray-200  dark:focus:text-gray-700 dark:text-gray-600 dark:border-blue-400 border-gray-300 rounded-lg"
          />

          <ErrorField
            isChange={isChange}
            isSubmit={isSubmit}
            errors={errors}
            name={name}
          />
        </span>
      </label>
    </div>
  );
};

export default FieldInput;
