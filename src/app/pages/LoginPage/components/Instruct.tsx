import { Anchor, Flex, Text } from '@mantine/core';
import React from 'react';

import arrowRight from 'assets/icons/arrow/doubleArrowRightViolet.svg';
import logoMonkey from 'assets/icons/Troubleshooting.svg';
import { useTranslation } from 'react-i18next';

export const Instruct = () => {
  const { t } = useTranslation();

  return (
    <Flex
      sx={{
        borderRadius: '8px',
        border: '1px solid #D6D6D6',
        marginBottom: '20px',
      }}
      w={'100%'}
      h={64}
      bg={'white'}
      align={'center'}
    >
      <img style={{ marginLeft: '8px' }} src={logoMonkey} alt="" />
      <Flex ml={10} h={'100%'} justify={'center'} direction={'column'}>
        <Text>{t('Login.Having trouble logging in?')}</Text>
        <Anchor sx={{ display: 'flex', alignItems: 'center' }}>
          <Text fz={16} color="#976FEA">
            {t('Login.See the instructions')}
          </Text>
          <img
            style={{ marginLeft: '5px', marginTop: '2px' }}
            src={arrowRight}
            alt=""
          />
        </Anchor>
      </Flex>
    </Flex>
  );
};
