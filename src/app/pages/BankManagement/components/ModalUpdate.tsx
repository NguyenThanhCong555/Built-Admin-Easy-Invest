import { Box, Group, Modal, Stack, Text, createStyles } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BinanceForm from './BinanceForm';
import { useForm } from '@mantine/form';
import BankForm from './BankForm';
import { FilledButton } from 'app/components/Button/FilledButton';
import { useDispatch, useSelector } from 'react-redux';
import { bankActions } from 'store/slice/bank';
import { selectResponseActionBank } from 'store/slice/bank/selector';

interface ModalUpdateProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  selected: any;
}

const ModalUpdate = ({ opened, setOpened, selected }: ModalUpdateProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();

  const dispatch = useDispatch();
  const responseAction = useSelector(selectResponseActionBank);
  const [submit, setSubmit] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);

  const inputRef = useRef<any>([]);

  const formBinance = useForm({
    initialValues: {
      binance_id: '',
      name: '',
      qr: '',
    },

    validate: {
      binance_id: value => (!value ? t('bankManagement.Please enter binance id') : null),
      name: value => (!value ? t('bankManagement.Please enter the account owner name') : null),
      qr: value => (!value ? t('bankManagement.Please add at least 1 photo') : null),
    },
  });

  const formBank = useForm({
    initialValues: {
      nameBank: '',
      account_number: '',
      name: '',
      qr: '',
    },

    validate: {
      nameBank: value => (!value ? t('bankManagement.Please enter bank name') : null),
      account_number: value => (!value ? t('bankManagement.Please enter your account number') : null),
      name: value => (!value ? t('bankManagement.Please enter the account owner name') : null),
      qr: value => (!value ? t('bankManagement.Please add at least 1 photo') : null),
    },
  });

  useEffect(() => {
    if (selected?.banking_name === 'Binance') {
      formBinance.setFieldValue('binance_id', selected?.account_number);
      formBinance.setFieldValue('name', selected?.account_name);
      formBinance.setFieldValue('qr', selected?.qr_code);
      // qrcode
    } else {
      formBank.setFieldValue('nameBank', selected?.short_name + ',' + selected?.banking_name + ',' + selected?.banking_logo);
      formBank.setFieldValue('name', selected?.account_name);
      formBank.setFieldValue('account_number', selected?.account_number);
      formBank.setFieldValue('qr', selected?.qr_code);
      // qrcode
    }
  }, [selected]);

  function handleSubmitBinance(values) {
    setSubmit(true);

    const payload = {
      id: selected?.id,
      banking_name: selected?.banking_name,
      banking_logo: selected?.banking_logo,
      account_name: values?.name.trim(),
      account_number: values?.binance_id.trim(),
      qr_code: values?.qr.trim(),
    };
    dispatch(bankActions.requestUpdateBank(payload));
  }

  function handleSubmitBank(values) {
    setSubmit(true);

    const payload = {
      id: selected?.id,
      short_name: formBank.values?.nameBank.split(',')[0].trim(),
      banking_name: formBank.values?.nameBank.split(',')[1].trim(),
      banking_logo: formBank.values?.nameBank.split(',')[2].trim(),
      account_name: values?.name.trim(),
      account_number: values?.account_number.trim(),
      qr_code: values?.qr.trim(),
    };
    dispatch(bankActions.requestUpdateBank(payload));
  }

  useEffect(() => {
    if (submit) {
      if (responseAction.error === 0) {
        setOpened(false);
        setSubmit(false);
        dispatch(bankActions.resetResponseAction());
      }

      // Trùng
      if (responseAction.error === 10) {
        setSubmit(false);
        selected?.banking_name === 'Binance'
          ? formBinance.setFieldError('binance_id', t('bankManagement.Duplicate binance ID'))
          : formBank.setFieldError('account_number', t('bankManagement.Duplicate account number'));
        dispatch(bankActions.resetResponseAction());
      }
    }
  }, [responseAction.loading]);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      closeButtonProps={{
        display: 'none',
      }}
      radius={14}
      classNames={{ header: classes.header, body: classes.body }}
    >
      {selected?.banking_name === 'Binance' ? (
        <form className={classes.form} onSubmit={formBinance.onSubmit(values => handleSubmitBinance(values))}>
          <Stack>
            <Text className={classes.title}>Binance</Text>
            <Box p={8}>
              <BinanceForm form={formBinance} setDisable={setDisable} />
            </Box>

            <Group className={classes.group}>
              <FilledButton h={45} className={classes.button} type="submit" disabled={disable}>
                {t('bankManagement.Save')}
              </FilledButton>
            </Group>
          </Stack>
        </form>
      ) : (
        <form className={classes.form} onSubmit={formBank.onSubmit(values => handleSubmitBank(values))}>
          <Stack>
            <Text className={classes.title}> {t('bankManagement.Bank')}</Text>
            <Box p={8}>
              <BankForm form={formBank} inputRef={inputRef} setDisable={setDisable} />
            </Box>
            <Group className={classes.group}>
              <FilledButton h={45} className={classes.button} type="submit" disabled={disable}>
                {t('bankManagement.Save')}
              </FilledButton>
            </Group>
          </Stack>
        </form>
      )}
    </Modal>
  );
};

const makeStyles = createStyles(() => ({
  body: {
    padding: 0,
  },
  header: {
    display: 'none',
  },

  group: {
    width: '100%',
    backgroundColor: 'var(--light)',
    padding: 12,
  },
  form: {
    // padding: 8,
  },
  title: {
    fontSize: 20,
    color: 'var(--primary-2)',
    fontWeight: 700,
    textAlign: 'center',
    marginTop: 12,
  },

  button: {
    fontSize: '16px !important',
    flex: 1,
  },
}));

export default ModalUpdate;
