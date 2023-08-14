import { TextProps } from '@/interfaces';

export const ParagraphText = ({ text, extraClass, wordBreak = 'break-all' }: TextProps) => {
  return <p className={`${wordBreak} dark:text-white ${extraClass}`}>{text}</p>;
};
