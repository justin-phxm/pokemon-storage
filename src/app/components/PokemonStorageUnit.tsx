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
}: {
  storageUnit: StorageUnit;
  updatePokemonStorageUnit: (updatedPokemonStorageUnit: StorageUnit) => void;
}) => {
  function handleOnDrop(e: React.DragEvent) {
    const dragData = JSON.parse(
      e.dataTransfer.getData(PokemonDragEvents.DRAG_START),
    ) as object;
    // x is unique to storageUnit
    if ("x" in dragData && "y" in dragData) {
      const draggedStorageUnit = dragData as StorageUnit;
      const droppedStorageUnit = storageUnit;
      // update dropped storage unit
      updatePokemonStorageUnit({
        ...droppedStorageUnit,
        x: droppedStorageUnit.x,
        y: droppedStorageUnit.y,
        borderColor: "",
        pokemon: draggedStorageUnit.pokemon,
      });
      // update dragged storage unit
      updatePokemonStorageUnit({
        ...draggedStorageUnit,
        borderColor: "",
        x: draggedStorageUnit.x,
        y: draggedStorageUnit.y,
        pokemon: droppedStorageUnit.pokemon,
      });
    } else {
      const pokemon = dragData as CellElement;
      const updatedStorageUnit: StorageUnit = {
        ...storageUnit,
        pokemon: pokemon,
        borderColor: "",
      };
      updatePokemonStorageUnit(updatedStorageUnit);
      return;
    }
  }
  function handleOnDragOver(e: React.DragEvent) {
    e.preventDefault();
  }
  function handleOnClick() {
    updatePokemonStorageUnit({
      ...storageUnit,
      borderColor: "",
      pokemon: undefined,
    });
  }
  const handleOnDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      PokemonDragEvents.DRAG_START,
      JSON.stringify(storageUnit),
    );
  };

  function handleOnDragEnter() {
    updatePokemonStorageUnit({ ...storageUnit, borderColor: "red" });
  }
  function handleOnDragLeave() {
    updatePokemonStorageUnit({ ...storageUnit, borderColor: "" });
  }
  return (
    <button
      className="relative flex size-24 flex-col items-center justify-center rounded-lg border p-1"
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
      style={{ borderColor: storageUnit?.borderColor }}
      onClick={handleOnClick}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      onDragStart={handleOnDragStart}
    >
      {storageUnit.pokemon?.sprite && (
        <SpriteUnit cellUnit={storageUnit.pokemon} />
      )}
    </button>
  );
};
const MemoizedGridBox = React.memo(PokemonStorageUnit);
export default MemoizedGridBox;
