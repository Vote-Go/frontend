export const Loader = ({ centered = false }) => (
	<div className={centered ? "flex justify-center py-20" : ""}>
		<div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white" />
	</div>
);
