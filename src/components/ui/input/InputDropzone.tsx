import { useDropzone } from 'react-dropzone';
import { ParagraphText } from '../..';
import { useEffect } from 'react';
import { getLocalStorageItem } from '@/helpers';

interface inputDropzoneProps {
  files: [];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  isOpenThemeMenu: boolean;
}

export const InputDropzone = ({ files, setFiles, isOpenThemeMenu }: inputDropzoneProps) => {
  const config = getLocalStorageItem('config');
  const { /*acceptedFiles,  fileRejections, */ getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file: any) => (
    <div className='flex h-14 w-36 items-center justify-center overflow-hidden' key={file.name}>
      <img
        src={file.preview}
        // style={img}
        className='object-contain'
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isOpenThemeMenu && files.length > 0) setFiles([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenThemeMenu]);

  return (
    <section className='container'>
      <div
        {...getRootProps({
          className:
            'dropzone rounded-lg border dark:border-color-primary dark:border-opacity-60 my-4 p-4 cursor-pointer',
        })}
      >
        <input {...getInputProps()} />

        {files.length > 0 ? (
          <>
            <aside className='mt-2 flex w-full flex-wrap items-center justify-center rounded-lg bg-color-primary p-2'>
              {thumbs}
            </aside>
          </>
        ) : config && JSON.parse(config).logo ? (
          <img
            src={JSON.parse(config).logo}
            alt=''
            className='mx-auto h-10 w-auto cursor-pointer'
          />
        ) : (
          <>
            <ParagraphText
              text={'Arrastre o seleccione con click su logo'}
              extraClass='text-sm text-gray-500 dark:text-gray-100'
            />
            <ParagraphText
              text={'Solo *.png permitidos'}
              extraClass='text-sm text-gray-500 dark:text-gray-100'
            />
          </>
        )}
      </div>
    </section>
  );
};
