// Define general type for useWindowSize hook, which includes width and height
import {useEffect, useState} from 'react';

interface Size {
  width: number | undefined;
  height: number | undefined;
}

// Hook
export function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
