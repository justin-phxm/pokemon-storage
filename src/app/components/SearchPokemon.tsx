"use client";
import { useRef, useState } from "react";
import usePokemon from "../hooks/usePokemon";
import { Button } from "@mui/material";
import Party from "./Party";

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
        <Party
          pokemon={{
            sprite: data.sprites.other.showdown.front_default,
            name: data.name,
          }}
        />
      )}
    </form>
  );
}
