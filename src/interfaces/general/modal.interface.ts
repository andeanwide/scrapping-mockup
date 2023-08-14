export interface ModalOptions {
  backdrop: string;
  keyboard: boolean;
}

export interface Modal {
  component: React.FunctionComponent<any> | null;
  customModal?: React.ReactNode | null;
  modalOptions?: ModalOptions;
  modalProps?: { title: string; description: string };
}
