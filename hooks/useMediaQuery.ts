import { useState, useEffect } from 'react';

// This hook accepts a media query string and returns a boolean indicating whether the media query matches
const useMediaQuery = (query: string): boolean => {
  // Create a state for the match status
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Ensure that window is defined (for SSR compatibility)
    if (typeof window !== 'undefined') {
      // Create a MediaQueryList object
      const mediaQueryList = window.matchMedia(query);

      // Handler to call on media query status change
      const documentChangeHandler = () => setMatches(mediaQueryList.matches);

      // Add listener for changes
      mediaQueryList.addEventListener('change', documentChangeHandler);

      // Set the initial match status
      setMatches(mediaQueryList.matches);

      // Cleanup function to remove the listener
      return () => {
        mediaQueryList.removeEventListener('change', documentChangeHandler);
      };
    }
  }, [query]); // Only re-run effect if query changes

  return matches;
};

export default useMediaQuery;
