import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Divider, Group, LoadingOverlay, Stack, Text, createStyles } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useTranslation } from 'react-i18next';
import { SECONDS_PER_DAY } from 'constants/common';
import { listState, listTime } from './data';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import { FilledButton } from 'app/components/Button/FilledButton';
import { useDispatch } from 'react-redux';
import { variable } from 'styles/variable';
import { TAP_REQUEST_PLUS, TAP_REQUEST_SUBTRACT } from '../..';
import { getRequestHistory } from 'store/slice/users/request';
import { RECHARGE_MONEY_CODE, WITHDRAW_MONEY_CODE } from 'constants/recharge';
import { usersActions } from 'store/slice/users';

export type FilterStakeProps = {
  fromDate: Date;
  toDate: Date;
  chooseTime: number;
  page: number;
  chooseState: number;
  setFromDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setToDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setChooseTime: React.Dispatch<React.SetStateAction<number>>;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setChooseState: React.Dispatch<React.SetStateAction<number>>;
  setHasMorePlus: React.Dispatch<React.SetStateAction<boolean>>;
  setHasMoreSubtract: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
  tap?: string;
};

export const FilterHistoryWithdraw = (props: FilterStakeProps) => {
  const { t } = useTranslation();
  const { classes } = useStyle();
  const dispatch = useDispatch();

  const handleChooseTime = numberTime => {
    if (numberTime === props.chooseTime) return;

    props.setChooseTime(numberTime);
    props.setFromDate(new Date(Math.floor(new Date().getTime()) - SECONDS_PER_DAY * numberTime * 30 * 1000));
  };

  const handleFilter = () => {
    if (!props.fromDate || !props.toDate) return;

    if (props.tap === TAP_REQUEST_PLUS) {
      const dataFilter: getRequestHistory = {
        beginTime: props.fromDate.setHours(0, 0, 0, 1),
        endTime: props.toDate.setHours(23, 59, 59, 999),
        service: RECHARGE_MONEY_CODE,
        userId: props.userId,
        page: 1,
        status: props.chooseState,
      };
      // set call api new page
      props.setHasMorePlus(true);
      dispatch(usersActions.requestGetRequestHistoryPlus(dataFilter));
    }

    if (props.tap === TAP_REQUEST_SUBTRACT) {
      const dataFilter: getRequestHistory = {
        beginTime: props.fromDate.setHours(0, 0, 0, 1),
        endTime: props.toDate.setHours(23, 59, 59, 999),
        service: WITHDRAW_MONEY_CODE,
        userId: props.userId,
        page: 1,
        status: props.chooseState,
      };
      // set call api new page
      props.setHasMoreSubtract(true);
      dispatch(usersActions.requestGetRequestHistorySubtract(dataFilter));
    }
    // turn off oppup
    props.setOpenFilter(false);
  };

  const handleRefresh = () => {
    if (!props.fromDate || !props.toDate) return;

    if (props.tap === TAP_REQUEST_PLUS) {
      const dataFilter: getRequestHistory = {
        beginTime: 0,
        endTime: 0,
        service: RECHARGE_MONEY_CODE,
        userId: props.userId,
        page: 1,
      };
      // set call api new page
      props.setHasMorePlus(true);
      dispatch(usersActions.requestRefreshHistoryPlus(dataFilter));
    }

    if (props.tap === TAP_REQUEST_SUBTRACT) {
      const dataFilter: getRequestHistory = {
        beginTime: 0,
        endTime: 0,
        service: WITHDRAW_MONEY_CODE,
        userId: props.userId,
        page: 1,
      };
      // set call api new page
      props.setHasMoreSubtract(true);
      dispatch(usersActions.requestRefreshHistorySubtract(dataFilter));
    }

    // turn off oppup
    props.setOpenFilter(false);
  };

  const handleChooseState = numberState => {
    if (numberState === props.chooseState) return;

    props.setChooseState(numberState);
  };

  return (
    <Box>
      {/* filter date */}
      <Text className="body_4-bold">{t('UserManagement.filter.labelTimeStake')}</Text>
      <Group position="apart" noWrap mt={18}>
        <DateInput
          value={props.fromDate}
          onChange={props.setFromDate}
          dateParser={input => {
            const splited = input.split('/');
            const dateSplited = new Date(`${splited[2]}-${splited[1]}-${splited[0]}`);
            return dateSplited && splited.length !== 0 ? dateSplited : new Date(input);
          }}
          valueFormat="DD/MM/YYYY"
          placeholder="Date input"
          maxDate={props.toDate}
          maw={216}
          mx="auto"
          classNames={{ input: classes.input }}
        />
        <Text className="small_3-regular">{t('UserManagement.filter.to')}</Text>
        <DateInput
          value={props.toDate}
          onChange={props.setToDate}
          dateParser={input => {
            const splited = input.split('/');
            const dateSplited = new Date(`${splited[2]}-${splited[1]}-${splited[0]}`);
            return dateSplited && splited.length !== 0 ? dateSplited : new Date(input);
          }}
          valueFormat="DD/MM/YYYY"
          placeholder="Date input"
          minDate={props.fromDate}
          maw={216}
          mx="auto"
          classNames={{ input: classes.input }}
        />
      </Group>

      <Group position="apart" noWrap spacing={10} mt={16}>
        {!!listTime.length &&
          listTime.map(time => (
            <Button
              key={time.id}
              bg={props.chooseTime === time.number ? 'var(--primary-5)' : '#F3F3F3'}
              c={props.chooseTime === time.number ? 'var(--black)' : 'var(--grey-dark)'}
              onClick={() => handleChooseTime(time.number)}
              className={classes.buttonChooseTime}
            >{`${time.number} ${t(`UserManagement.filter.${time.unit}`)}`}</Button>
          ))}
      </Group>

      {/* filter state */}
      <Text className="body_4-bold" mt={34} mb={18}>
        {t('UserManagement.filter.labelState')}
      </Text>
      <Group position="apart" noWrap spacing={10} mt={16}>
        {!!listState.length &&
          listState.map(state => (
            <Button
              key={state.id}
              bg={props.chooseState === state.value ? 'var(--primary-5)' : '#F3F3F3'}
              c={props.chooseState === state.value ? 'var(--black)' : 'var(--grey-dark)'}
              onClick={() => handleChooseState(state.value)}
              className={classes.buttonChooseTime}
            >{`${t(`${state.content}`)}`}</Button>
          ))}
      </Group>

      {/* button filter */}
      <Group position="apart" spacing={8} bg={'var(--white-light)'} p={'10px 16px'} mx={-16} mt={30} noWrap>
        <OutlineButton onClick={handleRefresh} style={{ flex: 1 }}>
          {t('UserManagement.filter.refresh')}
        </OutlineButton>
        <FilledButton onClick={handleFilter} style={{ flex: 1 }}>
          {t('UserManagement.filter.filterNow')}
        </FilledButton>
      </Group>
    </Box>
  );
};

const useStyle = createStyles({
  input: {
    background: '#F3F3F3',
    border: 'transparent',
    textAlign: 'center',
  },

  buttonChooseTime: {
    flex: '1 1 106px',
    border: 'transparent',
    minWidth: '76px',
    paddingRight: '5px',
    paddingLeft: '5px',

    '&:hover': {
      background: variable.primary.primary5,
      filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    },
  },
});
