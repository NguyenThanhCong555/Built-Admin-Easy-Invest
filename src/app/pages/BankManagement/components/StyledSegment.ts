import styled from 'styled-components';
import { SegmentedControl } from '@mantine/core';

export const StyledSegment = styled(SegmentedControl)`
  &.mantine-SegmentedControl-root {
    background-color: #fff;
    width: 100%;
    padding: 0;
    border: 1px solid var(--primary-2);
  }

  & .mantine-SegmentedControl-controlActive {
    .mantine-SegmentedControl-label {
      color: #fff;
    }
  }

  & .mantine-SegmentedControl-label {
    color: var(--primary-2);
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: 700;
  }

  & .mantine-SegmentedControl-labelActive {
    color: #fff;
  }

  & .mantine-SegmentedControl-indicator {
    box-shadow: none;
    background-color: var(--primary-2);
    height: 50px;
    width: 52%;
    border-radius: 8px;
  }
`;
