import { ModalContext } from '@/context';
import { modalContextInterface } from '@/interfaces';
import React, { useContext } from 'react';

export const useModal = () => {
  const { setModalContent } = useContext(ModalContext) as modalContextInterface;

  const handleOpen = ({
    component,
    modalProps,
  }: {
    component: React.ReactNode;
    modalProps: object;
  }): void => {
    setModalContent((previousState: any) => ({
      ...previousState,
      component,
      isOpen: true,
      modalProps,
    }));
  };

  const handleClose = () => {
    setModalContent((previousState: any) => ({ ...previousState, component: null, isOpen: false }));
  };

  return {
    handleOpen,
    handleClose,
  };
};
