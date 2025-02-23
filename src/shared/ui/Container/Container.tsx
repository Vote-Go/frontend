import React, { ReactNode } from "react";
import { cn } from "../../lib/format/cn";

interface IContainer {
	children: ReactNode;
	border?: boolean;
	className?: string;
}

const Container: React.FC<IContainer> = ({
	children,
	border = false,
	className = "",
}) => {
	const baseClasses = "container mx-auto px-4 py-20";
	const borderClasses = border
		? "border-b border-gray-300 dark:border-gray-600"
		: "";

	return (
		<section
			className={cn(baseClasses, borderClasses, className)}
			data-testid="container-section"
		>
			{children}
		</section>
	);
};

export default Container;
