"use client";

import { useCallback, useState } from "react";
import { type Block } from "@/app/types";
import GridBox from "./GridBox";
import React from "react";

export default function BlockGrid() {
  const GRID_SIZE = 5;
  const [blockGrid, setBlockGrid] = useState<Block[][]>(
    Array.from({ length: GRID_SIZE }, (_, row) =>
      Array.from({ length: GRID_SIZE }, (_, col) => ({
        name: "",
        color: "",
        x: row,
        y: col,
      })),
    ),
  );

  // Memoize the updateBlockElement function
  const updateBlockElement = useCallback(
    (newBlock: Block) => {
      setBlockGrid((prevBlockGrid) =>
        prevBlockGrid.map((row, rowIndex) =>
          row.map((block, colIndex) => {
            if (rowIndex === newBlock.x && colIndex === newBlock.y) {
              return newBlock;
            }
            return block;
          }),
        ),
      );
    },
    [setBlockGrid],
  );

  return (
    <div className="grid h-1/2 w-1/2 grid-flow-row grid-cols-5 grid-rows-5 gap-4 p-24 outline">
      {blockGrid.map((col, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {col.map((block, colIndex) => (
            <GridBox
              block={block}
              key={`${rowIndex}-${colIndex}`}
              updateBlockElement={updateBlockElement}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
