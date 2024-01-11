import { useState } from 'react';

// Define a custom type for the forceUpdate function
type ForceUpdateFunction = () => void;

// Define a custom hook to force a re-render
const useForceUpdate = (): [ForceUpdateFunction, boolean] => {
  const [_, setState] = useState<boolean>(false);

  const forceUpdate: ForceUpdateFunction = () => setState(prev => !prev);

  // The state itself is exported in case it's needed inside the dependency array of useEffect or such
  return [forceUpdate, _];
};

export default useForceUpdate;
