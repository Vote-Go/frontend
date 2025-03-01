import { Button } from "../../../shared/ui/standart/Button";
import { Input } from "../../../shared/ui/standart/Input";
import { TypeOfVote } from "../../../entities/market/types/common";
import { cn } from "../../../shared/lib/format/cn";

interface IBetArea {
  selectedOutcome: TypeOfVote;
  amount: string;
  onAmountChange: (sum: string) => void;
  potentialPayout: string;
  className?: string;
}

const BetArea: React.FC<IBetArea> = ({
  selectedOutcome,
  amount,
  onAmountChange,
  potentialPayout,
  className,
}) => (
  <div
    className={cn(
      "p-6 dark:bg-white bg-white/5 rounded-xl shadow-lg space-y-4",
      className
    )}
  >
    <div className="flex gap-3">
      <Input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        placeholder="Сумма ставки"
        className="flex-1 text-lg py-3 dark:text-black text-white "
        min="0"
      />
      <Button
        variant={selectedOutcome === "YES" ? "primary" : "danger"}
        className="text-lg px-8 py-3"
      >
        Купить {selectedOutcome}
      </Button>
    </div>
    {amount && (
      <div className="text-sm text-gray-600 font-medium">
        Потенциальный выигрыш: {potentialPayout}₽ (после комиссии)
      </div>
    )}
  </div>
);

export default BetArea;
