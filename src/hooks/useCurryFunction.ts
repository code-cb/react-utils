import { useCallback } from 'react';

interface UseCurryFunction {
  <TArg1, TRestArgs extends unknown[], TReturn>(
    func: (arg1: TArg1, ...restArgs: TRestArgs) => TReturn,
    thisArg: unknown,
    arg1: TArg1,
  ): (...args: TRestArgs) => TReturn;
  <TArg1, TArg2, TRestArgs extends unknown[], TReturn>(
    func: (arg1: TArg1, arg2: TArg2, ...restArgs: TRestArgs) => TReturn,
    thisArg: unknown,
    arg1: TArg1,
    arg2: TArg2,
  ): (...args: TRestArgs) => TReturn;
  <TArg1, TArg2, TArg3, TRestArgs extends unknown[], TReturn>(
    func: (
      arg1: TArg1,
      arg2: TArg2,
      arg3: TArg3,
      ...restArgs: TRestArgs
    ) => TReturn,
    thisArg: unknown,
    arg1: TArg1,
    arg2: TArg2,
    arg3: TArg3,
  ): (...args: TRestArgs) => TReturn;
  <TArg1, TArg2, TArg3, TArg4, TRestArgs extends unknown[], TReturn>(
    func: (
      arg1: TArg1,
      arg2: TArg2,
      arg3: TArg3,
      arg4: TArg4,
      ...restArgs: TRestArgs
    ) => TReturn,
    thisArg: unknown,
    arg1: TArg1,
    arg2: TArg2,
    arg3: TArg3,
    arg4: TArg4,
  ): (...args: TRestArgs) => TReturn;
  <TArg1, TArg2, TArg3, TArg4, TArg5, TRestArgs extends unknown[], TReturn>(
    func: (
      arg1: TArg1,
      arg2: TArg2,
      arg3: TArg3,
      arg4: TArg4,
      arg5: TArg5,
      ...restArgs: TRestArgs
    ) => TReturn,
    thisArg: unknown,
    arg1: TArg1,
    arg2: TArg2,
    arg3: TArg3,
    arg4: TArg4,
    arg5: TArg5,
  ): (...args: TRestArgs) => TReturn;
  <
    TArg1,
    TArg2,
    TArg3,
    TArg4,
    TArg5,
    TArg6,
    TRestArgs extends unknown[],
    TReturn,
  >(
    func: (
      arg1: TArg1,
      arg2: TArg2,
      arg3: TArg3,
      arg4: TArg4,
      arg5: TArg5,
      arg6: TArg6,
      ...restArgs: TRestArgs
    ) => TReturn,
    thisArg: unknown,
    arg1: TArg1,
    arg2: TArg2,
    arg3: TArg3,
    arg4: TArg4,
    arg5: TArg5,
    arg6: TArg6,
  ): (...args: TRestArgs) => TReturn;
}

export const useCurryFunction: UseCurryFunction = (
  fn: (...args: unknown[]) => unknown,
  thisArg: unknown,
  ...args: unknown[]
) =>
  useCallback(
    (...restArgs: unknown[]) => fn.apply(thisArg, [...args, ...restArgs]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fn, ...args],
  );
