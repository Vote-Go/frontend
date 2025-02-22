import { useEvents } from "../features/event/lib/hooks/useEvents";
import { Container } from "../shared/ui/Container";
import { ErrorMessage } from "../shared/ui/standart/ErrorMessage";
import { Loader } from "../shared/ui/standart/Loader";
import { EventsGrid } from "../widgets/events/EventsGrid/ui/EventsGrid";
import { Hero } from "../widgets/hero";

export const Market = () => {
	const { events, isLoading, error, isEmpty } = useEvents();

	if (isLoading) {
		return (
			<Container>
				<Loader centered />
			</Container>
		);
	}

	if (error) {
		return (
			<Container>
				<ErrorMessage message={error} />
			</Container>
		);
	}

	if (isEmpty) {
		return (
			<Container>
				<div className="text-center py-20 text-white/80">
					No active events available
				</div>
			</Container>
		);
	}

	return (
		<Container>
			<Hero
				title="Choose. Vote. Win."
				subtitle="Just select the most remarkable event and cast your vote"
			/>
			<EventsGrid events={events} />
		</Container>
	);
};
