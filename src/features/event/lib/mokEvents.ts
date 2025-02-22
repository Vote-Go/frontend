import { EventItem } from "../../../entities/event/types/event";

export const MOCK_EVENTS: EventItem[] = [
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
