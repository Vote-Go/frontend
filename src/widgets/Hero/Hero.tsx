interface IHero {
	title: string;
	subtitle: string;
}

const Hero: React.FC<IHero> = ({ title, subtitle }) => {
	return (
		<div className="text-center">
			<h1 className="title mb-6 title">{title}</h1>
			<p className="text-xl hover-text mb-12 max-w-2xl mx-auto ">
				{subtitle}
			</p>
		</div>
	);
};

export default Hero;
