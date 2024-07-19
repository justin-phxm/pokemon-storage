"use client";

import { useEffect } from "react";

export default function ClientInjectables() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragover", handleDragOver);
    };
  }, []);
  return null;
}
