import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				gray: {
					100: "#FBFBFB",
					200: "#f4f4f6",
					300: "#b8bcbf",
					400: "#999999",
					500: "#7F7F7F",
					600: "#666666",
					700: "#4C4C4C",
					800: "#333333",
					900: "#191919",
				},
			},
			lineClamp: {
				3: "3",
			},
		},
	},
};

export default config;
