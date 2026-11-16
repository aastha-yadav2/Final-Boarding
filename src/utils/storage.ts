// Safe LocalStorage Utility with Schema Fallback and Validation

export function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return defaultValue;
    const parsed = JSON.parse(item);
    return parsed !== null && parsed !== undefined ? (parsed as T) : defaultValue;
  } catch (error) {
    console.warn(`[FINAL BOARDING] Failed to read ${key} from localStorage, using fallback:`, error);
    return defaultValue;
  }
}

export function setStoredItem<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[FINAL BOARDING] Failed to persist ${key} to localStorage:`, error);
  }
}

export function removeStoredItem(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`[FINAL BOARDING] Failed to remove ${key} from localStorage:`, error);
  }
}
