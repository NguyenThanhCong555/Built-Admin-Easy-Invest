import styled from '@emotion/styled';
import { Button, ButtonProps, createPolymorphicComponent } from '@mantine/core';

const _StyledButton = styled(Button)`
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  border-radius: 8px;
  color: var(--primary-1);
  background-color: var(--white);
  border: 2px solid var(--primary-1);
  :hover {
    background-color: var(--white);
    box-shadow: var(--shadow-hover);
  }
  :not([data-disabled]):hover {
    background-color: var(--white);
  }
  :focus {
    outline-offset: 0px;
    outline: none;
  }
  @media screen and (max-width: 768px) {
    font-weight: 700;
    font-size: 16px;
    line-height: 21px;
  }
`;
export const OutlineButton = createPolymorphicComponent<'button', ButtonProps>(
  _StyledButton,
);
