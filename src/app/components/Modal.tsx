"use client";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useModal } from "../context/ModalContext";
export default function Modal({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { isModalOpen, modalContent, closeModal } = useModal();
  useEffect(() => {
    const handleContextMenu = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleContextMenu);
    return () => {
      document.removeEventListener("keydown", handleContextMenu);
    };
  }, [closeModal]);
  if (!isModalOpen) return null;
  if (!modalContent) return null;
  // modalContent is a Pokemon object
  if ("name" in modalContent && "id" in modalContent) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={(e) => {
          closeModal();
          e.stopPropagation();
        }}
      >
        <div
          className={twMerge(
            "min-w-96 rounded-lg bg-white p-6 text-xl shadow-lg",
            className,
          )}
        >
          <h1 className="text-2xl font-semibold capitalize">
            {modalContent.name}
          </h1>
          <div className="">ID: {modalContent.id}</div>
          <div className="">{JSON.stringify(modalContent.stats)}</div>
        </div>
      </div>
    );
  }
  // modalContent is a different type object
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        closeModal();
        e.stopPropagation();
      }}
    >
      <div
        className={twMerge(
          "min-w-96 rounded-lg bg-white p-6 text-xl shadow-lg",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
