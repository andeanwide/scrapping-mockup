// import { H4 } from '../labels/H4';

// const handleThemeSwitch = (setThemeFunc: (theme: string) => void) => {
//   setThemeFunc();
//   window.localStorage.setItem('theme', theme);
// };

export const ThemeSelectorButton = (/* { theme, onClick, image, label } */) => {
  // const [webTheme, setWebTheme] = useState(theme);
  // console.log(theme);

  return (
    <div>
      {/* className={`relative bg-blue-400 p-2 w-full h-28 rounded overflow-hidden flex items-center justify-end cursor-pointer hover:bg-slate-700 transition-colors ${
         theme === 'dark' ? 'ring-4 ring-blue-400' : 'ring-4 ring-red-400'
       }`}
       onClick={onClick}
     >
       <H4
         label={label}
         extraClass='absolute bottom-2 left-3 !font-bold text-xl z-30 drop-shadow-lg'
      />
      <img src={image} sizes='1' alt={label} className='object-cover w-60 translate-x-10' /> */}
    </div>
  );
};
