type MobileMenuButtonProps = {
	isOpen: boolean;
	toggle: () => void;
};

export const MobileMenuButton = ({ isOpen, toggle }: MobileMenuButtonProps) => (
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
