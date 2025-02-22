import { EventStatus } from "../../../entities/event/types/event";

interface StatusBadgeProps {
	status: EventStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
	<div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 text-sm">
		{status === "active" ? (
			<span className="text-green-400">Active</span>
		) : (
			<span className="text-gray-400">Ended</span>
		)}
	</div>
);
