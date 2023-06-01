import React, { useEffect, useState } from 'react';
import { Stack, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import AddBankForm from './components/AddBankForm';
import BankList from './components/BankList';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { useDispatch, useSelector } from 'react-redux';
import { bankActions } from 'store/slice/bank';
import { selectCalledListBank, selectListBank, selectResponseActionBank, selectResponseBank } from 'store/slice/bank/selector';
import Loading from 'app/components/Loading/Loading';
import { Helmet } from 'react-helmet-async';
import { images } from 'assets/images';

interface BankManagementProps {}

export function BankManagement({}: BankManagementProps) {
  const { t } = useTranslation();
  const { classes } = makeStyles();

  const dispatch = useDispatch();
  const response = useSelector(selectResponseBank);
  const calledListBank = useSelector(selectCalledListBank);

  const responseAction = useSelector(selectResponseActionBank);

  useEffect(() => {
    if (!calledListBank) dispatch(bankActions.requestGetListBank());
  }, [calledListBank]);

  return (
    <>
      <Helmet>
        <title>{t('bankManagement.Bank management')}</title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Loading visible={response.loading} />
      <NavContainer isbackpage={true} laberHeader={t('bankManagement.Account information')}>
        <Stack className={classes.stack}>
          <AddBankForm />
          <BankList />
        </Stack>
      </NavContainer>
    </>
  );
}

const makeStyles = createStyles(() => ({
  stack: {
    width: '100%',
  },
}));
