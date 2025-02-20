import {
	FeaturesList,
	FeaturesListItem,
} from "./widgets/FeaturesList/FeatureList";
import Footer from "./widgets/Footer/Footer";
import Header from "./widgets/Header/Header";
import { HeroStatItem, HeroStats } from "./widgets/HeroStats/HeroStats";
import TeamSection from "./widgets/TeamSection/TeamSection";

export default function App() {
	return (
		<div className="min-h-screen bg-black text-white flex flex-col">
			<Header />

			<main className="flex-1">
				{/* Hero Section */}
				<section className="container mx-auto px-4 py-20">
					<div className="text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-6">
							Predict. Vote. Earn.
						</h1>
						<p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
							Decentralized prediction market platform where your
							insight meets opportunity
						</p>
					</div>
				</section>

				{/* Live Markets Stats */}
				<HeroStats>
					<HeroStatItem value={12450} label="Active Markets" />
					<HeroStatItem value={8932} label="Participants" />
					<HeroStatItem value={2.1} label="Volume (ETH)" />
				</HeroStats>

				{/* Platform Features */}
				<section className="container mx-auto px-4 py-20">
					<FeaturesList>
						<FeaturesListItem title="Decentralized Governance">
							Participate in platform decisions through our
							governance system
						</FeaturesListItem>
						<FeaturesListItem title="Real-time Tracking">
							Monitor market dynamics with live updates and
							analytics
						</FeaturesListItem>
						<FeaturesListItem title="Secure Transactions">
							Built on Ethereum with smart contract audits
						</FeaturesListItem>
					</FeaturesList>
				</section>

				{/* Team Section */}
				<TeamSection />
			</main>

			<Footer />
		</div>
	);
}
