import React from "react";

interface IHero {
	title: string;
	subtitle?: string;
}

const Hero: React.FC<IHero> = ({ title, subtitle }) => {
	return (
		<div className="text-center">
			<h1 data-testid="hero-title" className="title mb-6">
				{title}
			</h1>
			{subtitle && (
				<p
					data-testid="hero-subtitle"
					className="text-xl hover-text mb-12 max-w-2xl mx-auto"
				>
					{subtitle}
				</p>
			)}
		</div>
	);
};

export default Hero;
