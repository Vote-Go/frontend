import { MarketData } from "../../../entities/market/types/market";
import { LineChart } from "../../../shared/ui/LineCharts/LineChart";

interface IChartSection {
  marketData: MarketData;
  selectedSpread: string;
}

// date that's being shown along the x axis
const dateAxis = (selectedSpread: string, t: Date): string => {
  if (
    selectedSpread == "1H" ||
    selectedSpread == "6H" ||
    selectedSpread == "1D"
  ) {
    return t.toTimeString().substring(0, 5);
  }
  return t.toLocaleDateString();
};

const ChartSection: React.FC<IChartSection> = ({
  marketData,
  selectedSpread,
}) => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Динамика цен</h3>
      <LineChart
        data={{
          labels: marketData.activityChart.timestamps.map((t) =>
            dateAxis(selectedSpread, new Date(t))
          ),
          datasets: [
            {
              label: "Количество голосов YES",
              data: marketData.activityChart.volumeYes,
              borderColor: "#10B981",
              tension: 0.4,
              pointStyle: false,
            },
            {
              label: "Количество голосов NO",
              data: marketData.activityChart.volumeNo,
              borderColor: "#EF4444",
              tension: 0.4,
              pointStyle: false,
            },
          ],
        }}
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}₽`,
              },
            },
            legend: {
              display: true,
              labels: {
                boxWidth: 20,
                boxHeight: 10,
              },
            },
          },
        }}
      />
    </>
  );
};

export default ChartSection;
