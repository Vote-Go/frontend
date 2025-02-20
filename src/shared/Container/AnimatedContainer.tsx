import { ReactNode, useCallback, useRef, useState } from "react";

interface IAnimatedContainer {
	children: ReactNode;
}

const AnimatedContainer: React.FC<IAnimatedContainer> = ({ children }) => {
	const [transformStyle, setTransformStyle] = useState("");
	const itemRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			if (!itemRef.current) return;

			requestAnimationFrame(() => {
				const { left, top, width, height } =
					itemRef.current!.getBoundingClientRect();
				const relativeX = (event.clientX - left) / width;
				const relativeY = (event.clientY - top) / height;

				const MULTIPLE_OF_CONTAINER_TURNING = 12;
				const sizeOfMovingX =
					(relativeX - 1.5) * MULTIPLE_OF_CONTAINER_TURNING;
				const sizeOfMovingY =
					(relativeY - 1.5) * MULTIPLE_OF_CONTAINER_TURNING;

				const newTransform = `perspective(700px) rotateX(${sizeOfMovingX}deg) rotateY(${sizeOfMovingY}deg) scale3d(0.90, 0.90, 0.90)`;

				setTransformStyle((prev) =>
					prev !== newTransform ? newTransform : prev
				);
			});
		},
		[]
	);

	const handleMouseLeave = useCallback(() => {
		setTransformStyle("");
	}, []);

	return (
		<div
			ref={itemRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				transform: transformStyle,
				transition: "transform 0.2s ease-out",
				width: "100%",
			}}
		>
			{children}
		</div>
	);
};

export default AnimatedContainer;
