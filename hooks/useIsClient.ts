import { useState, useEffect } from 'react';
import isBrowser from '../lib/isBrowser';

const useIsClient = () => {
  const [isClient, setIsClient] = useState<boolean>(false); //A boolean value indicating whether the code is running in a client environment where the window object is available.

  useEffect(() => {
    if (isBrowser) setIsClient(true); //Set to true to check if the code is running in a client environment
    else setIsClient(false);
  }, []);

  return isClient;
};

export default useIsClient;
