import { Box, Center, createStyles } from '@mantine/core';
import React from 'react';

import { BackWithTitle } from 'app/components/BackPage/BackPage';
import { variable } from 'styles/variable';
import { useMediaQuery } from '@mantine/hooks';

type Props = {
  children: any;
  titlePage?: string;
  mt?: string | string;
  px?: number | string;
  pb?: number | string;
  pos?: any;
  onMovePage?: () => void;
  rightSection?: any;
};

export const Frame = (props: Props) => {
  const { classes } = useStyle();
  const smallThan576 = useMediaQuery('(min-width : 576px)');

  return (
    <Center mt={props.mt} px={props.px} pb={props.pb} pos={props.pos} className={classes.center}>
      <Box w={'100%'} maw={'630px'} className={smallThan576 ? classes.box : ''}>
        {props.titlePage && (
          <Box className={classes.boxContent}>
            <BackWithTitle title={props.titlePage} onMovePage={props.onMovePage} rightSection={props.rightSection} />{' '}
          </Box>
        )}

        {props.children}
      </Box>
    </Center>
  );
};

const useStyle = createStyles(theme => ({
  center: {
    marginTop: '12px',
    '@media (max-width:576px)': {
      marginTop: '0px',
    },
  },

  box: {
    border: `1px solid ${variable.neutral.greyLight}`,
    background: variable.neutral.white,
    boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.15)`,
    borderRadius: '20px',
    paddingBottom: '24px',
    '@media (max-width:576px)': {},
  },

  boxContent: {
    borderRadius: '20px 20px 0 0',
    paddingLeft: '16px',
    paddingRight: '16px',
    background: variable.primary.primary5,
    cursor: 'pointer',

    '@media (max-width:576px)': {
      borderRadius: '0px',
    },
  },
}));
