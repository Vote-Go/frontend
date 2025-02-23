import CountUp from "react-countup";
import { StatItem } from "../../../entities/stats/stats";
import { useStatsAnimation } from "../model/useStatsAnimation";
import React from "react";

export const StatsItem = ({ value, label }: StatItem) => {
	const { isVisible, ref } = useStatsAnimation();

	return (
		<div
			ref={ref}
			className="p-4 sm:w-1/3 w-1/2"
			data-testid="stat-item-div"
		>
			<h2
				data-testid="stat-item-header"
				className="font-medium sm:text-5xl text-3xl text-alt"
			>
				{isVisible && (
					<CountUp
						end={value}
						duration={2.5}
						decimals={value % 1 !== 0 ? 1 : 0}
						className="text"
					/>
				)}
			</h2>
			<p className="mt-2 hover-text" data-testid="stat-item-label">
				{label}
			</p>
		</div>
	);
};
