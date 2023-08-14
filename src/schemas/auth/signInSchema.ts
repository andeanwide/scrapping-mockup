import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
  username: Yup.string().required('Usuario es requerido'),
  password: Yup.string()
    .required('Contraseña es requerida')
    .min(5, 'Contraseña demasiado corta')
    .max(50, 'Contraseña demasiado larga'),
});
