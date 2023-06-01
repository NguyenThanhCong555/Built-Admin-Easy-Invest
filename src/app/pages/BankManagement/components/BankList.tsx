import { Stack, createStyles } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledSegment } from './StyledSegment';
import BankItem from './BankItem';
import ModalUpdate from './ModalUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { selectListBank, selectResponseActionBank } from 'store/slice/bank/selector';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import { FilledButton } from 'app/components/Button/FilledButton';
import { bankActions } from 'store/slice/bank';

interface BankListProps {}

const BankList = () => {
  const { t } = useTranslation();
  const { classes } = makeStyles();

  const [value, setValue] = useState<string>('0');
  const [selected, setSelected] = useState<any>(null);
  const [opened, setOpened] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const dispatch = useDispatch();
  const listBank: any = useSelector(selectListBank);
  const responseAction = useSelector(selectResponseActionBank);

  function handleSelectItem(values) {
    setSelected(values);
    setOpened(true);
  }

  function handleSelectLockItem(values) {
    setSelected(values);
    if (values?.status === 1) {
      // Modal up -> mở khóa
      const bank = listBank?.filter((item, _) => item?.banking_name === values?.banking_name && item?.status === 0);
      bank?.length < 1
        ? dispatch(
            bankActions.requestChangeStatus({
              banking_account_id: values?.id,
              status: 0,
            }),
          )
        : setOpenConfirm(true);
    } else {
      // Khóa
      dispatch(
        bankActions.requestChangeStatus({
          banking_account_id: values?.id,
          status: 1,
        }),
      );
    }
  }

  function handleUnlockBank() {
    dispatch(
      bankActions.requestChangeStatus({
        banking_account_id: selected?.id,
        status: 0,
      }),
    );
  }

  useEffect(() => {
    if (responseAction.error === 0) {
      dispatch(bankActions.resetResponseAction());
    }
    if (openConfirm) {
      if (responseAction.error === 0) {
        dispatch(bankActions.resetResponseAction());
        setOpenConfirm(false);
      }
    }
  }, [responseAction.loading]);

  return (
    <Stack>
      <ModalUpdate opened={opened} setOpened={setOpened} selected={selected} />
      <ModalConfirm
        boldTitle={
          selected?.banking_name === 'Binance'
            ? t('bankManagement.Binance account already exists!')
            : t('bankManagement.Bank account already exists!')
        }
        title={
          selected?.banking_name === 'Binance'
            ? t(
                'bankManagement.In order for the account you just created to work, the system will automatically lock the existing Binance account.',
              )
            : t(
                'bankManagement.In order for the account you have just created to work, the system will automatically lock the existing bank account.',
              )
        }
        opened={openConfirm}
        onCloseModal={() => {
          setOpenConfirm(false);
        }}
        btnLeft={
          <OutlineButton h={45} className={classes.buttonModalCancel} onClick={() => setOpenConfirm(false)}>
            {t('bankManagement.Cancel')}
          </OutlineButton>
        }
        btnRight={
          <FilledButton h={45} className={classes.buttonModalAccept} onClick={handleUnlockBank}>
            {t('bankManagement.Accept')}
          </FilledButton>
        }
      />

      <StyledSegment
        defaultValue={value}
        onChange={setValue}
        data={[
          { label: t('bankManagement.Active'), value: '0' },
          { label: t('bankManagement.All'), value: '2' },
        ]}
      />
      {listBank
        .filter((item, _) => {
          if (Number(value) === 2) return item;
          else {
            return item.status === Number(value);
          }
        })
        .map((item, _) => (
          <BankItem key={item.id} data={item} handleSelectItem={handleSelectItem} handleSelectLockItem={handleSelectLockItem} />
        ))}
    </Stack>
  );
};

const makeStyles = createStyles(() => ({
  buttonModalCancel: {
    flex: 1,
  },

  buttonModalAccept: {
    flex: 1,
  },
}));

export default BankList;
