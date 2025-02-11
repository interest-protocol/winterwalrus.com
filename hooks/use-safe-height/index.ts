import { useEffect, useState } from 'react';

export const useSafeHeight = () => {
  const [safeHeight, setSafeHeight] = useState(0);

  const getSafeHeight = () => {
    const value = window.visualViewport?.height ?? window.innerHeight;

    if (safeHeight === value) return;

    setSafeHeight(value);
  };

  useEffect(() => {
    if (!window.visualViewport) return;

    getSafeHeight();

    window.visualViewport.addEventListener('resize', getSafeHeight);

    return () =>
      window.visualViewport?.removeEventListener('resize', getSafeHeight);
  }, []);

  useEffect(() => {
    if (!window) return;

    getSafeHeight();

    window.addEventListener('resize', getSafeHeight);

    return () => window.removeEventListener('resize', getSafeHeight);
  }, []);

  return safeHeight;
};
