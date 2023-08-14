import { customButtonTheme } from '@/theme';
import { Button } from 'flowbite-react';

interface textButtonProp {
  type: 'button' | 'submit' | 'reset';
  isProcessing?: boolean;
  extraClass?: string;
  children: any;
  onClick?: () => void;
  disabled?: boolean;
}

export const TextButton = ({
  type,
  isProcessing,
  extraClass,
  children,
  onClick,
  disabled = false,
}: textButtonProp) => {
  return (
    <Button
      theme={customButtonTheme}
      type={type}
      isProcessing={isProcessing}
      disabled={disabled}
      className={`!font-bold ${extraClass}`}
      color='primary'
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
