import { type StaticImageData } from "next/image";

export type StorageUnit = {
  borderColor?: string;
  x: number;
  y: number;
  pokemon?: CellElement;
};

export type CellElement = {
  sprite: StaticImageData;
  name: string;
};
export enum PokemonDragEvents {
  DRAG_START = "dragstart",
}
