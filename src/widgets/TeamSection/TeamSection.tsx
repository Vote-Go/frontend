import { Link } from "react-router";
import {
	DeveloperName,
	DeveloperRole,
	DeveloperUsername,
} from "../../entities/developer/developerName";
import { AnimatedContainer, Container } from "../../shared/Container";

export const DEVELOPERS: IDeveloperCard[] = [
	{
		name: "Alex",
		username: "hellpes",
		role: "frontend",
		description: `<> just overrated as f </>`,
		githubLink: "https://github.com/hellpes666",
	},
	{
		name: "Marat",
		username: "maratdev0210",
		description: `<> шахматы - 2.200 рейтинга; часы - 50к </>`,
		role: "frontend",
		githubLink: "https://github.com/maratdev0210",
	},
	{
		name: "Danya",
		username: "danchicic52",
		description: `<> любитель амнямов и сладких альтушек </>`,
		role: "backend",
		githubLink: "https://github.com/Danchicic",
	},
	{
		name: "Egor",
		username: "spaklak",
		description: `<> Prompt: 70%; Skill Issue: 100% </>`,
		role: "fullstack",
		githubLink: "https://github.com/Spaklak",
	},
	{
		name: "Nikita",
		username: "nktkln",
		description: `<> легендарна карточка разработчика </> <> TEAM LEAD of амнмычи </> `,
		role: "team-lead",
		githubLink: "https://github.com/NKTKLN",
	},
] as const;

export default function TeamSection() {
	return (
		<Container>
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					Our Core Team
				</h2>
				{/* Реализация карточек команды */}
				<DeveloperGrid />
			</div>
		</Container>
	);
}

interface IDeveloperCard {
	name: DeveloperName;
	username: DeveloperUsername;
	role: DeveloperRole;
	description: string;
	githubLink: string;
}

const DeveloperDefinition: React.FC<Omit<IDeveloperCard, "githubLink">> = ({
	name,
	username,
	role,
	description,
}) => {
	return (
		<>
			<h3 className="text-alt text-center text-md lg:text-3xl font-bold uppercase sm:text-left">
				{username}
			</h3>
			<span className="text text-center font-medium text-sm lg:text-lg sm:text-left bg w-fit px-2 py-1 rounded-4xl">
				{name} - <strong>{role}</strong>
			</span>
			<p className="text-alt text-sm lg:text-md text-center tracking-wider	 text-balance sm:text-left font-medium">
				{description}
			</p>
		</>
	);
};

const DeveloperCard: React.FC<IDeveloperCard> = ({
	name,
	username,
	role,
	description,
	githubLink,
}) => {
	return (
		<Link
			to={githubLink}
			target="_blank"
			rel="noopener noreferrer"
			className="flex h-full flex-col gap-4 rounded-xl border border-[var(--bg-dark)] px-4 py-6 sm:px-6 sm:py-8 dark:border-[var(--bg-light)]"
		>
			<DeveloperDefinition
				description={description}
				name={name}
				username={username}
				role={role}
			/>
		</Link>
	);
};

const DeveloperGrid = () => {
	return (
		<div className="my-6 grid grid-cols-3 grid-rows-2 gap-4">
			{DEVELOPERS.slice(0, 4).map((dev, index) => (
				<AnimatedContainer key={index}>
					<DeveloperCard
						name={dev.name}
						username={dev.username}
						description={dev.description}
						role={dev.role}
						githubLink={dev.githubLink}
					/>
				</AnimatedContainer>
			))}
			<div className="w-full col-start-2 col-end-4 flex justify-center mx-auto">
				<AnimatedContainer>
					<DeveloperCard
						name={DEVELOPERS[4].name}
						username={DEVELOPERS[4].username}
						description={DEVELOPERS[4].description}
						role={DEVELOPERS[4].role}
						githubLink={DEVELOPERS[4].githubLink}
					/>
				</AnimatedContainer>
			</div>
		</div>
	);
};
