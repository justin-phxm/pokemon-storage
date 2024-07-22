import React from "react";
import {
  type CellElement,
  PokemonDragEvents,
  type StorageUnit,
} from "@/app/types";
import SpriteUnit from "./SpriteUnit";
const PokemonStorageUnit = ({
  storageUnit,
  updatePokemonStorageUnit,
  swapPokemonStorageUnit,
}: {
  storageUnit: StorageUnit;
  updatePokemonStorageUnit: (updatedPokemonStorageUnit: StorageUnit) => void;
  swapPokemonStorageUnit: (
    updatedPokemonStorageUnit: StorageUnit,
    draggedStorageUnit: StorageUnit,
  ) => void;
}) => {
  function handleOnDrop(e: React.DragEvent) {
    e.preventDefault();
    const dragData = JSON.parse(
      e.dataTransfer.getData(PokemonDragEvents.DRAG_START),
    ) as object;
    // x is unique to storageUnit
    if ("x" in dragData && "y" in dragData) {
      const draggedStorageUnit = dragData as StorageUnit;
      const droppedStorageUnit = storageUnit;
      // update dropped storage unit
      const newDroppedStorageUnit: StorageUnit = {
        ...draggedStorageUnit,
        x: droppedStorageUnit.x,
        y: droppedStorageUnit.y,
      };
      // update dragged storage unit
      const newDraggedStorageUnit: StorageUnit = {
        ...droppedStorageUnit,
        x: draggedStorageUnit.x,
        y: draggedStorageUnit.y,
      };
      swapPokemonStorageUnit(newDroppedStorageUnit, newDraggedStorageUnit);
    } else {
      // pokemon not from storage unit
      const pokemon = dragData as CellElement;
      const updatedStorageUnit: StorageUnit = {
        ...storageUnit,
        pokemon: pokemon,
        borderColor: undefined,
      };
      updatePokemonStorageUnit(updatedStorageUnit);
      return;
    }
  }
  function handleOnClick() {
    updatePokemonStorageUnit({
      ...storageUnit,
      borderColor: undefined,
      pokemon: undefined,
    });
  }
  const handleOnDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      PokemonDragEvents.DRAG_START,
      JSON.stringify(storageUnit),
    );
  };

  return (
    <button
      className="relative flex size-24 flex-col items-center justify-center rounded-lg border p-1 hover:border-red-500"
      onClick={handleOnClick}
      onDrop={handleOnDrop}
      onDragStart={handleOnDragStart}
    >
      {storageUnit.pokemon?.sprite && (
        <SpriteUnit cellUnit={storageUnit.pokemon} />
      )}
      {storageUnit.x}, {storageUnit.y}
    </button>
  );
};
const MemoizedGridBox = React.memo(PokemonStorageUnit);
export default MemoizedGridBox;
