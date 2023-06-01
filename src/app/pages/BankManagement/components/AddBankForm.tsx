import React, { useEffect, useRef, useState } from 'react';
import { Divider, Stack, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { StyledSegment } from './StyledSegment';
import BankForm from './BankForm';
import BinanceForm from './BinanceForm';
import { FilledButton } from 'app/components/Button/FilledButton';
import { Variants, motion } from 'framer-motion';
import { useForm } from '@mantine/form';
import ModalSuccess from 'app/components/Modal/ModalSuccess';
import { useDispatch, useSelector } from 'react-redux';
import { bankActions } from 'store/slice/bank';
import { selectResponseActionBank } from 'store/slice/bank/selector';
import Loading from 'app/components/Loading/Loading';

interface AddBankFormProps {}

const stackFormVariants: Variants = {
  hidden: {
    height: '0px',
    opacity: 0,
    display: 'none',
  },
  visible: {
    height: 'auto',
    display: 'block',

    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
const AddBankForm = ({}: AddBankFormProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();

  const [value, setValue] = useState<string>('0');
  const [isShow, setShow] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);

  const dispatch = useDispatch();

  const [submit, setSubmit] = useState<boolean>(false);
  const responseAction = useSelector(selectResponseActionBank);
  const [disable, setDisable] = useState<boolean>(false);

  const inputRef = useRef<any>([]);

  function handleSetShow() {
    if (isShow) {
      if (value === '0') {
        const { hasErrors } = formBinance.validate();
        if (hasErrors) {
          return;
        } else {
          setSubmit(true);
          const payload = {
            banking_name: 'Binance',
            short_name: 'Binance',
            banking_logo:
              'https://play-lh.googleusercontent.com/C3CpyPtocz_jypT6mEIuSEuQNy0_lSaA0fH05zuj079K38A1lY4XDdCC9N-2dVqGjc_X=w240-h480-rw',
            account_name: formBinance.values?.name.trim(),
            account_number: formBinance.values?.binance_id.trim(),
            qr_code: formBinance.values?.qr.trim(),
            type: 0,
          };

          dispatch(bankActions.requestAddNewBank(payload));
        }
      } else {
        const { hasErrors, errors } = formBank.validate();
        const list = Object.keys(errors);

        for (var i = 0; i < inputRef.current.length; i++) {
          if (inputRef.current[i].getAttribute('data-label') === list[0]) {
            // Bị lỗi khi focus Select của Mantine
            if (inputRef.current[i].getAttribute('data-label') === 'nameBank') {
              setTimeout(() => {
                inputRef.current[0].focus();
              }, 300);
            } else {
              inputRef.current[i].focus();
            }
            break;
          }
        }

        if (hasErrors) {
          return;
        } else {
          setSubmit(true);
          // Tách logo và name ra khỏi trường nameBank
          // 0 - shortname, 1 - banking_name, 2 - image
          const payload = {
            short_name: formBank.values?.nameBank.split(',')[0].trim(),
            banking_name: formBank.values?.nameBank.split(',')[1].trim(),
            banking_logo: formBank.values?.nameBank.split(',')[2].trim(),
            account_name: formBank.values?.name.trim(),
            account_number: formBank.values?.account_number.trim(),
            qr_code: formBank.values?.qr.trim(),
            type: 1,
          };

          dispatch(bankActions.requestAddNewBank(payload));
        }
      }

      return;
    }
    setShow(true);
  }

  const formBinance = useForm({
    initialValues: {
      binance_id: '',
      name: '',
      qr: '',
    },

    validate: {
      binance_id: value => (!value.trim() ? t('bankManagement.Please enter binance id') : null),
      qr: value => (!value.trim() ? t('bankManagement.Please add at least 1 photo') : null),
    },
  });

  const formBank = useForm({
    initialValues: {
      nameBank: '',
      account_number: '',
      name: '',
      banking_logo: '',
      qr: '',
    },

    validate: {
      nameBank: value => (!value.trim() ? t('bankManagement.Please enter bank name') : null),
      account_number: value => (!value.trim() ? t('bankManagement.Please enter your account number') : null),
      name: value => (!value.trim() ? t('bankManagement.Please enter the account owner name') : null),
      qr: value => (!value ? t('bankManagement.Please add at least 1 photo') : null),
    },
  });

  useEffect(() => {
    if (submit) {
      // 0 - success, 10 - đã tồn tại account_number
      if (responseAction.error === 0) {
        setOpened(true);
        setSubmit(false);

        value === '1' ? formBank.reset() : formBinance.reset();
        dispatch(bankActions.resetResponseAction());
      }

      if (responseAction.error === 10) {
        setSubmit(false);
        value === '1'
          ? formBank.setFieldError('account_number', t('bankManagement.Duplicate account number'))
          : formBinance.setFieldError('binance_id', t('bankManagement.Duplicate binance ID'));
        dispatch(bankActions.resetResponseAction());
      }
    }
  }, [responseAction.loading]);

  return (
    <>
      <Loading visible={responseAction.loading} />
      <Stack className={classes.stack}>
        <motion.div initial={false} animate={isShow ? 'visible' : 'hidden'} variants={stackFormVariants}>
          <StyledSegment
            defaultValue={value}
            onChange={setValue}
            data={[
              { label: 'Binance', value: '0' },
              { label: t('bankManagement.Bank'), value: '1' },
            ]}
          />
          {value === '0' ? (
            <form className={classes.form}>
              <BinanceForm form={formBinance} setDisable={setDisable} />
            </form>
          ) : (
            <form className={classes.form}>
              <BankForm form={formBank} inputRef={inputRef} setDisable={setDisable} />
            </form>
          )}
        </motion.div>

        <FilledButton h={45} className={classes.button} type="submit" onClick={handleSetShow} disabled={disable}>
          {t('bankManagement.Add')}
        </FilledButton>

        <Divider color="var(--primary-1)" />
      </Stack>

      <ModalSuccess title={t('bankManagement.Successfully added account')} opened={opened} setOpened={setOpened} />
    </>
  );
};

const makeStyles = createStyles(() => ({
  stack: {
    width: '100%',
  },

  button: {
    fontSize: '16px !important',
  },

  buttonModalCancel: {
    flex: 1,
  },

  buttonModalAccept: {
    flex: 1,
  },
  form: {
    marginTop: 18,
  },
}));

export default AddBankForm;
