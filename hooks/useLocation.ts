import { useState, useEffect } from 'react';
import isBrowser from '../lib/isBrowser';

// Define the possible status messages
type Status = 'idle' | 'pending' | 'success' | 'error';

interface LocationInfo {
  latitude: number | null;
  longitude: number | null;
  status: Status;
}

// This hook returns the current location of the device
const useLocation = (): LocationInfo => {
  const [location, setLocation] = useState<LocationInfo>({
    latitude: null,
    longitude: null,
    status: 'idle'
  });

  useEffect(() => {
    // Helper function to update location state
    const updateLocation = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        status: 'success'
      });
    };

    // Helper function to handle errors
    const handleError = (error: GeolocationPositionError) => {
      setLocation(prevState => ({
        ...prevState,
        status: 'error'
      }));
      console.error(`Error occurred: ${error.message}`);
    };

    // Request the current location
    if (navigator.geolocation) {
      setLocation(prevState => ({ ...prevState, status: 'pending' }));
      if (isBrowser) navigator.geolocation.getCurrentPosition(updateLocation, handleError);
    } else {
      setLocation(prevState => ({ ...prevState, status: 'error' }));
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return location;
};

export default useLocation;
