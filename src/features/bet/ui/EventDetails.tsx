interface IEventDetails {
  description: string;
  resolutionDetails: string;
}
const EventDetails: React.FC<IEventDetails> = ({
  description,
  resolutionDetails,
}) => (
  <div className="p-6 bg-white/7 dark:bg-white rounded-xl shadow-lg space-y-4">
    <h3 className="text-xl font-semibold text-white/75 dark:text-black">
      Детали события
    </h3>
    <p className="dark:text-gray-600 text-gray-400 leading-relaxed">
      {description}
    </p>
    <div className="dark:bg-amber-50 bg-amber-50/75 p-4 rounded-lg border border-amber-200">
      <h4 className="font-semibold text-amber-900 dark:text-amber-800 mb-2">
        Правила разрешения
      </h4>
      <p className="text-sm text-amber-800 dark:text-amber-700">
        {resolutionDetails}
      </p>
    </div>
  </div>
);

export default EventDetails;
