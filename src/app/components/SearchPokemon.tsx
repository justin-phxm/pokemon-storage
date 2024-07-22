"use client";
import { useRef, useState } from "react";
import usePokemon from "../hooks/usePokemon";
import { Button } from "@mui/material";
import Image from "next/image";

export default function SearchPokemon() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [pokemonName, setPokemonName] = useState("");
  const { data, isLoading } = usePokemon(pokemonName, !!pokemonName);
  const handleFormSubmit = () => {
    setPokemonName(inputRef.current?.value ?? "");
  };
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
      <div className="flex">
        <input
          ref={inputRef}
          className="rounded p-2 text-black"
          type="text"
          placeholder="bulbasaur"
          name="pokemonName"
        />
        <Button type="submit" onClick={handleFormSubmit} disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </div>
      {data && (
        <Image
          unoptimized
          alt={pokemonName}
          src={data.sprites.other.showdown.front_default}
          width={50}
          height={50}
          className="h-auto"
        />
      )}
    </form>
  );
}
