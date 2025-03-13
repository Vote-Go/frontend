import { useEffect, useState } from "react";
import axios from "axios";

// Define the type for an EventItem
interface EventItem {
  id: string;
  title: string;
  description: string;
}

export const useEvents = () => {
  // State variables
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = `
          query MyQuery {
            questions {
              id
              title
              description
            }
          }
        `;

        const response = await axios({
          method: "post",
          url: "https://yamata-no-orochi.nktkln.com/graphql",
          headers: {
            accept: "application/json, multipart/mixed",
            "content-type": "application/json",
            origin: "https://yamata-no-orochi.nktkln.com",
            priority: "u=1, i",
            referer: "https://yamata-no-orochi.nktkln.com/graphql",
          },
          data: {
            query,
            operationName: "MyQuery",
          },
        });

        setEvents(response.data.data.questions);
      } catch (err) {
        // Handle errors
        setError(
          err.response
            ? err.response.data
            : err.message || "Failed to load events"
        );
      } finally {
        // Update loading state
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
