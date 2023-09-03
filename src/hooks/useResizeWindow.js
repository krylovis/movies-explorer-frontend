import React from 'react';
import debounce from 'lodash.debounce';

export default function useResizeWindow() {
  const [howMuchToAdd, setHowMuchToAdd] = React.useState(0);
  const [defaultMoviesCounter, setDefaultMoviesCounter] = React.useState(0);

  React.useEffect(() => {
    const resize = () => {
      console.log('resize');
      const { clientWidth } = document.body;
      const isLargeScreen = clientWidth > 990;
      const isMediumScreen = clientWidth <= 990 && clientWidth > 768;
      const isSmallScreen = clientWidth <= 768 && clientWidth > 500;
      const issMobileScreen = clientWidth <= 500;

      if (isLargeScreen) {
        setDefaultMoviesCounter(16);
        setHowMuchToAdd(4);
      } else if (isMediumScreen) {
        setDefaultMoviesCounter(12);
        setHowMuchToAdd(3);
      } else if (isSmallScreen) {
        setDefaultMoviesCounter(8);
        setHowMuchToAdd(2);
      } else if (issMobileScreen) {
        setDefaultMoviesCounter(5);
        setHowMuchToAdd(2);
      }
    };
    const debouncedResize = debounce(resize, 1000);
    debouncedResize();
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);
  return { howMuchToAdd, defaultMoviesCounter, setDefaultMoviesCounter }
};