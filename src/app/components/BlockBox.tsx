"use client";

import type { Block } from "@/app/types";
const defaultBlock: Partial<Block> = {
  name: "",
  color: "",
};
export default function BlockBox({
  block = defaultBlock,
}: {
  block?: Partial<Block>;
}) {
  return (
    <button
      className={`flex items-center justify-center rounded-xl bg-contain bg-center bg-no-repeat p-4`}
      draggable
      style={{
        backgroundColor: block?.color,
      }}
      onDragStart={(e) => {
        console.log(block?.color);
        e.dataTransfer.setData("blockColor", block.color ?? "");
      }}
    >
      {block?.name}
    </button>
  );
}
