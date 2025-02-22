interface ErrorMessageProps {
	message: string;
  }
  
  export const ErrorMessage = ({ message }: ErrorMessageProps) => (
	<div className="bg-red-500/20 p-4 rounded-lg text-red-300">
	  ⚠️ {message}
	</div>
  );