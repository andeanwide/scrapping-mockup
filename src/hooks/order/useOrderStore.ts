import { toastError, toastSuccess } from '@/helpers';
import { useModal, useAppDispatch, useAxiosPost } from '@/hooks';
import { setReloadModule } from '@/store/slices';

export const useOrderStore = () => {
  const { executePost } = useAxiosPost();
  const dispatch = useAppDispatch();
  const { handleClose } = useModal();

  const updateStatusOrder = async (id: string, status: string) => {
    try {
      const { data } = await executePost({ url: `/orders/${id}/${status}` });
      if (data) {
        toastSuccess('Orden actualizado con exito 👍');
        // setSubmitting(false);
        dispatch(setReloadModule());
      }
    } catch (error) {
      toastError('Ups, ha ocurrido un problema al actualizar cliente!');
      // setSubmitting(false);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const sendNotificationOrder = async (id: string, setSubmitting: (state: boolean) => void) => {
    try {
      const { status } = await executePost({ url: `/orders/${id}/notification` });
      if (status === 200) {
        toastSuccess('Notificación enviada con exito 👍');
        setSubmitting(false);
        handleClose();
      }
    } catch (error) {
      toastError('Ups, ha ocurrido un problema al actualizar cliente!');
      setSubmitting(false);
    }
  };

  return { updateStatusOrder, sendNotificationOrder };
};
