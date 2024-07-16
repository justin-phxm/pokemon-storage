"use client";

import { useCallback, useState } from "react";
import { type StorageUnit } from "@/app/types";
import PokemonStorageUnit from "./PokemonStorageUnit";
import React from "react";

export default function PokemonStorageBox() {
  const GRID_SIZE = 8;
  const [storageBoxGrid, setStorageBoxGrid] = useState<StorageUnit[][]>(
    Array.from({ length: GRID_SIZE }, (_, row) =>
      Array.from({ length: GRID_SIZE }, (_, col) => ({
        x: row,
        y: col,
      })),
    ),
  );

  const updatePokemonStorageUnit = useCallback(
    (updatedPokemonStorageUnit: StorageUnit) => {
      setStorageBoxGrid((prevBlockGrid) =>
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
    <div className="grid size-full grid-flow-row grid-cols-8 grid-rows-8 gap-4 p-24 outline">
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
  );
}
