import { ReactNode } from "react";

interface IContainer {
	children: ReactNode;
	border?: boolean;
}

const Container: React.FC<IContainer> = ({ children, border }) => {
	return (
		<section
			className={`container mx-auto px-4 py-20 ${
				border ? "border-b border-gray-800" : ""
			}`}
		>
			{children}
		</section>
	);
};

export default Container;
