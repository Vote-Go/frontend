import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface BetField {
  bet: string;
}

const QuestionAdd = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BetField>({ mode: "onSubmit" });

  watch("bet");

  const onSubmit: SubmitHandler<BetField> = (data) => {
    setIsSubmit(true);
  };

  return (
    <div>
      <h2 className="text-center text text-2xl mt-8">Add your bet</h2>
      <div>
        <span className="dark:text-gray-500 mt-4 text-gray-300 text-lg block text-center">
          Place your own bet so that other people can vote on it
        </span>
      </div>
      <div className="mt-4 p-4 border-1 border-gray-500 w-full sm:w-2/3 lg:w-1/3 rounded-xl mx-auto">
        <form
          action=""
          className="flex items-center"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              className=" text-gray-300 flex-1/2 flex flex-col text-xl dark:text-gray-600"
              htmlFor="bet"
            >
              Your new bet:
              <input
                type="text"
                {...register("bet", { required: true })}
                className="rounded-xl w-full p-1 border-1 focus:outline-none border-gray-500 mt-2 text-gray-300 dark:text-gray-600"
              />
              {errors["bet"] && (
                <span className="text-red-500 tex-sm">
                  You did not specify your bet
                </span>
              )}
            </label>
          </div>

          <button
            type="submit"
            className={`${!errors["bet"] ? "top-4" : "bottom-2 "} text-xl font-medium  relative  left-2 flex justify-start cursor-pointer flex-1/2 text-green-500   dark:text-green-400`}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionAdd;
