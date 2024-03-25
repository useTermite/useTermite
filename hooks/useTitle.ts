import { useEffect } from 'react';
import isBrowser from '../lib/isBrowser';

const useTitle = (title: string) => {
  useEffect(() => {
    if (isBrowser) document.title = title; //Changes the title of the current page documant
  }, [title, window]);
};

export default useTitle;
