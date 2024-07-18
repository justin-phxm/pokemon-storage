"use client";
import { type Pokemon } from "pokenode-ts";
import { useState, useEffect } from "react";
import { getPokemon } from "@/app/actions";

function usePokemon(requestedPokemon: string) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPokemon(requestedPokemon);
        if (!result) {
          throw new Error("Pokemon not found");
        }
        setPokemon(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [requestedPokemon]);

  return { pokemon, loading, error };
}

export default usePokemon;
