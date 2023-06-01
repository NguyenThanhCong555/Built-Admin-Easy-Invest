interface IPrimary {
  primary1: string;
  primary2: string;
  primary3: string;
  primary4: string;
  primary5: string;
  primary6: string;
}

interface ISecondary {
  secondary1: string;
  secondary2: string;
  secondary3: string;
  secondary4: string;
  secondary5: string;
  secondary6: string;
}

interface INeutral {
  white: string;
  whiteLight: string;
  light: string;
  greyLight: string;
  grey: string;
  greyMedium: string;
  greyDark: string;
  greyBlack: string;
  black: string;
}

export const primary: IPrimary = {
  primary1: 'var(--primary-1)',
  primary2: 'var(--primary-2)',
  primary3: 'var(--primary-3)',
  primary4: 'var(--primary-4)',
  primary5: 'var(--primary-5)',
  primary6: 'var(--primary-6)',
};

export const secondary: ISecondary = {
  secondary1: 'var(--secondary-1)',
  secondary2: 'var(--secondary-2)',
  secondary3: 'var(--secondary-3)',
  secondary4: 'var(--secondary-4)',
  secondary5: 'var(--secondary-5)',
  secondary6: 'var(--secondary-6)',
};

export const neutral: INeutral = {
  white: 'var(--white)',
  whiteLight: 'var(--white-light)',
  light: 'var(--light)',
  greyLight: 'var(--grey-light)',
  greyMedium: 'var(--grey-medium)',
  grey: 'var(--grey)',
  greyDark: 'var(--grey-dark)',
  greyBlack: 'var(--grey-black)',
  black: 'var(--black)',
};

export const variable: { primary: IPrimary; secondary: ISecondary; neutral: INeutral } = {
  primary,
  secondary,
  neutral,
};
