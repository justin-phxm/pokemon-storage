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
  Table,
  TableCell,
  TableRow,
} from "@mui/material";
import NextImage from "next/image";
import TypeBadge from "./TypeBadge";
import Link from "next/link";
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
          <DialogTitle className="flex items-center justify-between gap-4 text-2xl font-semibold capitalize">
            <Link
              href={`https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}`}
              target="_blank"
              className="hover:opacity-80"
            >
              {pokemon.name}
            </Link>
            <audio controls autoPlay controlsList="nodownload noplaybackrate">
              <source src={pokemon.cries.latest} type="audio/ogg" />
            </audio>
            <div className="flex gap-4">
              {pokemon.types.map((type) => (
                <TypeBadge key={type.type.name} type={type.type.name} />
              ))}
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Table>
                {pokemon.stats.map((stat) => (
                  <TableRow key={stat.stat.name}>
                    <TableCell className="text-xl font-semibold capitalize">
                      {stat.stat.name}:
                    </TableCell>
                    <TableCell>
                      <meter
                        min={0}
                        max={255}
                        low={255 / 3}
                        high={(255 / 3) * 2}
                        optimum={255 / 2}
                        value={stat.base_stat}
                      />
                    </TableCell>
                    <TableCell className="text-xl">{stat.base_stat}</TableCell>
                  </TableRow>
                ))}
              </Table>
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
