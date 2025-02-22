import { Developer } from "../../../entities/developer/types/developer";

export const DEVELOPERS: Developer[] = [
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
