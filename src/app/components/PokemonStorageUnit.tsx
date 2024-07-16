import React from "react";
import { type Pokemon, PokemonDragEvents, type StorageUnit } from "../types";
import BlurredBackgroundImage from "@/utils/BlurredBackgroundImage";
import Image from "next/image";
const PokemonStorageUnit = ({
  storageUnit,
  updatePokemonStorageUnit,
}: {
  storageUnit: StorageUnit;
  updatePokemonStorageUnit: (updatedPokemonStorageUnit: StorageUnit) => void;
}) => {
  function handleOnDrop(e: React.DragEvent) {
    const pokemon: Pokemon = JSON.parse(
      e.dataTransfer.getData(PokemonDragEvents.DRAG_START),
    ) as Pokemon;
    const updatedStorageUnit: StorageUnit = {
      ...storageUnit,
      pokemon: pokemon,
      borderColor: "",
    };
    console.log({ updatedStorageUnit });
    updatePokemonStorageUnit(updatedStorageUnit);
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
  function handleOnDragEnter() {
    updatePokemonStorageUnit({ ...storageUnit, borderColor: "red" });
  }

  function handleOnDragLeave() {
    updatePokemonStorageUnit({ ...storageUnit, borderColor: "" });
  }
  return (
    <button
      className="relative flex size-24 flex-col items-center justify-center rounded-sm p-1 outline outline-white"
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
      style={{ borderColor: storageUnit?.borderColor }}
      onClick={handleOnClick}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
    >
      {storageUnit.pokemon?.sprite && (
        <Image className="z-10" src={storageUnit.pokemon.sprite} alt={""} />
      )}
    </button>
  );
};
const MemoizedGridBox = React.memo(PokemonStorageUnit);
export default MemoizedGridBox;
