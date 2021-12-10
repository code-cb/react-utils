import { useMemo } from 'react';

export const useId = (length = 12) =>
  useMemo(
    () =>
      Math.random()
        .toString(36)
        .substring(2, 2 + length),
    [length],
  );
