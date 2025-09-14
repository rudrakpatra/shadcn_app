import { useState, useEffect, useRef } from 'react';

/**
 * A hook that delays updating a value until it remains stable for a specified duration.
 * If the value changes before the delay period ends, the timer resets.
 * 
 * @param value - The value to delay
 * @param delay - The delay in milliseconds (default: 300ms)
 * @returns The delayed value
 */
export function useDelayedValue<T>(value: T, delay: number = 300): T {
    const [delayedValue, setDelayedValue] = useState<T>(value);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new timeout to update the delayed value
        timeoutRef.current = setTimeout(() => {
            setDelayedValue(value);
        }, delay);

        // Cleanup function to clear timeout on unmount or value change
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [value, delay]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return delayedValue;
}
