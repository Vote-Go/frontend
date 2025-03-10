import { Link } from "react-router";

const SuccessfullRegistration = () => {
  return (
    <div className="border-1 w-full sm:w-1/2 lg:w-1/3 mx-auto border-gray-400 rounded-lg p-4">
      <span className="text-center block text-xl text">Congratulations!</span>
      <div>
        <span className="block mt-4 text-center text-green-600">
          You have successfully created your account!
        </span>
      </div>
      <div className="flex justify-center mt-4 text-gray-500 cursor-pointer">
        <Link to="/">Go back to the main page</Link>
      </div>
    </div>
  );
};

export default SuccessfullRegistration;
