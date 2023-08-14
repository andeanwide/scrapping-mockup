import { TextButton } from '@/components/ui';
import { useAppDispatch } from '@/hooks';
import { setReloadModule } from '@/store/slices';
import { Label, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';

export interface orderFormProps {
  _id?: string;
  companyName: string;
  vectorEmail: string;
  webhookUrl: string;
}

interface createEditClientProps {
  data: orderFormProps;
  isEdit?: boolean;
}

// eslint-disable-next-line no-unused-vars
type setSubmitting = (isSubmitting: boolean) => void;

export const CreateEditOrder = ({ data, isEdit = false }: createEditClientProps) => {
  const dispatch = useAppDispatch();
  const initialValues: orderFormProps = {
    companyName: isEdit ? data.companyName : '',
    vectorEmail: isEdit ? data.vectorEmail : '',
    webhookUrl: isEdit ? data.webhookUrl : '',
  };

  const create = (values: orderFormProps, setSubmitting: setSubmitting) => {
    console.log({ values, setSubmitting });
    alert('create submit');
    // finist response backend
    dispatch(setReloadModule()); // setReloadModule execute refresh current table module and close modal
  };

  const update = (values: orderFormProps, setSubmitting: setSubmitting) => {
    console.log({ values, setSubmitting });
    alert('update submit');
  };

  const handleSubmitForm = (values: orderFormProps) => {
    isEdit ? update({ ...values, _id: data._id }, setSubmitting) : create(values, setSubmitting);
  };

  const formik = useFormik({
    initialValues,
    // validationSchema: createEditClientSchema,  // schema is validator form inputs, see schema folder to examples
    onSubmit: handleSubmitForm,
  });

  const {
    handleSubmit,
    errors,
    values,
    handleChange,
    isSubmitting,
    setSubmitting,
    isValid,
    dirty,
  } = formik;

  return (
    <>
      <form className='flex max-w-md flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='companyName' value='Empresa' />
          </div>
          <TextInput
            id='companyName'
            name='companyName'
            placeholder='Empresa'
            onKeyDown={(event) => {
              if (event.code === 'Space') event.preventDefault();
            }}
            required
            type='text'
            onChange={handleChange}
            color={errors.companyName && 'failure'}
            helperText={
              errors.companyName && <span className='font-medium'>{errors.companyName}!</span>
            }
            value={values.companyName}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='vectorEmail' value='Vector Email' />
          </div>
          <TextInput
            id='vectorEmail'
            name='vectorEmail'
            required
            type='email'
            placeholder='Email'
            onChange={handleChange}
            color={errors.vectorEmail && 'failure'}
            helperText={
              errors.vectorEmail && <span className='font-medium'>{errors.vectorEmail}!</span>
            }
            value={values.vectorEmail}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='webhookUrl' value='Url webhook' />
          </div>
          <TextInput
            id='webhookUrl'
            name='webhookUrl'
            required
            type='text'
            placeholder='Url webhook'
            onChange={handleChange}
            color={errors.webhookUrl && 'failure'}
            helperText={
              errors.webhookUrl && <span className='font-medium'>{errors.webhookUrl}!</span>
            }
            value={values.webhookUrl}
          />
        </div>
        <br />
        <TextButton
          type='submit'
          isProcessing={isSubmitting ? true : false}
          disabled={isSubmitting || !(isValid && dirty)}
          extraClass='disabled:!cursor-not-allowed'
        >
          {isEdit ? 'Actualizar' : 'Crear'} Cliente
        </TextButton>
      </form>
    </>
  );
};
