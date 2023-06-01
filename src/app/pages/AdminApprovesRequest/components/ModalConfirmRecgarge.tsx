import { Center, Flex, Stack, Text, TextInput, createStyles } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FilledButton } from 'app/components/Button/FilledButton';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { requestActions } from 'store/slice/request';
import { selectResponseActionRequest } from 'store/slice/request/selector';

interface ModalConfirmRequestProps {
  idProject?: any;
  close?: any;
}

export const ModalConfirmRecgarge = (props: ModalConfirmRequestProps) => {
  const { t } = useTranslation();
  const responseActionRequest = useSelector(selectResponseActionRequest);

  const form = useForm({
    initialValues: { tradingCode: '', quantity: '' },
    validate: {
      tradingCode: value => {
        if (value.trim().length <= 0 || !value) {
          return t('Header.Please enter the transaction code!');
        } else {
          return null;
        }
      },
    },
  });
  const { classes: c } = makeStyles();
  const dispatch = useDispatch();

  const handleUpdateProfile = values => {
    const payload = {
      request_id: props?.idProject?.id,
      transfered_order_code: values?.tradingCode,
      real_exchange: values?.quantity,
      service: 1,
    };

    dispatch(requestActions.requestAcceptRequest(payload));
  };

  useEffect(() => {
    if (responseActionRequest.error === 0) {
      console.log('hello');

      props.close();
      form.reset();
      dispatch(requestActions.resetResponseActionRequest());
    }

    if (responseActionRequest.error === 27) {
      form.setFieldError('tradingCode', t('Confirmation.Duplicate transaction code'));
      dispatch(requestActions.resetResponseActionRequest());
    }
  }, [responseActionRequest.loading]);

  return (
    <Stack>
      <Flex className={c.boxRequestCoin}>
        <Text fz={16} fw={700} color="black">
          {t('approveWithdraw.Amount requested')}:
        </Text>
        <Text fz={16} fw={700} color="var(--primary-2)">
          {props?.idProject?.exchange} USDT
        </Text>
      </Flex>
      <form onSubmit={form.onSubmit(values => handleUpdateProfile(values))} className={c.form}>
        <TextInput
          sx={{
            '.mantine-1fzet7j': {
              fontSize: '16px',
              fontWeight: 400,
              color: 'black',
            },
          }}
          label={t('Confirmation.Transaction code received money')}
          placeholder={t('approveWithdraw.Please enter transaction code')}
          withAsterisk
          {...form.getInputProps('tradingCode')}
          classNames={{ input: c.input, label: c.label }}
        />
        <TextInput
          label={t('approveWithdraw.Actual amount')}
          sx={{
            '.mantine-1fzet7j': {
              fontSize: '16px',
              fontWeight: 400,
              color: 'black',
            },
          }}
          type="number"
          placeholder={t('approveWithdraw.Enter amount')}
          {...form.getInputProps('quantity')}
          classNames={{ input: c.input, label: c.label }}
          min={1}
        />
        <Center mt={25}>
          <FilledButton sx={{ width: '100%', height: '45px' }} type="submit">
            <Text> {t('approveWithdraw.Confirm')}</Text>
          </FilledButton>
        </Center>
      </form>
    </Stack>
  );
};

const makeStyles = createStyles(() => ({
  form: {
    width: '100%',
  },
  boxRequestCoin: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stack: {
    gap: 0,
  },
  center: {
    height: 68,
    backgroundColor: 'var(--primary-2)',
  },
  body: {
    padding: 0,
  },
  text: {
    fontSize: 24,
    fontWeight: 700,
    color: '#fff',
  },
  header: {
    display: 'none',
  },

  box: {
    padding: 24,

    '@media (max-width: 768px)': {
      padding: 12,
    },
  },

  input: {
    border: '1px solid #929292',
    height: 44,
    borderRadius: 8,

    ':focus, :focus-within': {
      borderColor: 'var(--primary-2)',
    },
  },

  label: {
    marginTop: 11,
    fontSize: 16,
    fontWeight: 700,
  },
}));
