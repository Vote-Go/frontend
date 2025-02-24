import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setThemeSetting } from "../../../features/theme/lib/theme";
import { Link } from "react-router";
import ThemeIcon from "../../../features/theme/ui/ThemeIcon";
import { MobileMenuButton } from "./MobileMenuButton";
import { NavigationMenu } from "./NavigationMenu";
import React from "react";
interface IHeader {
	darkMode: boolean;
}

const Header: React.FC<IHeader> = ({ darkMode }) => {
	const dispatch = useDispatch();

	const handleThemeSwitch = useCallback(() => {
		dispatch(setThemeSetting());
	}, [dispatch]);

	const [navbarOpen, setNavbarOpen] = useState(false);

	return (
		<header className="bg text sticky top-0 z-50 border-b-[var(--bg-alt)] border-b-[1.2px]">
			<div className="container mx-auto flex flex-wrap p-5 md:flex-row">
				<Link
					className="flex items-center text mb-4 md:mb-0 pr-4"
					to="/"
				>
					<span className="text text-2xl font-bold tracking-tighter">
						Vote<span className="text-secondary mx-2">&</span>Go
					</span>
				</Link>

				<MobileMenuButton
					isOpen={navbarOpen}
					toggle={() => setNavbarOpen(!navbarOpen)}
				/>

				<NavigationMenu isOpen={navbarOpen} />
				<button
					className="group cursor-pointer ml-5"
					onClick={handleThemeSwitch}
					data-testid="theme-switching-button"
				>
					<ThemeIcon darkMode={!darkMode} />
				</button>
			</div>
		</header>
	);
};

export default Header;
