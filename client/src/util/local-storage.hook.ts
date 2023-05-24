import { useState } from "react"

export const useLocalStorage = <T> (keyName: string, defaultValue: T): [T, (arg0: T) => void] => {
    const [storedValue, setStoredValue ] = useState<T>(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) return JSON.parse(value);
            else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (error) {
            return defaultValue;
        }
    });

    const setValue = (newValue: T) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {}

        setStoredValue(newValue);
    }

    
    return [storedValue, setValue];
}