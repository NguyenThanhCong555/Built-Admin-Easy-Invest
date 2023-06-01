import { Avatar, Box, Center, Divider, Group, Stack, Text, createStyles } from '@mantine/core';
import { AccumulationCard } from 'app/pages/AdminApprovesRequest/components/AccumulationCard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { ReactComponent as IconUsdt } from 'assets/icons/coin/usdt.svg';
import { STATUS_ACCEPT, STATUS_DECLINE, STATUS_WAITING } from 'constants/recharge';
import { TRequesterInfo } from 'store/slice/request/types';
import { SERVICE_RECHARGE_MONEY } from 'constants/common';

type Props = {
  usdt: string | number;
  transferContent: string;
  creationTime: string;
  updateTime?: string;
  status: number;
  requesterInfo: TRequesterInfo;
  service: number;
};

export const CardDetail = (props: Props) => {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const { classes } = useStyle();

  return (
    <AccumulationCard
      title={
        props.status === STATUS_ACCEPT
          ? t('HistoryRecharge.statusSuccess')
          : props.status === STATUS_DECLINE
          ? t('HistoryRecharge.cancel')
          : t('HistoryRecharge.waitingProgram')
      }
    >
      <Box p={'12px 8px'}>
        <Center mb={12}>
          <Group>
            <Text className="subtitle_1-bold" c={'var(--secondary-1)'}>
              {props.service === SERVICE_RECHARGE_MONEY ? '+' : '-'}
              {props.usdt}
            </Text>
            <IconUsdt />
          </Group>
        </Center>

        {props.updateTime && props.status !== STATUS_WAITING && (
          <Group noWrap mb={12}>
            <Text className="small_6-regular">{t('HistoryRecharge.ApprovalTime')}</Text>
            <Text className="small_1-bold">{props.updateTime}</Text>
          </Group>
        )}

        <Divider mb={13} />

        <Text className="small_6-regular" mt={12}>
          {t('HistoryRecharge.transferAmount')}
        </Text>
        <Text className="small_1-bold">{props.usdt} USDT</Text>

        <Text className="small_6-regular" mt={12}>
          {t('UserManagement.history.labelReasonPlus')}
        </Text>
        <Text className="small_1-bold">{props.transferContent}</Text>

        {/* infor bank */}
        <Text className="small_6-regular" c={'var(--grey-black'} mt={12}>
          {t('HistoryRecharge.accountReceivingMoney')}
        </Text>
        <Group w={'100%'} noWrap spacing={10}>
          <Avatar src={props?.requesterInfo.avatar} w={54} h={54} className={classes.avatarBank} />
          <Stack w={'100%'} spacing={2}>
            <Text className="small_1-bold">Nickname - {props?.requesterInfo.name}</Text>
            <Text className="small_4-bold">
              {t('UserManagement.phone')} - {props?.requesterInfo.phone_number}
            </Text>
          </Stack>
        </Group>

        <Text className="small_6-regular" mt={12}>
          {t('HistoryRecharge.creationTime')}
        </Text>
        <Text className="small_1-bold">{props.creationTime}</Text>
      </Box>
    </AccumulationCard>
  );
};

const useStyle = createStyles(() => ({
  avatarBank: {
    border: `0.5px solid var(--grey-light)`,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    minWidth: '54px',
    minHeight: '54px',
  },
}));
