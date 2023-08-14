'use client';

import { iconButtonProps } from '@/interfaces';
import { customButtonTheme } from '@/theme';
import { Button } from 'flowbite-react';

export const IconButton = ({ children, onClick, disabled, extraClass, pill }: iconButtonProps) => {
  return (
    <Button
      className={`!rounded-full py-0 px-0 bg-color-primary ${extraClass}`}
      onClick={onClick}
      disabled={disabled}
      pill={pill}
      theme={customButtonTheme}
      color='primary'
    >
      {children}
    </Button>
  );
};
