import { DeveloperName, DeveloperUsername } from "./name";
import { DeveloperRole } from "./role";

export interface Developer {
	name: DeveloperName;
	username: DeveloperUsername;
	role: DeveloperRole;
	description: string;
	githubLink: string;
	avatarUrl?: string;
}
