"use server";
import { type Pokemon, PokemonClient } from "pokenode-ts";

export const getPokemon = async (
  pokemonName = "luxray",
): Promise<Pokemon | undefined> => {
  const api = new PokemonClient();
  let pokemon: Pokemon | undefined;
  try {
    pokemon = await api.getPokemonByName(pokemonName);
  } catch (e) {
    console.error(e);
  }

  return pokemon;
};
