import { Developer } from "../types/developer";

export const DeveloperDefinition = ({
	name,
	username,
	role,
	description,
}: Omit<Developer, "githubLink">) => (
	<>
		<h3 className="text text-center text-md lg:text-3xl font-bold uppercase sm:text-left">
			{username}
		</h3>
		<span className="text text-center font-medium text-sm lg:text-lg sm:text-left bg w-fit px-2 py-1 rounded-4xl">
			{name} - <strong className="text">{role}</strong>
		</span>
		<p className="text text-sm lg:text-md text-center tracking-wider	 text-balance sm:text-left font-medium">
			{description}
		</p>
	</>
);
