import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Variants, motion } from 'framer-motion';
import { useForm } from '@mantine/form';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Flex, Text, TextInput, createStyles, Select } from '@mantine/core';

import { media } from 'styles/media';
import { ReactComponent as CaretDown } from 'assets/icons/arrow/caret-down.svg';
import { FilledButton } from 'app/components/Button/FilledButton';
import { apiPost } from 'utils/http/request';
import { selectAuth } from 'store/slice/auth/selectors';
import Loading from 'app/components/Loading/Loading';
import { stakeActions } from 'store/slice/stacke';
import { ProductState } from 'store/slice/stacke/type';

const stackFormVariants: Variants = {
  hidden: {
    height: '0px',
    opacity: 0,
  },
  visible: {
    height: '335px',
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

interface Props {
  isShow?: boolean;
  projectId?: number | string;
  data?: ProductState;
  isRepair: boolean;
  onOpen?: Dispatch<SetStateAction<boolean>>;
}

const StackForm = ({ isShow, projectId, data, isRepair, onOpen }: Props) => {
  const dispatch = useDispatch();
  const { id, token } = useSelector(selectAuth);

  const { t } = useTranslation();
  const { cx, classes } = makeStyles();

  const monthArray = [
    {
      value: '30',
      label: '30 ' + t('FormProject.Day'),
    },
    {
      value: '60',
      label: '60 ' + t('FormProject.Day'),
    },
    {
      value: '90',
      label: '90 ' + t('FormProject.Day'),
    },
  ];
  const [day, setDay] = useState<string>('30');

  const form = useForm({
    initialValues: {
      min_stake: '' || isRepair ? data?.min_stake : '',
      max_stake: '' || isRepair ? data?.max_stake : '',
      interest_rate: '' || isRepair ? data?.interest_rate : '',
      interest_rate_before: '' || isRepair ? data?.interest_rate_before : '',
    },
    validate: {
      min_stake: value => {
        if (!value) {
          return 'Invalid min_stake';
        }
      },
      max_stake: value => {
        if (!value) {
          return 'Invalid max_stake';
        }
      },
      interest_rate: value => {
        if (!value) {
          return 'Invalid interest_rate';
        }
      },
      interest_rate_before: value => {
        if (!value) {
          return 'Invalid interest_rate_before';
        }
      },
    },
  });

  function handleCheckInput(e) {
    const newValue = e.target.value.replace(/[^0-9.]/g, '');
    e.target.value = newValue;
  }
  const handleFetchAddStack = () => {
    const response = apiPost(
      '/ez/stake/admin/create',
      {
        project_id: projectId,
        min_stake: form.values.min_stake,
        max_stake: form.values.max_stake,
        interest_rate: form.values.interest_rate,
        interest_rate_before: form.values.interest_rate_before,
        timeframe: Number(day) * 86400000,
        description: {},
      },
      {
        userid: id,
        token: token,
      },
    );
    return response;
  };

  const addQuery = useQuery({
    queryKey: ['handleFetchAddStack'],
    queryFn: handleFetchAddStack,
    enabled: false,
    onSuccess(result) {
      const { error, data } = result;
      console.log(result);
      if (error === 0) {
        form.reset();
        dispatch(
          stakeActions.createStakeOfEachProject({
            projectId: projectId,
            data: data,
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

  const handleFetchRepairStack = () => {
    const response = apiPost(
      '/ez/stake/admin/update',
      {
        id: data?.id,
        project_id: projectId,
        min_stake: form.values.min_stake,
        max_stake: form.values.max_stake,
        interest_rate: form.values.interest_rate,
        interest_rate_before: form.values.interest_rate_before,
        timeframe: Number(day) * 86400000,
        description: {},
        status: data?.status,
      },
      {
        userid: id,
        token: token,
      },
    );
    return response;
  };

  const repairQuery = useQuery({
    queryKey: ['handleFetchRepairStack'],
    queryFn: handleFetchRepairStack,
    enabled: false,
    onSuccess(result) {
      const { error, data } = result;
      if (error === 0) {
        onOpen?.(false);
        dispatch(
          stakeActions.repairStakeOfEachProject({
            projectId: projectId,
            data: data,
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
    <div>
      <form
        onSubmit={form.onSubmit(() => {
          if (isRepair) {
            console.log(1);
            repairQuery.refetch();
          } else {
            addQuery.refetch();
          }
        })}
      >
        <Loading visible={addQuery.isFetching || repairQuery.isFetching} />
        <motion.div
          initial={false}
          animate={isShow ? 'visible' : 'hidden'}
          variants={stackFormVariants}
          className={classes.container}
        >
          <Flex className={classes.wrap}>
            <Text className={cx('small_2-medium', classes.label)}>
              {t('FormProject.Min value/transaction (USDT)')}
            </Text>
            <TextInput
              classNames={{
                root: classes.rootInput,
                error: classes.errorInput,
                input: cx('body_6-regular', classes.input),
              }}
              placeholder={t('FormProject.Enter value')}
              {...form.getInputProps('min_stake')}
              onInput={e => handleCheckInput(e)}
            />
          </Flex>
          <Flex className={classes.wrap}>
            <Text className={cx('small_2-medium', classes.label)}>
              {t('FormProject.Maximum value (USDT)')}
            </Text>
            <TextInput
              classNames={{
                root: classes.rootInput,
                error: classes.errorInput,
                input: cx('body_6-regular', classes.input),
              }}
              placeholder={t('FormProject.Enter value')}
              {...form.getInputProps('max_stake')}
              onInput={e => handleCheckInput(e)}
            />
          </Flex>
          <Flex className={classes.wrap}>
            <Select
              value={day}
              onChange={(value: string) => setDay(value)}
              rightSection={<CaretDown />}
              rightSectionWidth={30}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={monthArray}
              classNames={{
                root: classes.rootSelect,
                error: classes.errorInput,
                input: cx('small_2-medium', classes.inputSelect),
              }}
            />
            <TextInput
              classNames={{
                root: classes.rootInput,
                error: classes.errorInput,
                input: cx('body_6-regular', classes.input),
              }}
              placeholder={t('FormProject.Enter interest rate')}
              {...form.getInputProps('interest_rate')}
              onInput={e => handleCheckInput(e)}
            />
          </Flex>
          <Flex className={classes.wrap}>
            <Text className={cx('small_2-medium', classes.label)}>
              {t('FormProject.Early withdrawal (%)/year')}
            </Text>
            <TextInput
              classNames={{
                root: classes.rootInput,
                error: classes.errorInput,
                input: cx('body_6-regular', classes.input),
              }}
              placeholder={t('FormProject.Enter interest rate')}
              {...form.getInputProps('interest_rate_before')}
              onInput={e => handleCheckInput(e)}
            />
          </Flex>
          {isRepair ? (
            <FilledButton type="submit" className={classes.addBtn}>
              {t('FormProject.Save')}
            </FilledButton>
          ) : (
            <FilledButton type="submit" className={classes.addBtn}>
              {t('FormProject.Add')}
            </FilledButton>
          )}
        </motion.div>
      </form>
    </div>
  );
};

export default StackForm;

const makeStyles = createStyles(() => ({
  container: {
    padding: '0px 14px',
  },
  wrap: {
    height: 74,
    padding: '12px 0px',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:not(:nth-of-type(4))': {
      borderBottom: '1px solid #BFBFBF',
    },
    [media.small()]: {
      gap: 20,
    },
  },
  rootInput: {
    width: 230,
    [media.small()]: {
      flex: 1,
    },
  },
  errorInput: {
    display: 'none',
  },
  label: {
    width: '40%',
    [media.small()]: {
      width: '40%',
    },
  },
  input: {
    width: '100%',
    height: 44,
    borderRadius: 8,
    border: '1px solid #929292',
  },

  rootSelect: {
    width: 100,
    [media.small()]: {
      width: '40%',
    },
  },
  inputSelect: {
    border: 'none',
    paddingLeft: 0,
  },
  addBtn: {
    width: '100%',
    height: 44,
  },
}));
