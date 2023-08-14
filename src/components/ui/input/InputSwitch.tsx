import { Switch } from '@headlessui/react';

interface InputSwitchProps {
  name: string;
  onChange: any;
  value: boolean;
  extraClass?: string;
}

export const InputSwitch = ({ name, onChange, value, extraClass }: InputSwitchProps) => {
  return (
    <Switch
      name={name}
      checked={value}
      onChange={onChange}
      className={`${value ? 'bg-teal-600' : 'bg-red-600'}
          relative inline-flex w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 ${extraClass}`}
    >
      <span
        aria-hidden='true'
        className={`${value ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};
