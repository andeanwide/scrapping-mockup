'use client';

import { CustomFlowbiteTheme, Modal } from 'flowbite-react';

export const ModalComponent = ({
  title,
  size = 'lg',
  isOpen,
  description,
  setOpenModal,
  children,
}: {
  title?: string;
  size?: string;
  description?: string;
  isOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  children: React.ReactNode;
}) => {
  const customTheme: CustomFlowbiteTheme['modal'] = {
    content: {
      inner: 'relative rounded-lg bg-white shadow dark:bg-gray-800 flex flex-col max-h-[90vh]',
    },
  };

  return (
    <>
      <Modal
        show={isOpen === true}
        size={size}
        popup
        onClose={() => {
          setOpenModal(false);
        }}
        theme={customTheme}
      >
        <Modal.Header className='ml-4 px-6 text-xl font-medium text-gray-900 dark:text-white my-2'>
          {title}
          {description && description}
        </Modal.Header>
        <Modal.Body className='border-t-2 dark:border-gray-600'>{children}</Modal.Body>
        <Modal.Footer className='py-1 m-0 border-hidden rounded' />
      </Modal>
    </>
  );
};
