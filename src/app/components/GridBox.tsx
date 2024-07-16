import React from "react";
import type { Block } from "../types";

const GridBox = ({
  block,
  updateBlockElement,
}: {
  block: Block;
  updateBlockElement: (newBlock: Block) => void;
}) => {
  function handleOnDrop(e: React.DragEvent) {
    const blockColor = e.dataTransfer.getData("blockColor");
    console.log(blockColor);
    const newBlock: Block = {
      ...block,
      name: blockColor,
      color: blockColor,
      borderColor: "",
    };
    updateBlockElement(newBlock);
  }
  function handleOnDragOver(e: React.DragEvent) {
    e.preventDefault();
  }
  function handleOnClick() {
    updateBlockElement({ ...block, color: "", name: "", borderColor: "" });
  }
  function handleOnDragEnter() {
    updateBlockElement({ ...block, borderColor: "red" });
  }

  function handleOnDragLeave() {
    updateBlockElement({ ...block, borderColor: "" });
  }
  return (
    <button
      className="flex size-24 flex-col items-center justify-center rounded-sm p-1 outline outline-white"
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
      style={{
        backgroundColor: block?.color,
        borderColor: block?.borderColor,
      }}
      onClick={handleOnClick}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
    >
      {block?.name}
    </button>
  );
};
const MemoizedGridBox = React.memo(GridBox);
export default MemoizedGridBox;
