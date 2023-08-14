import { hProps } from '@/interfaces';

export const H4 = ({ label, extraClass }: hProps) => (
  <h4 className={`text-black dark:text-white ${extraClass}`}>{label}</h4>
);
