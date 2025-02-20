// HeroStats.tsx
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Container from "../../shared/Container/Container";

export const HeroStats = ({ children }: { children: React.ReactNode }) => (
	<section className="py-20 ">
		<Container>
			<div className="flex flex-wrap -m-4 text-center">{children}</div>
		</Container>
	</section>
);

export const HeroStatItem = ({
	value,
	label,
}: {
	value: number;
	label: string;
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	useEffect(() => {
		if (inView) {
			setIsVisible(true);
		}
	}, [inView]);

	return (
		<div ref={ref} className="p-4 sm:w-1/3 w-1/2">
			<h2 className="font-medium sm:text-5xl text-3xl text">
				{isVisible && (
					<CountUp
						end={value}
						duration={2.5}
						decimals={value % 1 !== 0 ? 1 : 0}
					/>
				)}
			</h2>
			<p className="hover-text mt-2">{label}</p>
		</div>
	);
};
