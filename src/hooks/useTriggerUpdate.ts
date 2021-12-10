import { useReducer } from 'react';

const createUniqueObject = () => ({});

export const useTriggerUpdate = () =>
  useReducer(createUniqueObject, createUniqueObject());
