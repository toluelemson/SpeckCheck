export type colorTheme = {
  bgColor: string;
  textColor: string;
  border: string;
  textGray: string;
};

export type ThemeContextType = {
  theme: boolean;
  setTheme: Function;
  colorTheme: colorTheme;
};
