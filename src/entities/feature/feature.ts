import { ReactNode } from "react";

export interface FeatureItem {
	id: string;
	title: string;
	description: string;
	icon?: ReactNode;
}
