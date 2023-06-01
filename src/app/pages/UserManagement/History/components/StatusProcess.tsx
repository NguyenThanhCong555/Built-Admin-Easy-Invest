import { Center, Text } from '@mantine/core';
import { CLOSE } from 'constants/common';
import { STATUS_ACCEPT, STATUS_DECLINE } from 'constants/recharge';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const StatusProcess = (props: { state: number }) => {
  const { t } = useTranslation();

  if (props.state === STATUS_ACCEPT)
    return (
      <Center bg={' #D1FFE4'} w={84} h={22} p={'6px 10px'} style={{ borderRadius: '12px' }}>
        <Text display={'inline'} fz={12} c={'#06B54C'}>
          {t('HistoryRecharge.statusSuccess')}
        </Text>
      </Center>
    );
  else if (props.state === STATUS_DECLINE)
    return (
      <Center bg={'#FFE1DB'} w={84} h={22} p={'6px 10px'} style={{ borderRadius: '12px' }}>
        <Text display={'inline'} fz={12} c={'#F94242'}>
          {t('HistoryRecharge.cancel')}
        </Text>
      </Center>
    );
  else
    return (
      <Center bg={'var(--primary-5)'} w={84} h={22} p={'6px 10px'} style={{ borderRadius: '12px' }}>
        <Text display={'inline'} fz={12} c={'var(--primary-2)'}>
          {t('HistoryRecharge.waitingProgram')}
        </Text>
      </Center>
    );
};
