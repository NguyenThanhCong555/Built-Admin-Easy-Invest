import React, { useEffect, useState } from 'react';
import ModalConfirmRequest from './ModalConfirmRequest';
import { Flex, Stack, Text, TextInput, createStyles } from '@mantine/core';
import { FilledButton } from 'app/components/Button/FilledButton';
import { useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { requestActions } from 'store/slice/request';
import { useTranslation } from 'react-i18next';
import { selectResponseActionRequest } from 'store/slice/request/selector';
import Loading from 'app/components/Loading/Loading';

interface ModalConfirmWithdrawProps {
  opened: boolean;
  close: () => void;
  data: any;
  isDetail?: boolean;
  handleOpenRequestChecked?: () => void;
}

const ModalConfirmWithdraw = ({ opened, handleOpenRequestChecked, close, data, isDetail }: ModalConfirmWithdrawProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const dispatch = useDispatch();

  const responseActionRequest = useSelector(selectResponseActionRequest);

  const [submit, setSubmit] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      transfered_order_code: '',
    },

    validate: {
      transfered_order_code: value => (!value ? t('approveWithdraw.Please enter transaction code') : null),
    },
  });

  function handleSubmit(values) {
    const payload = {
      request_id: data?.id,
      transfered_order_code: values.transfered_order_code,
      real_exchange: data?.exchange,
      service: 2,
      isDetail: isDetail,
    };
    setSubmit(true);
    dispatch(requestActions.requestAcceptRequest(payload));
  }

  useEffect(() => {
    if (responseActionRequest.error === 0) {
      close();
      form.reset();
      dispatch(requestActions.resetResponseActionRequest());
    }

    if (responseActionRequest.error === 27) {
      form.setFieldError('transfered_order_code', t('Confirmation.Duplicate transaction code'));
      dispatch(requestActions.resetResponseActionRequest());
    }
  }, [responseActionRequest.loading]);

  function handleCloseModal() {
    // Reset data khi đóng pop up
    form.reset();
    close();
  }

  return (
    <>
      <Loading visible={responseActionRequest.loading} />
      <ModalConfirmRequest
        opened={opened}
        close={handleCloseModal}
        children={
          <Stack className={classes.stack}>
            <Flex className={classes.flex}>
              <Text className={classes.text1}>{t('approveWithdraw.Amount requested')}:</Text>
              <Text className={classes.text2}>{data?.exchange} USDT</Text>
            </Flex>
            <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
              <TextInput
                label={t('Confirmation.Transaction code received money')}
                withAsterisk
                placeholder={t('approveWithdraw.Please enter transaction code')}
                classNames={{ input: classes.input, label: classes.label }}
                {...form.getInputProps('transfered_order_code')}
                autoFocus
              />

              <FilledButton className={classes.button} type="submit">
                {t('approveWithdraw.Confirm')}
              </FilledButton>
            </form>
          </Stack>
        }
      />
    </>
  );
};

const makeStyles = createStyles(() => ({
  stack: {
    gap: 0,
  },
  flex: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text1: {
    fontSize: 16,
    fontWeight: 700,
    flexShrink: 0,
  },
  text2: {
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--primary-2)',
  },

  button: {
    marginTop: 24,
    height: 45,
    fontSize: '16px !important',
    width: '100%',
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

export default ModalConfirmWithdraw;
