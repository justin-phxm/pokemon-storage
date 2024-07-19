"use client";
import Image from "next/image";
import { type CellElement } from "@/app/types";
import { useEffect, useState } from "react";
import { useModal } from "@/app/providers/ModalContext";
import usePokemon from "@/hooks/usePokemon";

export default function SpriteUnit({ cellUnit }: { cellUnit: CellElement }) {
  const { setModalContent, openModal } = useModal();
  const [fetchPokemon, setFetchPokemon] = useState(false);
  const { data: pokemon } = usePokemon(cellUnit.name, fetchPokemon);
  const [isFetching, setIsFetching] = useState(false);

  const handleOnContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(!pokemon);
    setFetchPokemon(true);
    setModalContent(pokemon!);
    openModal();
  };
  useEffect(() => {
    if (pokemon) {
      setModalContent(pokemon);
      setFetchPokemon(false);
      setIsFetching(false);
    }
  }, [pokemon]);

  return (
    <Image
      className="z-10 max-h-14 w-auto object-contain"
      style={{ opacity: isFetching ? 0.5 : 1 }}
      onContextMenu={handleOnContextMenu}
      src={cellUnit.sprite}
      alt=""
    />
  );
}
