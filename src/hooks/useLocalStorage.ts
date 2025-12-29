import { useState, useCallback, useEffect } from 'react';
import type {Dispatch, SetStateAction} from 'react';

export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        console.log(`Loaded from localStorage (${key}):`, parsed);
        return parsed;
      }
      console.log(`No previous data, using initial value (${key})`);
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage (${key}):`, error);
      return initialValue;
    }
  });

  const setValue: Dispatch<SetStateAction<T>> = useCallback((value) => {
    try {
      // Permite tanto valores directos como funciones updater
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        console.log(`Saved to localStorage (${key}):`, valueToStore);
      }
    } catch (error) {
      console.error(`Error saving to localStorage (${key}):`, error);
    }
  }, [key, storedValue]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error('Error syncing localStorage:', error);
      }
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}