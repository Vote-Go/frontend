// FeaturesList.tsx
export const FeaturesList = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
			{children}
		</div>
	);
};

export const FeaturesListItem = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<div className="flex flex-col mb-10 lg:items-start items-center">
		<div className="flex-grow">
			<h3 className="text-xl font-semibold mb-2 text-alt">{title}</h3>
			<p className="hover-text-alt leading-relaxed">{children}</p>
		</div>
	</div>
);
