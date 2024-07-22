"use client";
import { type CellElement } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import usePokemon from "@/hooks/usePokemon";
import pokeball from "@/otherImages/pokeball.gif";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import NextImage from "next/image";
export default function SpriteUnit({ cellUnit }: { cellUnit: CellElement }) {
  const [fetchPokemon, setFetchPokemon] = useState(false);
  const { data: pokemon } = usePokemon(cellUnit.name, fetchPokemon);
  const [isFetching, setIsFetching] = useState(false);
  const [open, setOpen] = useState(false);
  const dragImageSrc = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const img = new Image();
    img.src = pokeball.src;
    img.onload = () => {
      dragImageSrc.current = img;
    };
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(!pokemon);
    setFetchPokemon(true);
    handleClickOpen();
  };

  useEffect(() => {
    if (pokemon) {
      setIsFetching(false);
    }
  }, [pokemon]);

  const handleDragStart = (ev: React.DragEvent) => {
    ev.dataTransfer.effectAllowed = "move";
    if (!dragImageSrc.current) return;
    ev.dataTransfer.setDragImage(dragImageSrc.current, 50, 50);
  };

  return (
    <>
      {pokemon && (
        <Dialog
          onClick={(e) => e.stopPropagation()}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle className="text-2xl font-semibold capitalize">
            {pokemon?.name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {JSON.stringify(pokemon?.stats)}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
      <NextImage
        onDragStart={handleDragStart}
        className="z-10 max-h-14 w-auto cursor-grab object-contain"
        style={{ opacity: isFetching ? 0.5 : 1 }}
        onContextMenu={handleOnContextMenu}
        src={cellUnit.sprite}
        alt={cellUnit.name}
        draggable={true}
        unoptimized
        width={50}
        height={50}
      />
    </>
  );
}
