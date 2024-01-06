import { useEffect } from 'react';

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title; //Changes the title of the current page documant
  }, [title]);
};

export default useTitle;
