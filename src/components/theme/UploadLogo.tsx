import { useAxiosPost } from '@/hooks';
import { InputDropzone, TextButton } from '..';
import { useState } from 'react';

export const UploadLogo = ({ isOpenThemeMenu }: { isOpenThemeMenu: boolean }) => {
  const [files, setFiles] = useState<any>([]);
  // const [files, setFiles] = useState<({ preview: string; })[]>([]);
  const { loading } = useAxiosPost();

  const handleUpdateLogo = async () => {
    console.log(files);

    // try {
    //   const { data } = await executePost({
    //     url: 'endpoint',
    //     data: { file: files[0] },
    //     headers: {
    //       'content-type': 'multipart/form-data',
    //     },
    //   });

    //   if (data) {
    //     toastSuccess('Logo actualizado con exito');
    //     setTimeout(() => window.location.reload(), 1000);
    //   }
    // } catch (error) {
    //   toastError('Ocurrio un error al actualizar el configurador');
    // }
  };

  return (
    <>
      <InputDropzone files={files} setFiles={setFiles} isOpenThemeMenu={isOpenThemeMenu} />
      <TextButton
        type='submit'
        isProcessing={loading}
        onClick={handleUpdateLogo}
        disabled={files.length > 0 ? false : true}
      >
        Actualizar logo
      </TextButton>
    </>
  );
};
