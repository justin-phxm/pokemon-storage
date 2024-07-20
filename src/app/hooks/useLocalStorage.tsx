"use client";
import { useState, useEffect } from "react";
import { type StorageUnit } from "../types";

const isServer = typeof window === "undefined";

export default function useLocalStorage(
  key: string,
  initialValue: StorageUnit[][],
): [StorageUnit[][], React.Dispatch<React.SetStateAction<StorageUnit[][]>>] {
  const [storedValue, setStoredValue] = useState(() => initialValue);

  const initialize = () => {
    if (isServer) {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as StorageUnit[][]) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  };

  useEffect(() => {
    if (!isServer) {
      setStoredValue(initialize());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValue: React.Dispatch<React.SetStateAction<StorageUnit[][]>> = (
    value: ((val: StorageUnit[][]) => StorageUnit[][]) | StorageUnit[][],
  ) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (!isServer) {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
