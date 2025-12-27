import type { EffectCallback } from 'react';
import { useEffect, useRef } from 'react';

export const useEffectOnce = (effect: EffectCallback) => {
    const effectFn = useRef(effect);
    useEffect(() => effectFn.current(), []);
};
