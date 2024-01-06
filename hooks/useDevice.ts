import { useState, useEffect } from 'react';

// Define the possible device states
type DeviceState = 'Mobile' | 'Tablet' | 'Desktop';

interface DeviceInfo {
  state: DeviceState;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// This hook returns the current device type
const useDevice = (): DeviceInfo => {
  const getDeviceType = (): DeviceState => {
    const width = window.innerWidth;

    if (width < 768) {
      return 'Mobile';
    } else if (width >= 768 && width < 992) {
      return 'Tablet';
    } else {
      return 'Desktop';
    }
  };

  const [device, setDevice] = useState<DeviceState>(getDeviceType());

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDeviceType());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = device === 'Mobile';
  const isTablet = device === 'Tablet';
  const isDesktop = device === 'Desktop';

  return { state: device, isMobile, isTablet, isDesktop };
};

export default useDevice;
