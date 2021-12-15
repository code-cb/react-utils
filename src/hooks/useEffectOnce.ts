/**
 * References:
 * https://github.com/streamich/react-use/blob/master/src/useEffectOnce.ts
 */

import { EffectCallback, useEffect } from 'react';

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useEffectOnce = (effect: EffectCallback) => useEffect(effect, []);
