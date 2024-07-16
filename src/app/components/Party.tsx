"use client";
import Image from "next/image";
import { PokemonDragEvents, type Pokemon } from "@/app/types";
import BlurredBackgroundImage from "@/utils/BlurredBackgroundImage";
export default function Party({ pokemon }: { pokemon: Pokemon }) {
  const handleOnDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      PokemonDragEvents.DRAG_START,
      JSON.stringify(pokemon),
    );
  };

  return (
    <button
      draggable
      onDragStart={handleOnDragStart}
      className="relative flex size-32 flex-col items-center justify-center"
    >
      <BlurredBackgroundImage image={pokemon.sprite} />
      <Image
        className="z-10 max-h-14 w-auto object-contain"
        src={pokemon.sprite}
        alt={pokemon.name}
        quality={50}
      />
      <div className="z-10 capitalize">{pokemon.name}</div>
    </button>
  );
}
