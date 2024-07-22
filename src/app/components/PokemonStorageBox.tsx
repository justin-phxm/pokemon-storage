/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck (ignore typescript errors)

"use client";

import { useCallback, useEffect } from "react";
import { type StorageUnit } from "@/app/types";
import PokemonStorageUnit from "./PokemonStorageUnit";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function PokemonStorageBox({
  boxNumber,
  resetClearSignal,
  clearSignal,
}: {
  boxNumber: number;
  resetClearSignal: () => void;
  clearSignal: number | null;
}) {
  const GRID_SIZE = 8;
  const defaultGrid = Array.from({ length: GRID_SIZE }, (_, row) =>
    Array.from({ length: GRID_SIZE }, (_, col) => ({ x: row, y: col })),
  );
  useEffect(() => {
    if (clearSignal === boxNumber) {
      setStorageBoxGrid(defaultGrid);
      resetClearSignal();
    } //eslint-disable-next-line
  }, [boxNumber, clearSignal, resetClearSignal]);
  const [storageBoxGrid, setStorageBoxGrid] = useLocalStorage(
    `pokemonStorageBox${boxNumber}`,
    defaultGrid,
  );
  const updatePokemonStorageUnit = useCallback(
    (updatedPokemonStorageUnit: StorageUnit) => {
      setStorageBoxGrid((prevBlockGrid: StorageUnit[][]) =>
        prevBlockGrid.map((row, rowIndex) =>
          row.map((block, colIndex) => {
            if (
              rowIndex === updatedPokemonStorageUnit.x &&
              colIndex === updatedPokemonStorageUnit.y
            ) {
              return updatedPokemonStorageUnit;
            }
            return block;
          }),
        ),
      );
    },
    [setStorageBoxGrid],
  );
  const swapPokemonStorageUnit = useCallback(
    (a: StorageUnit, b: StorageUnit) => {
      setStorageBoxGrid((prevGrid: StorageUnit[][]) => {
        // Create a copy of the previous grid
        const newGrid = prevGrid.map((row) => [...row]);
        // Perform the swap
        const temp = newGrid[a.x][a.y];
        newGrid[a.x][a.y] = {
          ...newGrid[b.x][b.y],
          x: a.x,
          y: a.y,
          borderColor: undefined,
        };
        newGrid[b.x][b.y] = { ...temp, x: b.x, y: b.y, borderColor: undefined };

        // Return the new grid
        return newGrid;
      });
    },
    [setStorageBoxGrid],
  );
  return (
    <div className="grid size-full grid-flow-row grid-cols-8 grid-rows-8 gap-4 rounded p-8 outline">
      {storageBoxGrid.map((col, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {col.map((storageUnit, colIndex) => (
            <PokemonStorageUnit
              storageUnit={storageUnit}
              key={`${rowIndex}-${colIndex}`}
              updatePokemonStorageUnit={updatePokemonStorageUnit}
              swapPokemonStorageUnit={swapPokemonStorageUnit}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
