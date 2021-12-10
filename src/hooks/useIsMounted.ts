/**
 * References:
 * https://github.com/adambrgmn/hooks/blob/master/src/use-is-mounted/index.ts
 * https://github.com/hupe1980/react-is-mounted-hook/blob/master/src/use-is-mounted.tsx
 * https://github.com/streamich/react-use/blob/master/src/useRefMounted.ts
 */

import { useCallback, useRef } from 'react';
import { useEffectOnce } from './useEffectOnce';

export const useIsMounted = () => {
  const isMountedRef = useRef(false);

  useEffectOnce(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });

  return useCallback(() => isMountedRef.current, []);
};
