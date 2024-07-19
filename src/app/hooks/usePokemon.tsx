"use client";
import { getPokemon } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";

function usePokemon(requestedPokemon: string, fetch = true) {
  return useQuery({
    queryKey: [requestedPokemon],
    queryFn: () => getPokemon(requestedPokemon),
    enabled: fetch,
  });
}

export default usePokemon;
