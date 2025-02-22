export type EventStatus = "active" | "ended" | "pending";

export interface EventItem {
	id: number;
	title: string;
	description: string;
	participants: number;
	status: EventStatus;
	image?: string;
}
