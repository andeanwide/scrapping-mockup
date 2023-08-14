import { useAppDispatch, useAppSelector, useOutsideEvent } from '@/hooks';
import { onShowHideThemeSidebar } from '@/store/slices';
import { useEffect, useRef, useState } from 'react';
import {
  applyTheme,
  darkBackground,
  getLocalStorageConfigObject,
  lightBackground,
  primaryBackground,
  updateBackgroundTheme,
} from '@/theme';
import { moon, sun } from '@/assets/images';
import { BackgroundThemeOption } from './BackgroundThemeOption';
import { H4 } from '../../labels/H4';
import { UploadLogo } from '@/components/theme/UploadLogo';

export const SidebarThemeConfig = () => {
  const dispatch = useAppDispatch();
  const { isOpenThemeMenu } = useAppSelector((state) => state.web);
  const wrapperRef = useRef(null);
  const [theme, setTheme] = useState(window.localStorage.getItem('theme') || 'light');
  const [primarySelector, setPrimarySelector] = useState<string>('');
  const [backgroundSelectorDark, setBackgroundSelectorDark] = useState('');
  const [backgroundSelectorLight, setBackgroundSelectorLight] = useState('');

  useOutsideEvent(wrapperRef, isOpenThemeMenu, () => {
    dispatch(onShowHideThemeSidebar(false));
    // setOpenColorPicker(false);
  });

  const handleThemeSwitch = (theme: string) => {
    setTheme(theme);
    window.localStorage.setItem('theme', theme);
  };

  const handleBackgroundChange = (color: string) => {
    if (theme === 'dark') setBackgroundSelectorDark(color);
    else setBackgroundSelectorLight(color);
    updateBackgroundTheme(color, theme);
  };

  // useEffect(() => {
  //   if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     setTheme('dark');
  //   } else {
  //     setTheme('light');
  //   }
  // }, []);

  useEffect(() => {
    const themeConfig = getLocalStorageConfigObject();
    if (themeConfig && Object.keys(themeConfig).length > 0) {
      setPrimarySelector(themeConfig['--primary']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const themeConfig = getLocalStorageConfigObject();
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setBackgroundSelectorDark(themeConfig['--dark-primary']);
    } else {
      document.documentElement.classList.remove('dark');
      setBackgroundSelectorLight(themeConfig['--light-primary']);
    }
  }, [theme]);

  return (
    <div
      className={`fixed top-0 bottom-0 right-0 z-20 w-10/12 lg:w-5/12 bg-slate-100 dark:bg-slate-700 border dark:border-slate-600 pt-4 px-6 overflow-y-auto ${
        isOpenThemeMenu ? '-translate-x-0' : 'translate-x-full'
      } transition-all`}
      ref={wrapperRef}
    >
      <div className='py-10 px-4'>
        {/* dropzone */}
        <div className='rounded-lg'>
          <H4 label='Logo' extraClass='font-semibold' />
          <UploadLogo isOpenThemeMenu={isOpenThemeMenu} />
        </div>
        {/* theme */}
        <br />
        <H4 label='Seleccionar tema' extraClass='font-bold mt-10' />
        <br />
        <div className='grid grid-cols-2 gap-8'>
          {/* {themeButtons.map((themeButton, index) => (
            <ThemeSelectorButton
              key={index}
              image={themeButton.image}
              label={themeButton.label}
              onClick={() =>
                handleThemeSwitch(() => setTheme(themeButton.theme), themeButton.theme)
              }
              theme={themeButton.theme}
            />
          ))} */}

          <div
            className={`relative bg-red-400 p-2 w-full h-28 rounded overflow-hidden flex items-center justify-end cursor-pointer hover:bg-yellow-300 transition-colors ${
              theme === 'light' && 'ring-4 ring-red-400'
            }`}
            onClick={() => handleThemeSwitch('light')}
          >
            <H4
              label='Claro'
              extraClass='absolute bottom-2 left-3 !font-bold text-xl z-30 drop-shadow-lg'
            />
            <img src={sun} alt='sunIcon' className='object-cover w-60 translate-x-10' />
          </div>

          <div
            className={`relative bg-blue-400 p-2 w-full h-28 rounded overflow-hidden flex items-center justify-end cursor-pointer hover:bg-slate-700 transition-colors ${
              theme === 'dark' && 'ring-4 ring-blue-400'
            }`}
            onClick={() => handleThemeSwitch('dark')}
          >
            <H4
              label='Oscuro'
              extraClass='absolute bottom-2 left-3 !font-bold text-xl z-30 drop-shadow-lg'
            />
            <img src={moon} sizes='1' alt='moonIcon' className='object-cover w-60 translate-x-10' />
          </div>
        </div>
        <br />

        {/* theme color selector */}
        <H4 label='Personalizar tema' extraClass='font-bold mt-10' />
        <br />
        <H4 label='Color principal' extraClass='font-semibold' />
        <div className='mt-4 flex items-center justify-center gap-4'>
          {Object.values(primaryBackground).map((background: string, index: number) => (
            <div
              key={index}
              style={{ backgroundColor: background }}
              className={`h-10 w-10 cursor-pointer rounded border dark:border-slate-500 ${
                primarySelector === background ? 'ring-4 ring-slate-400' : 'ring-0'
              } `}
              onClick={() => {
                setPrimarySelector(background);
                applyTheme({
                  ...getLocalStorageConfigObject(),
                  '--primary': background,
                });
              }}
            ></div>
          ))}
          {/* <div
            className='relative h-8 w-8 cursor-pointer rounded-full bg-gradient-to-tr from-pink-200 via-fuchsia-500 to-indigo-900'
            onClick={() => closeColorPicker(true)}
          ></div> */}
        </div>

        {/* background section */}
        <H4 label='Color fondo' extraClass='font-semibold' />
        <br />
        <div className='mt-4 flex items-center justify-center gap-4'>
          {theme === 'dark'
            ? Object.values(darkBackground).map((backgroundColor: string, index: number) => (
                <BackgroundThemeOption
                  key={index}
                  backgroundColor={backgroundColor}
                  backgroundSelectorDark={backgroundSelectorDark}
                  handleBackgroundChange={handleBackgroundChange}
                />
              ))
            : Object.values(lightBackground).map((backgroundColor: string, index: number) => (
                <BackgroundThemeOption
                  key={index}
                  backgroundColor={backgroundColor}
                  backgroundSelectorDark={backgroundSelectorLight}
                  handleBackgroundChange={handleBackgroundChange}
                />
              ))}
        </div>

        {/* <TextButton extraClass='mt-4' type='button'>
          Actualizar
        </TextButton> */}
      </div>
    </div>
  );
};
