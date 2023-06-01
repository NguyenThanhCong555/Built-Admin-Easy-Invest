import React from 'react';
import { Box, Center, createStyles, Group, Stack, Text } from '@mantine/core';

import { variable } from 'styles/variable';

type Props = {
  title: any;
  ListAccumulation?: React.ReactNode[];
  children?: any;
  mt?: string | number;
  mb?: string | number;
  my?: string | number;
};

type AccumulationCardV2Props = {
  coinName: string;
  stakeRate: string;
  ListAccumulation?: React.ReactNode[];
  children?: any;
  mt?: string | number;
  mb?: string | number;
  my?: string | number;
};

export const AccumulationCard = (props: Props) => {
  const { classes } = useStyle();

  return (
    <Box w={'100%'} className={classes.container} mt={props.mt} mb={props.mb} my={props.my}>
      <Center className={classes.boxTitle}>
        <Text className={`body_4-bold`} c={variable.neutral.white}>
          {props.title}
        </Text>
      </Center>

      {props.children}
      {!props.children && (
        <Stack spacing={8} p={'14px 12px'}>
          {!props.children && <>{!!props.ListAccumulation && props.ListAccumulation.map(accumulation => accumulation)}</>}
        </Stack>
      )}
    </Box>
  );
};

export const AccumulationCardV2 = (props: AccumulationCardV2Props) => {
  const { classes } = useStyle();

  return (
    <Box w={'100%'} className={classes.container} mt={props.mt} mb={props.mb} my={props.my}>
      <Group position="apart" className={classes.boxTitle}>
        <Text className={`body-1_bold `} c={variable.neutral.white}>
          {props.coinName}
        </Text>
        <Text className={`body-1_bold `} c={variable.neutral.white}>
          {props.stakeRate}
        </Text>
      </Group>

      {props.children}
      {!props.children && (
        <Stack spacing={8} p={'14px 12px'}>
          {!props.children && <>{!!props.ListAccumulation && props.ListAccumulation.map(accumulation => accumulation)}</>}
        </Stack>
      )}
    </Box>
  );
};

const useStyle = createStyles(theme => ({
  container: {
    border: `1px solid ${variable.neutral.greyLight}`,
    boxShadow: ' 0px 2px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '14px',
  },

  boxTitle: {
    width: '100%',
    height: '43px',
    background: variable.primary.primary2,
    padding: '12px 16px 8px',
    borderRadius: '14px 14px 0 0',
  },
}));
