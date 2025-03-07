import { TypeOfVote } from "../../../entities/market/types/common";
import { cn } from "../../../shared/lib/format/cn";
import React from "react";

interface IOutcome {
  outcome: TypeOfVote;
  selected: boolean;
  price: number;
  probability: number;
  onClick: () => void;
  className?: string;
}

const Outcome: React.FC<IOutcome> = ({
  outcome,
  selected,
  price,
  probability,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-4 rounded-xl transition-all cursor-pointer border-2",
        selected
          ? outcome === "YES"
            ? "border-green-500 bg-green-50 shadow-lg"
            : "border-red-500 bg-red-50 shadow-lg"
          : "border-transparent bg-gray-50 hover:bg-gray-100",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3
          className={cn(
            "text-xl font-bold",
            outcome === "YES" ? "text-green-600" : "text-red-600"
          )}
        >
          {outcome}
        </h3>
        <div className="text-right">
          <p className="text-3xl font-bold">{price}₽</p>
          <p className="text-sm text-gray-500">{probability}% вероятность</p>
        </div>
      </div>
    </button>
  );
};

export default Outcome;
