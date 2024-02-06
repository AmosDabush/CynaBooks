import { useEffect, useRef } from 'react';

const useLazyLoad = (callback: () => void) => {
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(entries => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        callback();
      }
    }, {
      rootMargin: '100px',
    });

    return () => observerRef.current?.disconnect();
  }, [callback]);

  const setElement = (element: HTMLElement | null) => {
    if (element) observerRef.current?.observe(element);
  };

  return setElement;
};

export default useLazyLoad;