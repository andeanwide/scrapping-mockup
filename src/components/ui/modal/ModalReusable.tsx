import { useModal } from '@/hooks';
import { ModalComponent } from './ModalComponent';
import { useContext } from 'react';
import { ModalContext } from '@/context';
import { modalContextInterface } from '@/interfaces';

export const ModalReusable = ({ children }: any) => {
  const { handleClose } = useModal();
  const { modalContent } = useContext(ModalContext) as modalContextInterface;

  return !modalContent.customModal ? (
    <ModalComponent
      isOpen={modalContent.isOpen}
      title={modalContent.modalProps?.title}
      description={modalContent.modalProps?.description}
      setOpenModal={() => {
        handleClose();
      }}
      {...modalContent.modalProps}
    >
      {children}
    </ModalComponent>
  ) : (
    <>404 Modal not found</>
  );
};

export default ModalReusable;
