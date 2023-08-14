import * as Yup from 'yup';

export const updateStatusOrderSchema = Yup.object().shape({
  orderStatus: Yup.string().required('Seleccione un estado'),
});
