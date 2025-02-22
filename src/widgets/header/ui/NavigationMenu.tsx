// widgets/header/ui/NavigationMenu.tsx
import { FC } from "react";
import { NavLink } from "react-router";
import { cn } from "../../../shared/lib/format/cn";
import { PAGES } from "../../../entities/page/types/page";

interface NavigationMenuProps {
	isOpen: boolean;
}

export const NavigationMenu: FC<NavigationMenuProps> = ({ isOpen }) => {
	return (
		<nav
			className={cn(
				"md:flex flex-grow items-center transition-all duration-300 overflow-hidden",
				{
					"max-h-0 md:max-h-none opacity-0 md:opacity-100": !isOpen,
					"max-h-96 opacity-100": isOpen,
				}
			)}
			aria-label="Main navigation"
		>
			<ul className="flex flex-col md:flex-row md:ml-auto md:space-x-6">
				{Object.values(PAGES).map((page) => (
					<li key={page}>
						<NavLink
							to={`/${page.toLowerCase()}`}
							className={({ isActive }) =>
								cn(
									"block px-4 py-2 hover-text transition-colors uppercase font-medium",
									{
										"text-alt font-medium": isActive,
										text: !isActive,
									}
								)
							}
						>
							{page}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
