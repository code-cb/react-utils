/**
 * References:
 * https://github.com/streamich/react-use/blob/master/src/useToggle.ts
 * https://github.com/beizhedenglong/react-hooks-lib/blob/master/src/hooks/useToggle.js
 */

import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { ValueFactory } from 'types';

export const useToggle = (
  initialValue: ValueFactory<boolean> = false,
): [
  value: boolean,
  toggle: VoidFunction,
  turnOn: VoidFunction,
  turnOff: VoidFunction,
  setValue: Dispatch<SetStateAction<boolean>>,
] => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(prev => !prev), []);
  const turnOn = useCallback(() => setValue(true), []);
  const turnOff = useCallback(() => setValue(false), []);
  return [value, toggle, turnOn, turnOff, setValue];
};
