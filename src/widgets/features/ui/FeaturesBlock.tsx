import { features } from "../../../features/main/lib/constants";
import { FeaturesList } from "./FeaturesList";

export const FeaturesBlock = () => (
	<section className="py-16">
		<h2 className="!text-3xl font-bold text-center mb-12 title">
			Platform Features
		</h2>
		<FeaturesList items={features} />
	</section>
);
