import { toast } from 'react-hot-toast';

export const toastSuccess = (message: string) =>
  toast.success(message, {
    className: 'w-full py-4 font-semibold text-sm',
    position: 'top-right',
    icon: '✔',
    duration: 3000,
  });

export const toastError = (message: string) =>
  toast.error(message, {
    className: 'py-4 font-semibold text-sm',
    position: 'top-right',
    icon: '💥',
    duration: 3000,
  });
