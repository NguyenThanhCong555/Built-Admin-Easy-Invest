import React from 'react';

import { ReactComponent as IconMark } from 'assets/icons/accept.svg';
import { Group, Text } from '@mantine/core';

type Props = {
  mark?: boolean;
  label: any;
  value: any;
  unitValue?: React.ReactNode;
  spacingUnit?: number;
  classValue?: string;

  mt?: string | number;
  mb?: string | number;
  my?: string | number;
  px?: string | number;
  colorValue?: string;
  maw_label?: string | number;
};

export const Accumulation = (props: Props) => {
  return (
    <Group position="apart" spacing={10} noWrap w={'100%'} mt={props.mt} mb={props.mb} my={props.my}>
      {props.mark ? (
        <Group spacing={6} noWrap>
          <IconMark
            style={{
              flexShrink: 0,
            }}
          />{' '}
          <Text fz={16} maw={props.maw_label} className="small_2-medium">
            {props.label}
          </Text>
        </Group>
      ) : (
        <Text fw={700} className="small_2-medium">
          {props.label}
        </Text>
      )}

      {props.unitValue ? (
        <Group spacing={props.spacingUnit === 0 ? props.spacingUnit : 6}>
          <Text
            fz={16}
            fw={700}
            className={props.classValue ? `small_2-medium ${props.classValue}` : 'small_2-medium'}
            c={props.colorValue}
          >
            {' '}
            {props.value}
          </Text>
          {props.unitValue}
        </Group>
      ) : (
        <Text
          fz={16}
          fw={700}
          className={props.classValue ? `small_2-medium ${props.classValue}` : 'small_2-medium'}
          c={props.colorValue}
        >
          {props.value}
        </Text>
      )}
    </Group>
  );
};
