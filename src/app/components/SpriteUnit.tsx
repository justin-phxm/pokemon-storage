"use client";
import Image from "next/image";
import { type CellElement } from "@/app/types";
import { getPokemon } from "../actions";
import React from "react";
import { useModal } from "@/app/context/ModalContext";

export default function SpriteUnit({ cellUnit }: { cellUnit: CellElement }) {
  const { setModalContent, openModal } = useModal();
  const handleOnContextMenu = async (e: React.MouseEvent) => {
    e.preventDefault();
    const pokemon = await getPokemon(cellUnit.name);
    setModalContent(pokemon!);
    openModal();
  };

  return (
    <Image
      className="z-10 max-h-14 w-auto object-contain"
      onContextMenu={handleOnContextMenu}
      src={cellUnit.sprite}
      alt={""}
    />
  );
}
