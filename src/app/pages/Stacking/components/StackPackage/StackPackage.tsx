import React, { Dispatch, SetStateAction, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Center, Flex, Text, createStyles } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { OutlineButton } from 'app/components/Button/OutlineButton';
import { FilledButton } from 'app/components/Button/FilledButton';
import { media } from 'styles/media';
import { ProductState } from 'store/slice/stacke/type';
import { formatCoinUS } from 'utils/helpers/formatCoinUs';
import { apiPost, apiPostV2 } from 'utils/http/request';
import { selectAuth } from 'store/slice/auth/selectors';
import { stakeActions } from 'store/slice/stacke';
import Loading from 'app/components/Loading/Loading';
import { numberWithCommas } from 'utils/helpers/formatNumberWithCommas';

interface Props {
  data?: ProductState;
  onRepair: Dispatch<SetStateAction<boolean>>;
  setActiveId: Dispatch<SetStateAction<string | number | undefined>>;
}
const StackPackage = memo(({ data, onRepair, setActiveId }: Props) => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { id, token } = useSelector(selectAuth);

  const { t } = useTranslation();
  const { cx, classes } = makeStyles();

  const handleFetchLockStack = stakeId => {
    const response: any = apiPostV2(
      '/ez/stake/admin/update',
      {
        id: stakeId,
        status: !data?.status,
      },
      null,
    );
    return response;
  };

  const lockQuery = useQuery({
    queryKey: ['handleFetchLockStack', data?.id],
    queryFn: () => handleFetchLockStack(data?.id),
    enabled: false,
    onSuccess(result) {
      const { error, data } = result.data;
      if (error === 0) {
        dispatch(
          stakeActions.setLockStake({
            projectId: projectId,
            data: data,
            status: data?.status,
          }),
        );
        dispatch(
          stakeActions.setStakeChangeId({
            stakeChangeId: projectId,
          }),
        );
      }
    },
  });

  return (
    <Card className={cx(classes.container, data?.status === 0 ? '' : 'unlock')}>
      <Loading visible={lockQuery.isFetching} />
      <Text className={cx('subtitle_4-bold', classes.name)}>
        {t('FormProject.Accumulate')} {Number(data?.timeframe) / 86400000}{' '}
        {t('FormProject.Day')}- {data?.interest_rate}
        %/{t('FormProject.Year')}
      </Text>
      <div className={classes.content}>
        <Flex className={classes.wrap}>
          <Text className={cx('small_2-medium', classes.label)}>
            {t('FormProject.Min value/transaction (USDT)')}
          </Text>
          <Center className={classes.valueWrap}>
            <Text className={cx('body_1-bold', classes.value)}>
              {numberWithCommas(String(data?.min_stake))}
            </Text>
          </Center>
        </Flex>
        <Flex className={classes.wrap}>
          <Text className={cx('small_2-medium', classes.label)}>
            {t('FormProject.Maximum value (USDT)')}
          </Text>
          <Center className={classes.valueWrap}>
            <Text className={cx('body_1-bold', classes.value)}>
              {numberWithCommas(String(data?.max_stake))}
            </Text>
          </Center>
        </Flex>
        <Flex className={classes.wrap}>
          <Text className={cx('small_2-medium', classes.label)}>
            {t('FormProject.Period')}
          </Text>
          <Center className={classes.valueWrap}>
            <Text className={cx('body_1-bold', classes.value)}>
              {Number(data?.timeframe) / 86400000} {t('FormProject.Day')}
            </Text>
          </Center>
        </Flex>
        <Flex className={classes.wrap}>
          <Text className={cx('small_2-medium', classes.label)}>
            {t('FormProject.Interest rate (%)/year')}
          </Text>
          <Center className={classes.valueWrap}>
            <Text className={cx('body_1-bold', classes.value)}>
              {data?.interest_rate}%
            </Text>
          </Center>
        </Flex>
        <Flex className={classes.wrap}>
          <Text className={cx('small_2-medium', classes.label)}>
            {t('FormProject.Early withdrawal (%)/year')}
          </Text>
          <Center className={classes.valueWrap}>
            <Text className={cx('body_1-bold', classes.value)}>
              {data?.interest_rate_before}%
            </Text>
          </Center>
        </Flex>
      </div>
      <Flex className={classes.buttonWrap}>
        <OutlineButton
          className={cx(
            classes.stackBtn,
            classes.outlineBtn,
            data?.status === 0 ? '' : 'unlock',
          )}
          onClick={() => lockQuery.refetch()}
        >
          {data?.status === 0 ? t('FormProject.Lock') : t('FormProject.Unlock')}
        </OutlineButton>
        <FilledButton
          className={classes.stackBtn}
          onClick={() => {
            setActiveId(data?.id);
            onRepair(true);
          }}
        >
          {t('Home.Repair')}
        </FilledButton>
      </Flex>
    </Card>
  );
});

export default StackPackage;

const makeStyles = createStyles(() => ({
  container: {
    borderRadius: 14,
    border: '1px solid #D6D6D6',
    boxShadow: ' 0px 2px 4px rgba(0, 0, 0, 0.15)',
    padding: '12px 0px 0px !important',
    backgroundColor: '#FFFFFF',
    '&.unlock': {
      backgroundColor: '#D6D6D6',
    },
  },
  name: {
    textAlign: 'center',
    color: 'var(--primary-2)',
  },
  content: {
    padding: '12px',
  },
  wrap: {
    padding: '12px 0px',
    justifyContent: 'space-between',
    '&:not(:nth-of-type(5))': {
      borderBottom: '1px solid #BFBFBF',
    },
    [media.small()]: {
      gap: 20,
    },
  },
  label: {
    [media.small()]: {
      flex: 1,
    },
  },
  valueWrap: {
    width: 258,
    height: 36,
    padding: '6.5px 0px',
    background: '#E9DEFF',
    border: '1px solid #5D3BA4',
    borderRadius: 8,
    [media.small()]: {
      width: '50%',
    },
  },
  value: {
    color: 'var(--primary-2)',
  },
  buttonWrap: {
    gap: 12,
    width: '100%',
    padding: 12,
    backgroundColor: '#EAEAEA',
  },
  stackBtn: {
    height: 36,
    width: '100%',
  },
  outlineBtn: {
    color: '#F20000 !important',
    border: '1px solid #F20000 !important',
    '&.unlock': {
      color: '#FFFFFF !important',
      backgroundColor: '#F20000',
    },
    '&.unlock:hover': {
      color: '#F20000 !important',
      border: '1px solid #F20000 !important',
    },
    ':hover': {
      color: 'inherit',
      backgroundColor: 'inherit',
    },
  },
}));
