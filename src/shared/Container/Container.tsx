import { ReactNode } from "react";

interface IContainer {
	children: ReactNode;
}

const Container: React.FC<IContainer> = ({ children }) => {
	return (
		<section className="container mx-auto px-4 py-20 border-b border-gray-800">
			{children}
		</section>
	);
};

export default Container;
