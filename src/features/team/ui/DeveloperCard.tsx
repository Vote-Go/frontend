import { Link } from "react-router";
import { Developer } from "../../../entities/developer/types/developer";
import { DeveloperDefinition } from "../../../entities/developer/ui/DeveloperDifinnition";

export const DeveloperCard = (props: Developer) => (
	<Link
		to={props.githubLink}
		target="_blank"
		rel="noopener noreferrer"
		className="flex h-full flex-col gap-4 rounded-xl border border-white px-4 py-6 sm:px-6 sm:py-8 dark:border-black"
	>
		<DeveloperDefinition {...props} />
	</Link>
);
