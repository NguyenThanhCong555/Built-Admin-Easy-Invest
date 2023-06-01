import { Box, Divider, Group, Image, createStyles } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { StatusProcess } from './StatusProcess';
import { STATUS_ACCEPT, STATUS_WAITING } from 'constants/recharge';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { Accumulation } from '../../components/Accumulation';

import IconUsdt from 'assets/icons/coin/usdt.svg';

interface Props {
  stakingId: number;
  usdt: string | number;
  creationTime: string;
  status: number;
  approvalTime?: string;
  phoneNumber?: number | string;
  onClick?: (value: any) => void;
}

export const InformationCard = (props: Props) => {
  const { t } = useTranslation();
  const { classes } = useStyle();

  return (
    <Box className={classes.box} onClick={props.onClick}>
      <Accumulation
        label={t('UserManagement.history.status')}
        value={<StatusProcess state={props.status} />}
        colorValue="var(--black)"
      />

      {props.status !== STATUS_WAITING && props.approvalTime && (
        <Accumulation
          label={t('UserManagement.history.approvalTime')}
          value={props.approvalTime}
          colorValue="var(--black)"
          classValue="small_2-medium"
        />
      )}

      <Divider my={6} />

      <Accumulation
        label={t('UserManagement.history.amount')}
        value={props.usdt}
        unitValue={<Image src={IconUsdt} style={{ width: '24px', height: '24px' }}></Image>}
        colorValue="var(--primary-2)"
        classValue="body_4-bold"
      />

      <Accumulation
        label={t('UserManagement.history.phoneNumberOfUser')}
        value={`+${props.phoneNumber}`}
        colorValue="var(--primary-2)"
        classValue="body_4-bold"
      />

      <Accumulation
        label={t('UserManagement.history.creationTime')}
        value={props.creationTime}
        colorValue="var(--black)"
        classValue="small_2-medium"
      />
    </Box>
  );
};

const useStyle = createStyles(theme => ({
  box: {
    width: '100%',
    padding: '8px 12px',
    background: 'var(--white)',
    border: `1px solid #F3F3F3`,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '16px',
  },
  avatar: {
    width: '46px',
    height: '46px',
  },
}));
