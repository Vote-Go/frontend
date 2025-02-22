import Container from "../shared/Container/Container";
import {
	FeaturesList,
	FeaturesListItem,
} from "../widgets/FeaturesList/FeatureList";
import Hero from "../widgets/Hero/Hero";
import { HeroStats, HeroStatItem } from "../widgets/HeroStats/HeroStats";
import TeamSection from "../widgets/TeamSection/TeamSection";

const MainPage = () => {
	return (
		<>
			{/* Hero Section */}
			<Container border={true}>
				<Hero
					title="Predict. Vote. Earn."
					subtitle="Decentralized prediction market platform where your
						insight meets opportunity"
				/>
			</Container>

			{/* Live Markets Stats */}
			<HeroStats>
				<HeroStatItem value={12450} label="Active Markets" />
				<HeroStatItem value={8932} label="Participants" />
				<HeroStatItem value={2.1} label="Volume (ETH)" />
			</HeroStats>

			{/* Platform Features */}
			<Container border={true}>
				<FeaturesList>
					<FeaturesListItem title="Decentralized Governance">
						Participate in platform decisions through our governance
						system
					</FeaturesListItem>
					<FeaturesListItem title="Real-time Tracking">
						Monitor market dynamics with live updates and analytics
					</FeaturesListItem>
					<FeaturesListItem title="Secure Transactions">
						Built on Ethereum with smart contract audits
					</FeaturesListItem>
				</FeaturesList>
			</Container>

			{/* Team Section */}
			<TeamSection />
		</>
	);
};

export default MainPage;
