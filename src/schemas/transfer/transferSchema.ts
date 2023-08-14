import * as Yup from 'yup';

export const transferSchema = Yup.object().shape({
  fullName: Yup.string().required('Nombre es requerido'),
  dni: Yup.string().required('Dni es requerido'),
  account: Yup.string().required('Seleccione una cuenta'),
  amount: Yup.number().required('Ingrese un monto').min(1000, 'El monto debe ser mayor a 1000'),
  // amount: Yup.number()
  //   .positive('El monto debe ser mayor a 0')
  //   .required('Monto es requerido'),
});
