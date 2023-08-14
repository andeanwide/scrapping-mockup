import { TextButton } from '@/components/ui';
import { Label, Select, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import { useState } from 'react';
// import NewWindow from 'react-new-window';
import NewWindow from 'rc-new-window';
import { useNavigate } from 'react-router-dom';
import { transferSchema } from '@/schemas/transfer/transferSchema';
import CurrencyInput from 'react-currency-input-field';

export const TransferForm = () => {
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const validateToken = async () => {
    await fetch('https://dog.ceo/api/breed/hound/images/random').then((response) =>
      response.json(),
    );
    navigate('/user/success');
  };

  const handleSubmitForm = async () => {
    await fetch('https://dog.ceo/api/breeds/list/all').then((response) => response.json());
    submitForm();
  };

  const initTransfer = () => {
    setOpenWindow(true);
  };

  const formik = useFormik({
    initialValues: { dni: '', fullName: '', account: '', amount: '0' },
    validationSchema: transferSchema,
    onSubmit: initTransfer,
  });

  const { handleSubmit, handleChange, errors, submitForm, values, setFieldValue } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-2 block'>
        <Label htmlFor='fullName' value='Nombre y apellido' />
      </div>
      <TextInput
        id='fullName'
        name='fullName'
        placeholder='Nombre y Apellido'
        required
        type='text'
        onChange={handleChange}
        color={errors.fullName && 'failure'}
        helperText={errors.fullName && <span className='font-medium'>{errors.fullName}!</span>}
      />
      <br />
      <div className='mb-2 block'>
        <Label htmlFor='dni' value='DNI' />
      </div>
      <TextInput
        id='dni'
        name='dni'
        placeholder='DNI'
        required
        type='text'
        onChange={handleChange}
        color={errors.dni && 'failure'}
        helperText={errors.dni && <span className='font-medium'>{errors.dni}!</span>}
      />
      <br />
      <div className='mb-2'>
        <Label htmlFor='account' value='Cuenta' />
      </div>
      <Select
        id='account'
        onChange={(e) => setFieldValue('account', e.target.value)}
        value={values.account}
        color={errors.account && 'failure'}
        helperText={errors.account && <span className='font-medium'>{errors.account}!</span>}
      >
        <option value=''>Seleccione</option>
        <option value='01084839238212'>01084839238212</option>
        <option value='0102123569922'>0102123569922</option>
        <option value='010500494112941923'>010500494112941923</option>
      </Select>
      <br />
      <div className='mb-2 block'>
        <Label htmlFor='amount' value='Monto' />
      </div>
      <CurrencyInput
        className={`bg-gray-50 dark:bg-slate-700 dark:text-white rounded-md w-full ${
          errors.amount && 'border border-red-600 dark:border-red-600'
        }`}
        id='amount'
        name='amount'
        placeholder='Monto'
        decimalsLimit={2}
        onValueChange={(value) => setFieldValue('amount', value)}
      />
      <br />
      {errors.amount && <span className='font-medium dark:text-red-600'>{errors.amount}!</span>}

      <br />
      {/* <TextInput
        id='amount'
        name='amount'
        placeholder='Monto'
        required
        type='number'
        step='0.1'
        min='1000'
        max='5000000'
        pattern='^-?[0-9]\d*\.?\d*$'
        onKeyDown={(event: any) => event.target.value.replace(/\D/g, '')}
        onChange={(event) => handleChangeAmount(event)}
        color={errors.amount && 'failure'}
        helperText={errors.amount && <span className='font-medium'>{errors.amount}!</span>}
        value={values.amount}
      /> */}
      <br />
      <TextButton type='button' onClick={handleSubmitForm}>
        Aceptar
      </TextButton>
      {openWindow ? (
        <NewWindow onClose={() => setOpenWindow(false)}>
          <div style={{ padding: '2rem' }}>
            <div className='mb-2 block'>
              <Label htmlFor='token' value='Token' />
            </div>
            <TextInput
              id='token'
              name='token'
              placeholder='token'
              required
              type='text'
              onChange={(e) => setToken(e.target.value)}
              // color={!token && 'failure'}
              helperText={!token && <span className='font-medium'>{'Token no valido'}!</span>}
            />
            <br />
            <button
              style={{ background: '#3f4c5d', padding: '6px', color: 'white', borderRadius: '4px' }}
              type='button'
              onClick={validateToken}
              disabled={token === '' ? true : false}
            >
              Validar Token
            </button>
            <button
              style={{ background: 'red', padding: '6px', color: 'white', borderRadius: '4px' }}
              type='button'
              onClick={() => setOpenWindow(false)}
            >
              Cancelar
            </button>
          </div>
        </NewWindow>
      ) : null}
    </form>
  );
};
