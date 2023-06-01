import { Avatar, Box, Center, Divider, Group, Stack, Text, createStyles } from '@mantine/core';
import { AccumulationCard } from 'app/pages/AdminApprovesRequest/components/AccumulationCard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { ReactComponent as IconUsdt } from 'assets/icons/coin/usdt.svg';
import { STATUS_ACCEPT, STATUS_DECLINE, STATUS_WAITING } from 'constants/recharge';
import { TRequesterInfo } from 'store/slice/request/types';
import { useSelector } from 'react-redux';
import { selectResponseRequest } from 'store/slice/request/selector';
import Loading from 'app/components/Loading/Loading';
import { clearPhoneCode84 } from 'helpers/clearPhoneCode84';

type Props = {
  usdt: string | number;
  transferContent: string;
  nameBank: string;
  nameReceiver: string;
  accountNumber: string;
  creationTime: string;
  avatarBank: string;
  updateTime?: string;
  status: number;
  content: string;
  requesterInfo: TRequesterInfo;
};

export const CardDetail = (props: Props) => {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const { classes } = useStyle();
  const loading = useSelector(selectResponseRequest);

  function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

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
      <Loading visible={loading?.loading} />

      <Box p={'12px 8px'}>
        <Center mb={12}>
          <Group>
            <Text className="subtitle_1-bold" mr={-9} c={'var(--primary-2)'}>
              {`${props.status == 1 ? '+' : props.status == -1 ? '+' : '-'}`}
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

        <Group spacing={6}>
          <Center sx={{ width: '54px', height: '54px', background: '#E9DEFF', borderRadius: '50%', overflow: 'hidden' }}>
            <Avatar src={props?.requesterInfo.avatar} w={54} h={54} radius={100} />
          </Center>
          <Stack spacing={0}>
            <Text className="body_4-bold" c={'var(--primary-2)'}>
              {capitalizeFirstLetter(props?.requesterInfo.name)}
            </Text>
            <Text className="small_3-regular" c={'var(--grey-black)'}>
              {props?.requesterInfo.phone_number}
            </Text>
          </Stack>
        </Group>

        <Text className="small_6-regular" mt={12}>
          {t('HistoryRecharge.transferAmount')}
        </Text>
        <Text className="small_1-bold">{props.transferContent} USDT</Text>

        <Text className="small_6-regular" mt={12}>
          {t('UserManagement.history.labelReasonSubtract')}
        </Text>
        <Text className="small_1-bold">{props.content}</Text>

        {/* infor bank */}
        <Text className="small_6-regular" c={'var(--grey-black'} mt={12}>
          {t('approveWithdraw.User account receives money')}
        </Text>
        <Group w={'100%'} noWrap spacing={10}>
          <Center
            sx={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: '#E9DEFF',
            }}
          >
            <Avatar src={props?.avatarBank} w={54} h={54} className={classes.avatarBank} />
          </Center>
          <Stack w={'100%'} spacing={2}>
            <Text className="small_1-bold">Nickname - {props?.nameReceiver}</Text>
            <Text className="small_4-bold">
              {`${t('approveWithdraw.Phone number')}`} - {clearPhoneCode84(props?.accountNumber)}
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
    minWidth: '54px',
    minHeight: '54px',
    borderRadius: '50%',
  },
}));
