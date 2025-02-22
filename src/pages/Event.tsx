import { useMemo, useState } from "react";
import { calculatePayout } from "../features/bet/lib";
import { useBet } from "../features/bet/model/useBet";
import {
	Outcome,
	BetArea,
	EventDetails,
	HistoryVotesTable,
	ChartSection,
} from "../features/bet/ui";
import { Container } from "../shared/ui/Container";
import { Hero } from "../widgets/hero";
import { formatMarketDate, generateMarketData } from "../shared/lib";
import { TypeOfVote } from "../entities/market/types/common";

const Event = () => {
	const [marketData] = useState(generateMarketData()[0]);
	const { selectedOutcome, setSelectedOutcome, amount, setAmount } = useBet();

	const potentialPayout = useMemo(
		() => calculatePayout(amount, selectedOutcome, marketData),
		[amount, selectedOutcome, marketData]
	);

	return (
		<Container className="mx-auto space-y-6">
			<Hero
				title={marketData.title}
				subtitle={`Закрытие: ${marketData.endDate}`}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-8 xl:gap-12">
				<ChartSection marketData={marketData} className="md:order-2" />

				<div className="grid grid-rows-[auto_1fr] md:grid-rows-none gap-6 md:gap-8">
					<div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
						{(["YES", "NO"] as TypeOfVote[]).map((outcome) => {
							const lowerOutcome =
								outcome.toLowerCase() as Lowercase<TypeOfVote>;
							return (
								<Outcome
									key={outcome}
									outcome={outcome}
									selected={selectedOutcome === outcome}
									price={
										marketData.currentStats[lowerOutcome]
											.price
									}
									probability={
										marketData.currentStats[lowerOutcome]
											.probability
									}
									onClick={() => setSelectedOutcome(outcome)}
									className="h-full"
								/>
							);
						})}
					</div>

					<BetArea
						selectedOutcome={selectedOutcome}
						amount={amount}
						onAmountChange={setAmount}
						potentialPayout={potentialPayout}
					/>
				</div>
			</div>

			<EventDetails {...marketData} />
			<HistoryVotesTable historicalData={marketData.historicalData} />
		</Container>
	);
};

export default Event;
