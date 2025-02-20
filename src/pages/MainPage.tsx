import Container from "../shared/Container/Container";
import {
	FeaturesList,
	FeaturesListItem,
} from "../widgets/FeaturesList/FeatureList";
import { HeroStats, HeroStatItem } from "../widgets/HeroStats/HeroStats";
import TeamSection from "../widgets/TeamSection/TeamSection";

const MainPage = () => {
	return (
		<>
			{/* Hero Section */}
			<Container>
				<div className="text-center">
					<h1 className="title mb-6">Predict. Vote. Earn.</h1>
					<p className="text-xl hover-text mb-12 max-w-2xl mx-auto ">
						Decentralized prediction market platform where your
						insight meets opportunity
					</p>
				</div>
			</Container>

			{/* Live Markets Stats */}
			<HeroStats>
				<HeroStatItem value={12450} label="Active Markets" />
				<HeroStatItem value={8932} label="Participants" />
				<HeroStatItem value={2.1} label="Volume (ETH)" />
			</HeroStats>

			{/* Platform Features */}
			<Container>
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
