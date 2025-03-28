import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import React from "react";

export const useStatsAnimation = () => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (inView) setIsVisible(true);
	}, [inView]);

	return { isVisible, ref };
};
