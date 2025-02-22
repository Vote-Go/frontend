export const formatPrice = (value: number) =>
	value.toLocaleString("ru-RU", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}) + "₽";
