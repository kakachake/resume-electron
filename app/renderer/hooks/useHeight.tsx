import { useEffect, useState } from 'react';

export const useHeight = (offHeight: number) => {
  const [height, setHeight] = useState(document.documentElement.clientHeight);

  useEffect(() => {
    const handleResize = () => {
      setHeight(document.documentElement.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return [height - offHeight, setHeight] as const;
};
