"use client";
import Image from "next/image";
import { type CellElement } from "@/app/types";
import { useEffect, useState } from "react";
import usePokemon from "@/hooks/usePokemon";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function SpriteUnit({ cellUnit }: { cellUnit: CellElement }) {
  const [fetchPokemon, setFetchPokemon] = useState(false);
  const { data: pokemon } = usePokemon(cellUnit.name, fetchPokemon);
  const [isFetching, setIsFetching] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <>
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
      <Image
        className="z-10 max-h-14 w-auto object-contain"
        style={{ opacity: isFetching ? 0.5 : 1 }}
        onContextMenu={handleOnContextMenu}
        src={cellUnit.sprite}
        alt=""
      />
    </>
  );
}
