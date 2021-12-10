import { memo as reactMemo } from 'react';

// An alias for the react memo function that infers the type of the generic component better.
export const memo: <TComponent>(component: TComponent) => TComponent =
  reactMemo;