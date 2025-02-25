import { EventItem } from "../../../../entities/event/types/event";
import { EventCard } from "../../../../features/event/ui/EventCard";
import { AnimatedContainer } from "../../../../shared/ui/Container";

interface EventsGridProps {
	events: EventItem[];
}

export const EventsGrid = ({ events }: EventsGridProps) => (
	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12 pt-6">
		{events.map((event, index) => (
			<AnimatedContainer key={event.id}>
				<EventCard event={event} />
			</AnimatedContainer>
		))}
	</div>
);
