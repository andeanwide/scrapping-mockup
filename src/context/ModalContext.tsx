import { modalContextInterface, reusableDialogState } from '@/interfaces';
import { createContext, useState } from 'react';

const initialState: reusableDialogState = {
  isOpen: false,
  component: null,
};

export const ModalContext = createContext<modalContextInterface | null>(null);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalContent, setModalContent] = useState<reusableDialogState>(initialState);

  const value = {
    modalContent,
    setModalContent,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export { ModalProvider };
