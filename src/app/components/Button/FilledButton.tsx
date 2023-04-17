import styled from '@emotion/styled';
import { Button, ButtonProps, createPolymorphicComponent } from '@mantine/core';

const _StyledButton = styled(Button)`
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  background-color: var(--primary-1);
  border-radius: 8px;
  :hover {
    background-color: var(--primary-1);
    box-shadow: var(--shadow-hover);
  }
  :not([data-disabled]):hover {
    background-color: var(--primary-1);
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
export const FilledButton = createPolymorphicComponent<'button', ButtonProps>(
  _StyledButton,
);
