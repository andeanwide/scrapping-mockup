import { useContext, useEffect } from 'react';
import { ModalReusable } from '@/components';
import { useModal } from '@/hooks';
import { ModalContext } from '@/context';
import { modalContextInterface } from '@/interfaces';

export const ModalManager = () => {
  const { modalContent } = useContext(ModalContext) as modalContextInterface;
  const { handleClose } = useModal();

  useEffect(() => {
    if (!modalContent.isOpen) handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalContent.isOpen]);

  return (
    true && <ModalReusable isOpen={modalContent.isOpen}>{modalContent.component}</ModalReusable>
  );
};
