"use client";

import { useCallback } from "react";
import { type StorageUnit } from "@/app/types";
import PokemonStorageUnit from "./PokemonStorageUnit";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function PokemonStorageBox() {
  const GRID_SIZE = 8;
  const defaultGrid = Array.from({ length: GRID_SIZE }, (_, row) =>
    Array.from({ length: GRID_SIZE }, (_, col) => ({
      x: row,
      y: col,
    })),
  );
  const handleButtonClick = () => {
    setStorageBoxGrid(defaultGrid);
  };
  const [storageBoxGrid, setStorageBoxGrid] = useLocalStorage(
    "box1",
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

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="absolute right-0 top-0 rounded-xl bg-slate-500/50 p-4 px-8 text-xl font-semibold"
      >
        Clear
      </button>

      <div className="grid size-full grid-flow-row grid-cols-8 grid-rows-8 gap-4 rounded p-8 outline">
        {storageBoxGrid.map((col, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {col.map((storageUnit, colIndex) => (
              <PokemonStorageUnit
                storageUnit={storageUnit}
                key={`${rowIndex}-${colIndex}`}
                updatePokemonStorageUnit={updatePokemonStorageUnit}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
