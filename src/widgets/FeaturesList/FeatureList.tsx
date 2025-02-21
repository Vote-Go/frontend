// FeaturesList.tsx
export const FeaturesList = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex items-center justify-between lg:py-6 lg:px-12">
			<div className="flex flex-col flex-wrap  -mb-10 lg:w-1/2  lg:text-left text-center">
				{children}
			</div>

			<div className="border-2 border-white dark:border-black rounded-4xl">
				<img
					src="/feature.jpeg"
					alt="feature"
					width={400}
					className="rounded-4xl  p-4"
				/>
			</div>
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
			<h3 className="text-xl font-semibold mb-2 text">{title}</h3>
			<p className="hover-text leading-relaxed">{children}</p>
		</div>
	</div>
);
