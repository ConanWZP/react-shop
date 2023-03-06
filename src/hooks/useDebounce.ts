import {useCallback, useRef } from "react";

export const useDebounce = (callback: any, delay: any) => {
    const timer = useRef();

    const debouncedCallback = useCallback((...args: any) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay) as any


    }, [callback, delay])
    return debouncedCallback
}