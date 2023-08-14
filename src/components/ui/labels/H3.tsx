import { hProps } from '@/interfaces';

export const H3 = ({ label, extraClass }: hProps) => (
  <h3 className={`text-black dark:text-white ${extraClass}`}>{label}</h3>
);
