import { HistoricalDataPoint } from "../../../../entities/market/types/market";
import { formatPrice } from "../../../../shared/lib";

interface IHistoryVotesTable {
	historicalData: HistoricalDataPoint[];
}

const HistoryVotesTable: React.FC<IHistoryVotesTable> = ({
	historicalData,
}) => (
	<div className="p-6 bg-white rounded-xl shadow-lg">
		<h3 className="text-xl font-semibold mb-4">История торгов</h3>
		<div className="overflow-x-auto">
			<table className="w-full">
				<thead className="bg-gray-50">
					<tr>
						<th className="text-left py-3 px-4">Дата</th>
						<th className="text-center py-3 px-4 text-green-600">
							ДА
						</th>
						<th className="text-center py-3 px-4 text-red-600">
							НЕТ
						</th>
					</tr>
				</thead>
				<tbody>
					{historicalData.map((point, i) => (
						<tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
							<td className="py-3 px-4">
								{new Date(point.date).toLocaleDateString(
									"ru-RU"
								)}
							</td>
							<td className="text-center py-3 px-4 font-medium">
								{formatPrice(point.volumeYes)}
							</td>

							<td className="text-center py-3 px-4 font-medium">
								{formatPrice(point.volumeNo)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	</div>
);

export default HistoryVotesTable;
