interface backgroundThemeOptionProps {
  backgroundColor: string;
  backgroundSelectorDark: string;
  // eslint-disable-next-line no-unused-vars
  handleBackgroundChange: (color: string) => void;
}

export const BackgroundThemeOption = ({
  backgroundColor,
  backgroundSelectorDark,
  handleBackgroundChange,
}: backgroundThemeOptionProps) => {
  return (
    <div
      style={{ backgroundColor }}
      className={`h-10 w-10 cursor-pointer rounded border dark:border-slate-500 ${
        backgroundSelectorDark === backgroundColor ? 'ring-4 ring-slate-400' : 'ring-0'
      }`}
      onClick={() => handleBackgroundChange(backgroundColor)}
    ></div>
  );
};
