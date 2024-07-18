"use client";

import { type Pokemon } from "pokenode-ts";
import React, { createContext, useState, useContext } from "react";
interface ModalContextType {
  isModalOpen: boolean;
  modalContent: ModalContent;
  openModal: () => void;
  closeModal: () => void;
  setModalContent: (content: ModalContent) => void;
}
const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: React.ReactNode;
}
type ModalContent = Pokemon | object | null;
export const ModalProvider = ({
  children,
}: ModalProviderProps): JSX.Element => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setContent] = useState<ModalContent>(null);
  const openModal = () => setModalOpen(true);
  const setModalContent = (content: ModalContent) => setContent(content);
  const closeModal = () => setModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalContent,
        openModal,
        closeModal,
        setModalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
