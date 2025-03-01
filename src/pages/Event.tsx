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

// Buttons under the Chart for showing the spread across the given time period
// 1H 1D 1W 1M ALL
const SpreadButtons = (updateMarketData: Function, selectedSpread: string) => {
  const spreadOptions = ["1H", "6H", "1D", "1W", "1M", "ALL"];
  const spreadChooseStyle =
    "focus:rounded-full focus:dark:bg-black focus:bg-white focus:text-black focus:dark:text-white hover:cursor-pointer hover:bg-black/5 hover:rounded-full hover:delay-50";
  return spreadOptions.map((option, index) => {
    return (
      <button
        onClick={() => updateMarketData(option)}
        className={`${index == 0 && selectedSpread == "1H" ? "rounded-full dark:bg-black dark:text-white bg-white text-black" : "dark:text-black/50 text-white"} block mx-1 text-sm px-3 py-1 ${spreadChooseStyle}`}
      >
        {option}
      </button>
    );
  });
};

const Event = () => {
  const [selectedSpread, setSelectedSpread] = useState("1H"); // show for 1H time spread by default
  const [marketData, setMarketData] = useState(
    generateMarketData(selectedSpread)[0]
  );
  const { selectedOutcome, setSelectedOutcome, amount, setAmount } = useBet();

  const potentialPayout = useMemo(
    () => calculatePayout(amount, selectedOutcome, marketData),
    [amount, selectedOutcome, marketData]
  );

  function updateMarketData(option: string) {
    setMarketData(generateMarketData(option)[0]);
    setSelectedSpread(option);
  }

  return (
    <Container className="mx-auto space-y-6">
      <Hero
        title={marketData.title}
        subtitle={`Закрытие: ${marketData.endDate}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-8 xl:gap-12">
        <div className="p-6 dark:bg-white bg-black rounded-xl shadow-lg w-full md:order-2">
          <ChartSection
            marketData={marketData}
            selectedSpread={selectedSpread}
          />
          <div className="flex justify-between w-1/3 my-3">
            {SpreadButtons(updateMarketData, selectedSpread)}
          </div>
        </div>

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
                  price={marketData.currentStats[lowerOutcome].price}
                  probability={
                    marketData.currentStats[lowerOutcome].probability
                  }
                  onClick={() => setSelectedOutcome(outcome)}
                  className="h-full dark:bg-white dark:text-black dark:hover:bg-gray-100 bg-white/5 text-white/80 hover:bg-white/10"
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
