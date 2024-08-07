import { useEffect, useState, useCallback } from 'react';

export const useDebounce = <T>(value: T, delay: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};


// Debounced state
export const useStateWithDebounce = <T>(initialValue: T, delay: number = 300) => {
  const [state, setState] = useState<T>(initialValue); // State to hold the actual value
  const [debouncedState, setDebouncedState] = useState<T>(initialValue); // State to hold the debounced value

  const setDebouncedValue = useCallback((newValue: T) => {
    setState(newValue); // Set the state immediately
  }, []);

  // Effect to update debounced state after a delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedState(state); // Update the debounced value after the delay
    }, delay);

    return () => {
      clearTimeout(handler); // Clean up the timeout on component unmount or when dependencies change
    };
  }, [state, delay]); // Only re-run the effect if state or delay changes

  return [debouncedState, setDebouncedValue] as const; // Return the debounced value and the setter function
};