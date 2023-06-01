import React, { useCallback } from 'react';
import { Stack, createStyles, Text, Group, Avatar } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { variable } from 'styles/variable';
import { FilledButton } from 'app/components/Button/FilledButton';
import { useSelector } from 'react-redux';
import { selectListCoinUsdtOfUser } from 'store/slice/users/selector';
import { TCoinInfo } from 'store/slice/users/types';

type PopupPaymentConfirmationProps = {
  coinId: string | number;
  amount: number | string;
  avatar: string;
  userName: string;
  phoneNumber: string | number;
  onConfirmTrading?: () => void;
  loadingButtonConfirm?: boolean;
};

export const PopupPaymentConfirmation = (props: PopupPaymentConfirmationProps) => {
  const { t } = useTranslation();
  const { classes } = useStyle();

  const listCoinUsdtOfUser = useSelector(selectListCoinUsdtOfUser);

  const callbackGetCoinName = useCallback((listCoins: TCoinInfo[], coinId): string => {
    const indexCoinId = listCoins.map(coin => coin.coin_id).indexOf(coinId);

    if (indexCoinId === -1) return '';
    return listCoins[indexCoinId].coin_name;
  }, []);

  const coinName = callbackGetCoinName(listCoinUsdtOfUser, Number(props.coinId));

  return (
    <>
      <Stack className={classes.header}>
        <Text className="title_1-bold" display={'inline'} ta={'center'} c={variable.neutral.white}>
          {t('UserManagement.popupCheckInfor')}
        </Text>
      </Stack>

      <Stack spacing={6} p={'20px 24px 24px'}>
        <Group position="apart" mb={'3.5px'}>
          <Text className="body_4-bold">{t('UserManagement.amountRequested')}</Text>
          <Text className="body_4-bold" c={'var(--primary-2)'}>
            {props.amount}
            {'  '}
            {coinName == '' ? 'USDT' : coinName}
          </Text>
        </Group>

        <Text className="body_4-bold">{t('UserManagement.userAccount')}</Text>
        <Group spacing={10} mb={28}>
          <Avatar src={props.avatar} radius={100} miw={42} mih={42} />
          <Stack spacing={2}>
            <Text className="small_1-bold">Nickname - {props.userName}</Text>
            <Text className="small_1-bold">
              {t('UserManagement.phone')} - {props.phoneNumber}
            </Text>
          </Stack>
        </Group>

        <FilledButton loading={props.loadingButtonConfirm} onClick={props.onConfirmTrading} w={'100%'}>
          {t('UserManagement.confirm')}
        </FilledButton>
      </Stack>
    </>
  );
};

const useStyle = createStyles(theme => ({
  header: {
    borderRadius: '14px 14px 0 0',
    alignItem: 'center',
    justifyContent: 'center',
    gap: 0,
    background: variable.primary.primary2,
    height: '68px',
  },
}));
