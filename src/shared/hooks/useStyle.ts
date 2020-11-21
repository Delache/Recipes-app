import { useEffect } from 'react';

const useScript = (url: string) => {
  useEffect(() => {
    const link = document.createElement('link');

    link.href = url;
    link.rel = 'stylesheet';

    document.body.appendChild(link);

    return () => {
      document.body.removeChild(link);
    }
  }, [url]);
};

export default useScript;