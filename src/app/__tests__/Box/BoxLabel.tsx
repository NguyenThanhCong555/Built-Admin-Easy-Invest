import { JSXElement } from '@babel/types';
import { Flex, Text, createStyles } from '@mantine/core';
import React, { ReactElement } from 'react';
interface Iprops {
  label: string;
  height?: string;
  frontSize?: string;
  frontW?: number;
  background?: string;
  // variable
  heights?: string;
  frontSizes?: string;
  frontWs?: number;
  backgrounds?: string;
  children?: ReactElement;
}
export const BoxLabel = (props: Iprops) => {
  const heightConfig = props.height;
  const frontSizeConfig = props.frontSize;
  const frontWConfig = props.frontW;
  const backgroundConfig = props.background;
  const { classes: c } = createStyleProps({
    label: '',
    heights: heightConfig,
    frontSizes: frontSizeConfig,
    frontWs: frontWConfig,
    backgrounds: backgroundConfig,
  });
  // main
  return (
    <Flex className={c.main}>
      <Flex className="label">
        <Text className="text1">{props.label}</Text>
      </Flex>
      <Flex className="Box">{props.children}</Flex>
    </Flex>
  );
};

const createStyleProps = createStyles((theme, params: Iprops) => ({
  main: {
    maxWidth: '570px',
    width: '100%',
    height: params.heights,
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: '14px',
    boxShadow: '0px 2px 4px #00000026',
    border: '1px solid var(--grey-light)',

    '.label': {
      width: '100%',
      height: '46px',
      background: params.backgrounds,
      justifyContent: 'center',
      alignItems: 'center',

      '.text1': {
        fontSize: params.frontSizes,
        fontWeight: params.frontWs,
        color: 'var(--white)',
      },
    },
    '.Box': {
      width: '100%',
      height: '100%',
    },
  },
}));
