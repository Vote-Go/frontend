import { ReactNode } from "react";

interface IContainer {
	children: ReactNode;
	border?: boolean;
	className?: string;
}

const Container: React.FC<IContainer> = ({
	children,
	border = false,
	className,
}) => {
	return (
		<section
			className={`container mx-auto px-4 py-20 ${
				border ? "border-b border-gray-300 dark:border-gray-600" : ""
			} ${className}`}
		>
			{children}
		</section>
	);
};

export default Container;
