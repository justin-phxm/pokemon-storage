"use server";
import { type Pokemon as PokemonType, PokemonClient } from "pokenode-ts";
type Pokemon = PokemonType & {
  sprites: {
    other: {
      showdown: {
        front_default: string;
      };
    };
  };
};
export const getPokemon = async (
  pokemonName = "luxray",
): Promise<Pokemon | undefined> => {
  const api = new PokemonClient();
  try {
    const parsedPokemonName = pokemonName.toLowerCase();
    return (await api.getPokemonByName(parsedPokemonName)) as Pokemon;
  } catch (e) {
    console.error(e);
  }
};
