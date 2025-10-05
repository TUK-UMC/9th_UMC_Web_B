import { useState, useEffect } from 'react';
import { PUSHSTATE_EVENT, POPSTATE_EVENT } from './types';
import { getCurrentPath } from './utils';

export const useCurrentPath = (): string => {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const handlePathChange = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener(PUSHSTATE_EVENT, handlePathChange);
    window.addEventListener(POPSTATE_EVENT, handlePathChange);

    return () => {
      window.removeEventListener(PUSHSTATE_EVENT, handlePathChange);
      window.removeEventListener(POPSTATE_EVENT, handlePathChange);
    };
  }, []);

  return path;
};
