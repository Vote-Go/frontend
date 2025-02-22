import { ReactNode } from "react";

export interface StatItem {
	id: string;
	value: number;
	label: string;
	icon?: ReactNode;
}
