import { useEffect, useState } from 'react';

const useIsHovered = (ref: React.RefObject<HTMLElement>, onHoverChange: (isHovered: boolean) => void) => {
  // State to track whether the element is currently being hovered.
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Event handler for mouse entering the element.
    const handleMouseEnter = () => {
      setIsHovered(true);
      onHoverChange(true);
    };

    // Event handler for mouse leaving the element.
    const handleMouseLeave = () => {
      setIsHovered(false);
      onHoverChange(false);
    };

    // Get the target element from the ref.
    const targetElement = ref.current;

    // Attach event listeners when the component mounts.
    if (targetElement) {
      targetElement.addEventListener('mouseenter', handleMouseEnter);
      targetElement.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup event listeners when the component unmounts.
    return () => {
      if (targetElement) {
        targetElement.removeEventListener('mouseenter', handleMouseEnter);
        targetElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [ref, onHoverChange]);

  // Return whether the element is currently being hovered.
  return isHovered;
};

export default useIsHovered;
