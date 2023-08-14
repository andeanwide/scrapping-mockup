import { HashLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-slate-50 dark:bg-dark-primary'>
      <HashLoader color='#0f8885' loading size={100} speedMultiplier={1} />
    </div>
  );
};
