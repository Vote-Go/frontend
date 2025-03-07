import { HistoricalDataPoint } from "../../../entities/market/types/market";
import { formatPrice } from "../../../shared/lib";
import React from "react";

interface IHistoryVotesTable {
  historicalData: HistoricalDataPoint[];
}

const tableHeaders = ["Дата", "Yes", "No"];

const HistoryVotesTable: React.FC<IHistoryVotesTable> = ({
  historicalData,
}) => (
  <div className="p-6  bg-white/5 dark:bg-white rounded-xl shadow-lg">
    <h3 className="text-xl text-center  font-semibold mb-8 dark:text-black text-white/80">
      История торгов
    </h3>
    <div className="overflow-auto w-full rounded-md lg:w-3/4 mx-auto dark:bg-white bg-black border-gray-800/50 dark:border-gray-300 border-1">
      <table className="w-full">
        <thead className="[&_tr]:border-b [&_tr]:border-gray-800/50 dark:[&_tr]:border-gray-300 hover:bg-gray-900/40 dark:hover:bg-gray-200/50">
          <tr>
            {tableHeaders.map((header) => {
              return (
                <th
                  className={`dark:text-gray-400 text-gray-400/50  h-10 px-2 text-left font-medium group-hover:cursor-pointer`}
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {historicalData.map((point, i) => (
            <tr
              key={i}
              className="border-b dark:text-black text-white/75 border-gray-800/50 dark:border-gray-300 *:p-2 hover:bg-gray-900/40 dark:hover:bg-gray-100"
            >
              <td>{new Date(point.date).toLocaleDateString("ru-RU")}</td>
              <td>{formatPrice(point.volumeYes)}</td>
              <td>{formatPrice(point.volumeNo)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default HistoryVotesTable;
