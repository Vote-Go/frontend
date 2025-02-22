import { Link } from "react-router";
import { Container } from "../shared/Container";
import Hero from "../widgets/Hero/Hero";

import { motion } from "framer-motion";

const events = [
	{
		id: 1,
		title: "Crypto Art Showdown",
		description:
			"Vote for the most innovative NFT artwork in digital space",
		participants: 2450,
		status: "active",
		image: "/crypto-art-showdown.jpeg",
	},
	{
		id: 2,
		title: "Metaverse Fashion Week",
		description: "Choose the best virtual fashion collection of 2024",
		participants: 3789,
		status: "ended",
		image: "/metaverse-fashion-week.jpeg",
	},
	{
		id: 3,
		title: "AI Music Battle",
		description: "Rate AI-generated tracks from top neural networks",
		participants: 1567,
		status: "active",
		image: "/ai-music-battle.jpeg",
	},
];

const EventsGrid = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12"
		>
			{events.map((event, index) => (
				<motion.div
					key={event.id}
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: index * 0.1 }}
					className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all shadow-white/30 dark:shadow-black/80 hover:-translate-y-2"
				>
					<div className="h-48 bg-gray-700 relative">
						{event.image ? (
							<img
								src={event.image}
								alt={event.title}
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="flex items-center justify-center h-full text-gray-400">
								<svg
									className="w-12 h-12"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
							</div>
						)}
						<div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 text-sm">
							{event.status === "active" ? (
								<span className="text-green-400">Active</span>
							) : (
								<span className="text-gray-400">Ended</span>
							)}
						</div>
					</div>

					<div className="p-6">
						<h3 className="text-white text-xl font-semibold mb-2">
							{event.title}
						</h3>
						<p className="text-white/80 line-clamp-3 mb-4">
							{event.description}
						</p>

						<div className="flex items-center justify-between text-sm">
							<div className="flex items-center text-gray-400">
								<svg
									className="w-5 h-5 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
								{event.participants.toLocaleString()}
							</div>
							<Link
								to={`/event/${event.id}`}
								className=" px-4 cursor-pointer py-2 text-black bg-white hover:bg-white/30 hover:text-white rounded-lg transition-colors"
							>
								Vote Now
							</Link>
						</div>
					</div>
				</motion.div>
			))}
		</motion.div>
	);
};

const Market = () => {
	return (
		<>
			<Container>
				<Hero
					title="Choose. Vote. Win."
					subtitle="just choose the most beautiful event and vote"
				/>
				<EventsGrid />
			</Container>
		</>
	);
};

export default Market;
