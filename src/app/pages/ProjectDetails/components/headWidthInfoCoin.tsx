import { createStyles } from '@mantine/styles';
import React from 'react';
import { ReactComponent as ArrowLeft } from 'assets/icons/loginPage/arrow-narrow-left.svg';
import { Flex, Text } from '@mantine/core';
import { useNavigate } from 'react-router';

interface InPropsStyle {
  label?: string;
}
export const HeadInfoCoinBasic = props => {
  const { classes: c } = createStyleProps({});
  const nav = useNavigate();
  const backPage = () => {
    nav(`${props.backRole}`);
  };
  return (
    <Flex className={c.boxConfig}>
      <Flex className={c.EditBox}>
        <Flex onClick={backPage} className="arrLeft">
          <ArrowLeft />
        </Flex>
        <Text fz={18} fw={500}>
          {props.label}
        </Text>
        <Flex w={50}></Flex>
      </Flex>
      <Flex className="BoxChildren">{props.children}</Flex>
    </Flex>
  );
};

const createStyleProps = createStyles((theme, params: InPropsStyle) => ({
  EditBox: {
    width: '100%',
    justifyContent: 'space-between',
    '.arrLeft': {
      maxWidth: '50px',
      width: '100%',
      justifyContent: 'center',
    },
  },
  boxConfig: {
    maxWidth: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '.BoxChildren': {
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '100%',
      width: '100%',
    },
  },
}));
