import { FeatureItem } from "../../../entities/feature/feature";
import { StatItem } from "../../../entities/stats/stats";

export const features: FeatureItem[] = [
	{
		id: "1",
		title: "Decentralized Governance",
		description:
			"Participate in platform decisions through our governance system",
	},
	{
		id: "2",
		title: "Real-time Tracking",
		description: "Monitor market dynamics with live updates and analytics",
	},
	{
		id: "3",
		title: "Secure Transactions",
		description: "Built on Ethereum with smart contract audits",
	},
];

export const statsItems: StatItem[] = [
	{
		id: "active-users",
		value: 12563,
		label: "Active Traders",
		//   icon: <UserIcon className="w-6 h-6 mr-2" />
	},
	{
		id: "total-volume",
		value: 42,
		label: "Total Volume (ETH)",
		//   icon: <ChartBarIcon className="w-6 h-6 mr-2" />
	},
	{
		id: "accuracy-rate",
		value: 78,
		label: "Prediction Accuracy",
		//   icon: <TargetIcon className="w-6 h-6 mr-2" />
	},
	{
		id: "markets-created",
		value: 356,
		label: "Markets Created",
		//   icon: <CubeIcon className="w-6 h-6 mr-2" />
	},
	{
		id: "site-developers",
		value: 5,
		label: "Developers",
		//   icon: <CubeIcon className="w-6 h-6 mr-2" />
	},
	{
		id: "best-numbr",
		value: 666,
		label: "Best Number",
		//   icon: <CubeIcon className="w-6 h-6 mr-2" />
	},
];
