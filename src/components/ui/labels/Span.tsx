import { hProps } from '@/interfaces';

export const Span = ({ label, extraClass }: hProps) => (
  <span className={`text-black dark:text-white ${extraClass}`}>{label}</span>
);
