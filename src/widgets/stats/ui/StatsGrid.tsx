import { StatItem } from "../../../entities/stats/stats";
import { Container } from "../../../shared/ui/Container";
import { StatsItem } from "./StatsItem";

export const StatsGrid = ({ items }: { items: StatItem[] }) => (
	<Container border>
		<div className="flex flex-wrap -m-4 text-center">
			{items.map((item) => (
				<StatsItem
					key={item.id}
					id={item.id}
					value={item.value}
					label={item.label}
				/>
			))}
		</div>
	</Container>
);
