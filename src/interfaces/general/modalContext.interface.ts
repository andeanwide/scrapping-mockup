import { Dispatch, SetStateAction } from 'react';
import { Modal } from './';

export interface reusableDialogState extends Modal {
  isOpen: boolean;
}

export interface modalContextInterface {
  modalContent: reusableDialogState;
  setModalContent: Dispatch<SetStateAction<reusableDialogState>>;
}
