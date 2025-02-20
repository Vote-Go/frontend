// HeroStats.tsx
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export const HeroStats = ({ children }: { children: React.ReactNode }) => (
  <section className="py-20 border-t border-b border-gray-800">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap -m-4 text-center">{children}</div>
    </div>
  </section>
);

export const HeroStatItem = ({ value, label }: { value: number; label: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <div ref={ref} className="p-4 sm:w-1/3 w-1/2">
      <h2 className="font-medium sm:text-5xl text-3xl text-white">
        {isVisible && (
          <CountUp 
            end={value} 
            duration={2.5} 
            decimals={value % 1 !== 0 ? 1 : 0}
          />
        )}
      </h2>
      <p className="text-gray-400 mt-2">{label}</p>
    </div>
  );
};
