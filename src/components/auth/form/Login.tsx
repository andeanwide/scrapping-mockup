import { useFormik } from 'formik';
import { TextInput, Label } from 'flowbite-react';
import { useAuthStore } from '@/hooks';
import { loginFormProps } from '@/interfaces';
import { SignInSchema } from '@/schemas';
import { TextButton } from '@/components/ui';

const initialValues: loginFormProps = {
  username: '',
  password: '',
};

export const Login = () => {
  const { startLogin } = useAuthStore();

  const formik = useFormik({
    initialValues,
    validationSchema: SignInSchema,
    onSubmit: startLogin,
  });

  const { handleSubmit, handleChange, isSubmitting, errors, dirty, isValid } = formik;

  return (
    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
      <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
        Ingresa en tu cuenta
      </h1>
      <form className='flex max-w-md flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='username' value='Usuario' />
          </div>
          <TextInput
            id='username'
            name='username'
            placeholder='Usuario'
            required
            type='text'
            onChange={handleChange}
            color={errors.username && 'failure'}
            helperText={errors.username && <span className='font-medium'>{errors.username}!</span>}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='password' value='Contraseña' />
          </div>
          <TextInput
            id='password'
            name='password'
            required
            type='password'
            placeholder='Contraseña'
            onChange={handleChange}
            color={errors.password && 'failure'}
            helperText={errors.password && <span className='font-medium'>{errors.password}!</span>}
          />
        </div>
        {/* <div className='flex items-center gap-2'>
          <Checkbox id='remember' />
          <Label htmlFor='remember'>Remember me</Label>
        </div> */}
        <br />
        <TextButton
          type='submit'
          isProcessing={isSubmitting}
          disabled={isSubmitting || !(isValid && dirty)}
        >
          Iniciar sesión
        </TextButton>
        {/* <Link
          to='/auth/forgot-password'
          className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
        >
          ¿Olvido la contraseña?
        </Link> */}
      </form>
    </div>
  );
};
