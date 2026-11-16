import { useState, useEffect } from 'react';
import { getStoredItem, setStoredItem } from '../utils/storage';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getStoredItem<T>(key, initialValue);
  });

  useEffect(() => {
    setStoredItem(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

