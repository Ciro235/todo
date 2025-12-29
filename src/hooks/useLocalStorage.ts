import { useState, useCallback, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        console.log(`✅ Loaded from localStorage (${key}):`, parsed);
        return parsed;
      }
      console.log(`ℹ️ No previous data, using initial value (${key})`);
      return initialValue;
    } catch (error) {
      console.error(`❌ Error reading localStorage (${key}):`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
        console.log(`💾 Saved to localStorage (${key}):`, value);
      }
    } catch (error) {
      console.error(`❌ Error saving to localStorage (${key}):`, error);
    }
  }, [key]);

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