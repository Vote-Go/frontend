import { useMemo, useState } from "react";
import { calculatePayout } from "../features/bet/lib";
import { useBet } from "../features/bet/model/useBet";
import React from "react";

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
export const SpreadButtons = (
  updateMarketData: Function,
  selectedSpread: string
) => {
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

  const [buyYes, setBuyYes] = useState(true); // Buy 'Yes' votes by default
  const [isBet, setIsBet] = useState(false); // false -> the input contains the bet amount
  const [betValue, setBetValue] = useState("");
  const selectAdd = {
    "+$1": 1,
    "+$20": 20,
    "+$100": 100,
    Max: 0,
  };

  const handleAddition = (raise) => {
    if (betValue == "") {
      setBetValue(String(raise));
    } else {
      const newBetAmount = String(raise == 0 ? 0 : parseInt(betValue) + raise);
      setBetValue(newBetAmount);
    }
  };

  const selectAddButtons = Object.keys(selectAdd).map((raise) => {
    return (
      <button
        onClick={() => handleAddition(selectAdd[raise])}
        className="text-white dark:text-gray-500 tracking-tighter px-2 py-1 rounded-xl  text-sm dark:border-gray-200 border-white/40 border-1 cursor-pointer dark:hover:bg-gray-200/75 dark:hover:border-gray-200/75 hover:bg-gray-700/75 hover:border-gray-700/75"
      >
        {raise}
      </button>
    );
  });

  function updateMarketData(option: string) {
    setMarketData(generateMarketData(option)[0]);
    setSelectedSpread(option);
  }

  const handleInput = (e) => {
    setIsBet(e.target.value.length > 0);
    const numericValue = e.target.value.replace(/\D/g, "").slice(0, 6);

    setBetValue(numericValue);
  };

  return (
    <Container className="mx-auto space-y-6">
      <Hero
        title={marketData.title}
        subtitle={`Закрытие: ${marketData.endDate}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-8 xl:gap-12">
        <div className="p-6 dark:bg-white bg-black rounded-xl shadow-lg w-full md:col-span-2">
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
            <div
              data-testid="betting-interface"
              className="border-1 w-76 h-auto max-h-80 bg-gray-900/25 dark:bg-white dark:border-gray-200 border-white/40 rounded-2xl"
            >
              <div className="p-4">
                <div className="*:w-32 *:h-12 flex justify-between *:font-medium *:rounded-xl *:hover:cursor-pointer py-2 ">
                  <button
                    onClick={() => setBuyYes(true)}
                    data-testid="yes-button-id"
                    className={`${buyYes ? "bg-green-500/80 dark:bg-green-500 hover:bg-green-500/90 text-white/50 dark:text-white/75" : "bg-gray-600/50 dark:bg-gray-200 hover:bg-gray-600/45 dark:text-gray-700/30 dark:hover:bg-gray-200/50 text-white/40"}  `}
                  >
                    Yes{" "}
                    <span
                      className={`${buyYes ? "text-white/80 dark:text-white" : "text-gray-300/50 dark:text-gray-700/40"}  text-xl px-1`}
                    >
                      77$
                    </span>
                  </button>
                  <button
                    onClick={() => setBuyYes(false)}
                    data-testid="no-button-id"
                    className={`${!buyYes ? "bg-red-600/70 dark:bg-red-600/90 hover:bg-red-600/60 text-white/60 dark:text-white/70" : "bg-gray-600/50 dark:hover:bg-gray-200/75 dark:bg-gray-200 hover:bg-gray-600/45 dark:text-gray-500/75 text-white/40"} `}
                  >
                    No
                    <span
                      className={`${!buyYes ? "text-white/80 dark:text-white" : "dark:text-gray-500/75  text-gray-300/75"} px-1 text-xl `}
                    >
                      23.6$
                    </span>
                  </button>
                </div>
              </div>
              <div className="p-4 h-22 relative bottom-2 flex justify-between">
                <div>
                  <p className="text-gray-200/75 text-lg font-bold dark:text-gray-600">
                    Amount
                  </p>
                </div>

                <div>
                  <div className="relative left-4 top-2">
                    <input
                      type="string"
                      onInput={handleInput}
                      value={betValue}
                      className={`!transition placeholder-gray-700 dark:placeholder-gray-400 text-right focus:outline-none w-4/5 dark:text-black text-white text-4xl`}
                      placeholder="0"
                      data-testid="bet-input"
                    />{" "}
                    <span
                      data-testid="dollar-sign-id"
                      className={`${!isBet ? "text-gray-700 dark:text-gray-400" : "text-white dark:text-black"} text-4xl`}
                    >
                      $
                    </span>
                  </div>
                </div>
              </div>
              <div className="!transition px-4 flex justify-end gap-2 relative bottom-4  h-auto w-full">
                {selectAddButtons}
              </div>

              <div
                className={`${betValue == "0" || betValue == "" ? "hidden" : "!transition border-t-4   dark:border-gray-200  border-gray-700 p-4 h-24 flex items-center justify-end"}`}
              >
                <span className="text-green-400 dark:text-green-500 font-medium text-4xl">
                  $<span className="pl-1">{betValue * 1.25}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EventDetails {...marketData} />
      <HistoryVotesTable historicalData={marketData.historicalData} />
    </Container>
  );
};

export default Event;
