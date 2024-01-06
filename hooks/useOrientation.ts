import { useState, useEffect } from 'react';

// Define the types for the orientation state.
type OrientationState = 'portrait' | 'landscape';

// Define the interface for the return object of the hook.
interface Orientation {
  isPortrait: boolean;
  isLandscape: boolean;
  state: OrientationState;
}

const useOrientation = (): Orientation => {
  // A function to determine the current orientation of the screen.
  // It utilizes the modern window.screen.orientation API.
  const getOrientation = (): OrientationState => {
    const type = window.screen.orientation.type;
    // Determine if the orientation is 'portrait' or 'landscape' based on the type.
    return type.startsWith('portrait') ? 'portrait' : 'landscape';
  };

  // Initialize the orientation state with the current orientation.
  const [orientation, setOrientation] = useState<OrientationState>(getOrientation());

  useEffect(() => {
    // Define a function to handle the change in orientation.
    const handleOrientationChange = () => {
      // Update the orientation state when the orientation changes.
      setOrientation(getOrientation());
    };

    // Add an event listener to the screen.orientation object.
    // This will call handleOrientationChange whenever the screen's orientation changes.
    window.screen.orientation.addEventListener('change', handleOrientationChange);

    // Cleanup function to remove the event listener when the component unmounts or re-renders.
    return () => {
      window.screen.orientation.removeEventListener('change', handleOrientationChange);
    };
  }, []); // Empty dependency array means this effect runs once on mount.

  // Return an object containing the current orientation state and booleans for quick checks.
  return {
    isPortrait: orientation === 'portrait', // True if the current orientation is portrait.
    isLandscape: orientation === 'landscape', // True if the current orientation is landscape.
    state: orientation // The current orientation state ('portrait' or 'landscape').
  };
};

export default useOrientation;
