import { Flex, Stack, Text, createStyles } from '@mantine/core';
import React, { ReactComponentElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface InPropsStyle {}
interface InPropsSearch {
  children: any;
  role: number | string;
  service: string | number;
  coin: string | number;
}
export const BoxSearch = (props: InPropsSearch) => {
  const { classes: c } = createStyleProps({});
  const { t } = useTranslation();
  const [attribute, setAttribute] = useState('');

  useEffect(() => {
    switch (props?.service) {
      case 1:
        setAttribute(t('RequestSearch.Recharge'));
        break;
      case 2:
        setAttribute(t('RequestSearch.Withdraw'));
        break;
      case 3:
        setAttribute(t('RequestSearch.Receive'));
        break;
      case 4:
        setAttribute(t('RequestSearch.Transfer'));
        break;
      case 5:
        setAttribute('Staking');
        break;
      case 6:
        Number(props.coin) > 0 ? setAttribute(t('RequestSearch.Cell')) : setAttribute(t('RequestSearch.Buy'));
        break;
      default:
        setAttribute('...');
        break;
    }
  }, [props?.service]);
  return (
    <Stack className={c.boxDefault}>
      <Flex className={c.headerSearch}>
        <Text className={c.textSearch}>{attribute}</Text>
      </Flex>
      <Flex className={c.boxbottom}>{props.children}</Flex>
    </Stack>
  );
};
const createStyleProps = createStyles((theme, params: InPropsStyle) => ({
  boxbottom: {
    maxWidth: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '-10px',
  },
  textSearch: { fontSize: '16px', fontWeight: 700, color: 'var(--white)' },
  headerSearch: {
    maxWidth: '100%',
    width: '100%',
    height: '45px',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'var(--primary-2)',
  },
  boxDefault: {
    maxWidth: '100%',
    width: '100%',
    marginTop: '5px',
    borderRadius: '8px',
    border: '1px solid var(--grey-light)',
    boxShadow: '0px 2px 4px #00000026',
    overflow: 'hidden',
  },
}));
