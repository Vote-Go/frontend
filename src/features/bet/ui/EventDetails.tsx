interface IEventDetails {
	description: string;
	resolutionDetails: string;
}
const EventDetails: React.FC<IEventDetails> = ({
	description,
	resolutionDetails,
}) => (
	<div className="p-6 bg-white rounded-xl shadow-lg space-y-4">
		<h3 className="text-xl font-semibold">Детали события</h3>
		<p className="text-gray-600 leading-relaxed">{description}</p>
		<div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
			<h4 className="font-semibold text-amber-800 mb-2">
				Правила разрешения
			</h4>
			<p className="text-sm text-amber-700">{resolutionDetails}</p>
		</div>
	</div>
);

export default EventDetails;
