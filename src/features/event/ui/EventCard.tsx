import { Link } from "react-router";
import { EventItem } from "../../../entities/event/types/event";
import { ImageWithFallback } from "../../../shared/ui/standart/ImageWithFallBack";
import { StatusBadge } from "../../../shared/ui/standart/StatusBadge";
import { ParticipantsIcon } from "../../../shared/ui/icons/ParticipantsIcon";

interface EventCardProps {
	event: EventItem;
}

export const EventCard = ({ event }: EventCardProps) => (
	<div className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all shadow-white/30 dark:shadow-black/80 hover:-translate-y-2">
		<div className="h-48 bg-gray-700 relative">
			<ImageWithFallback
				src={event.image}
				alt={event.title}
				fallback={<ImagePlaceholder />}
			/>
			<StatusBadge status={event.status} />
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
					<ParticipantsIcon className="w-5 h-5 mr-2" />
					{event.participants.toLocaleString()}
				</div>
				<Link
					className="text-alt bg-alt px-3 py-1 rounded-4xl font-medium"
					to={`/event/${event.id}`}
				>
					Vote Now
				</Link>
			</div>
		</div>
	</div>
);

const ImagePlaceholder = () => (
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
);
