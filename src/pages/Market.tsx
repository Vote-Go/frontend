import { useEvents } from "../features/event/lib/hooks/useEvents";
import FilterSection from "../features/event/ui/FilterSection";
import { Container } from "../shared/ui/Container";
import { ErrorMessage } from "../shared/ui/standart/ErrorMessage";
import { Loader } from "../shared/ui/standart/Loader";
import { EventsGrid } from "../widgets/events/EventsGrid/ui/EventsGrid";
import { Hero } from "../widgets/hero";
import QuestionAdd from "../features/event/ui/QuestionAdd";

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
        <div className="text-center py-20 title">
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
      <hr className="bg-alt w-full h-[2px]" />
      <h2 className="title !text-3xl text-center mt-5">Top 3 Events Today</h2>
      <EventsGrid events={events} />
      <h2 className="title !text-2xl text-center mt-5">Other Actions</h2>
      <QuestionAdd />
    </Container>
  );
};
