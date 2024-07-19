"use client";
import { PokemonDragEvents, type CellElement } from "@/app/types";
import BlurredBackgroundImage from "@/utils/BlurredBackgroundImage";
import SpriteUnit from "./SpriteUnit";
export default function Party({ pokemon }: { pokemon: CellElement }) {
  const handleOnDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      PokemonDragEvents.DRAG_START,
      JSON.stringify(pokemon),
    );
  };

  return (
    <button
      onDragStart={handleOnDragStart}
      className="relative flex size-32 cursor-auto flex-col items-center justify-center"
    >
      <BlurredBackgroundImage image={pokemon.sprite} />
      <SpriteUnit cellUnit={pokemon} />
      <div className="z-10 capitalize">{pokemon.name}</div>
    </button>
  );
}
