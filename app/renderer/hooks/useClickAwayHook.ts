import { createRef, useEffect, useLayoutEffect, useRef } from 'react';

export const useClickAway = (onClickAway?: (e?: Event) => void) => {
  const ref = createRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  function handleClick(this: HTMLDivElement, e: Event) {
    console.log('handleClick', e.target);

    if (ref.current && !ref.current.contains(e.target as Node)) {
      onClickAway?.call(this, e);
    }
  }

  useLayoutEffect(() => {
    setTimeout(() => {
      document.addEventListener('click', handleClick);
    });
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref.current]);
  return [ref];
};
