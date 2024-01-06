import { useState } from 'react';

// * types
export type UseForceUpdateReturn = [Function, boolean];

// * a custom hook to force a re-render
const useForceUpdate = (): UseForceUpdateReturn => {
  const [_, setState] = useState<boolean>(false);

  const forceUpdate = () => setState(prev => !prev);

  // * the state itself is exported in case it's needed to be
  // * included inside of the dependency array of useEffect
  // * or such
  return [forceUpdate, _];
};

export default useForceUpdate;
