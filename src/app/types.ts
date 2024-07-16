import { type StaticImageData } from "next/image";

export type Block = {
  name: string;
  color: string;
  borderColor?: string;
  x: number;
  y: number;
  pokemonImage?: StaticImageData;
};
