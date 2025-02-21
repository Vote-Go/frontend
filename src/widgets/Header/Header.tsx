import React from "react";
import { Link } from "react-router";
import ThemeIcon from "./components/ThemeIcon";
import { setThemeSetting } from "../../store/features/themeSlice";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { PAGES } from "../../helpers/Page/page";

interface HeaderProps {
	darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ darkMode }) => {
	const dispatch = useDispatch();

	const handleThemeSwitch = useCallback(() => {
		dispatch(setThemeSetting());
	}, [dispatch]);

	const [navbarOpen, setNavbarOpen] = React.useState(false);

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
				>
					<ThemeIcon darkMode={!darkMode} />
				</button>
			</div>
		</header>
	);
};

const MobileMenuButton = ({ isOpen, toggle }) => (
	<button
		className="md:hidden ml-auto pb-3 focus:outline-none"
		onClick={toggle}
		aria-label="Toggle navigation"
	>
		<svg
			className="w-6 h-6"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
			/>
		</svg>
	</button>
);

const NavigationMenu = ({ isOpen }) => (
	<div
		className={`md:flex flex-grow items-center ${
			isOpen ? "flex" : "hidden"
		}`}
	>
		<nav className="md:ml-auto flex flex-wrap items-center gap-6 font-medium">
			{PAGES.map((headerItem) => (
				<NavLink href={`/${headerItem}`}>
					{headerItem.toLocaleUpperCase()}
				</NavLink>
			))}
		</nav>
	</div>
);

const NavLink = ({ href, children }) => (
	<Link to={href} className="hover-text">
		{children}
	</Link>
);

export default Header;
