import { ComponentType, createContext } from 'react';

export const ModalContext = createContext<ModalContext | undefined>(undefined);

export interface ModalContext {
  deleteState: (key: ModalKey) => void;
  getState: (key: ModalKey) => ModalState | undefined;
  setState: (
    key: ModalKey,
    update: (prevState: ModalState | undefined) => ModalState,
  ) => void;
  subscribe: (
    key: ModalKey,
    callback: (state: ModalState) => void,
  ) => VoidFunction;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ModalKey = string | symbol | ComponentType<any>;

export interface ModalState {
  flag?: boolean;
  payload?: unknown;
}
