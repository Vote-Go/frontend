interface ImageWithFallbackProps {
	src?: string;
	alt: string;
	fallback: React.ReactNode;
  }
  
  export const ImageWithFallback = ({
	src,
	alt,
	fallback,
	...props
  }: ImageWithFallbackProps) => {
	if (!src) return <>{fallback}</>;
	
	return (
	  <img
		src={src}
		alt={alt}
		className="w-full h-full object-cover"
		{...props}
	  />
	);
  };
  