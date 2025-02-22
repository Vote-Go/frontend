import { useEffect, useState } from "react";
import { MOCK_EVENTS } from "../mokEvents";
import { EventItem } from "../../../../entities/event/types/event";

export const useEvents = () => {
	const [events, setEvents] = useState<EventItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				await new Promise((resolve) => setTimeout(resolve, 500));
				setEvents(MOCK_EVENTS);
			} catch (err) {
				setError("Failed to load events");
			} finally {
				setIsLoading(false);
			}
		};

		fetchEvents();
	}, []);

	return {
		events,
		isLoading,
		error,
		isEmpty: !isLoading && events.length === 0,
	};
};
