/*
 * Media queries utility
 */

/*
 * Inspired by https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32914
 */

// Update your breakpoints if you want
export const sizes = {
  small: 768,
  medium: 992,
  large: 1200,
  x_large: 1440,
};

// Iterate through the sizes and create min-width media queries

export const media = (Object.keys(sizes) as Array<keyof typeof sizes>).reduce(
  (acc, size) => {
    acc[size] = () => `@media (max-width:${sizes[size]}px)`;
    return acc;
  },
  {} as { [key in keyof typeof sizes]: () => string },
);

/* Example
const SomeDiv = styled.div`
  display: flex;
  ....
  ${media.medium} {
    display: block
  }
`;
*/
