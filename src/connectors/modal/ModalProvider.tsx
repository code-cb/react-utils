import { FC, memo, ReactNode, useCallback, useMemo, useRef } from 'react';
import { ModalContext, ModalKey, ModalState } from './ModalContext';

const ModalProviderComponent: FC<ModalProviderProps> = ({ children }) => {
  const statesRef = useRef<ModalStates>(new Map());
  const deleteState = useCallback(
    (key: ModalKey) => statesRef.current.delete(key),
    [],
  );
  const getState = useCallback(
    (key: ModalKey) => statesRef.current.get(key),
    [],
  );
  const setState = useCallback(
    (
      key: ModalKey,
      update: (prevState: ModalState | undefined) => ModalState,
    ) => {
      const prevState = getState(key);
      const nextState = update(prevState);
      if (
        prevState?.flag === nextState.flag &&
        prevState?.payload === nextState.payload
      )
        return;
      const contextObj = statesRef.current.get(key) || {};
      contextObj.flag = nextState.flag;
      contextObj.payload = nextState.payload;
      statesRef.current.set(key, contextObj);
      contextObj.subscribers?.forEach(callback =>
        callback(nextState, prevState),
      );
    },
    [getState],
  );
  const subscribe = useCallback(
    (key: ModalKey, callback: (state: ModalState) => void) => {
      const contextObj = statesRef.current.get(key) || {};
      const subscribers = contextObj.subscribers || new Set();
      subscribers.add(callback);
      contextObj.subscribers = subscribers;
      statesRef.current.set(key, contextObj);
      return () => {
        const subscribers = statesRef.current.get(key)?.subscribers;
        if (!subscribers) return;
        subscribers.delete(callback);
        if (subscribers.size === 0) deleteState(key);
      };
    },
    [],
  );
  const value = useMemo<ModalContext>(
    () => ({ deleteState, getState, setState, subscribe }),
    [deleteState, getState, setState, subscribe],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const ModalProvider = memo(ModalProviderComponent);

interface ModalContextObject extends ModalState {
  subscribers?: Set<(state: ModalState, payload: unknown) => void>;
}

export type ModalStates = Map<ModalKey, ModalContextObject>;

interface ModalProviderProps {
  children?: ReactNode;
}
