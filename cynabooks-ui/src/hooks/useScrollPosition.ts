import { useRef, useState, useEffect } from 'react';

function useScrollPosition<T extends HTMLElement>(): [React.RefObject<T>, number] {
  const elementRef = useRef<T>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = elementRef.current?.scrollTop ?? 0;
      setScrollPosition(position);
    };

    const currentElement = elementRef.current;

    currentElement?.addEventListener('scroll', handleScroll);

    return () => {
      currentElement?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [elementRef, scrollPosition];
}

export default useScrollPosition;
