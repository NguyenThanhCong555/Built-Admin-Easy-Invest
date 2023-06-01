import { Flex, Image, Stack, Text, createStyles } from '@mantine/core';
import { FilledButton } from 'app/components/Button/FilledButton';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface BankItemProps {
  data: any;
  handleSelectItem: (values: any) => void;
  handleSelectLockItem: (values: any) => void;
}

const BankItem = ({ data, handleSelectItem, handleSelectLockItem }: BankItemProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  return (
    <Flex
      className={classes.flex}
      sx={{
        backgroundColor: data?.status === 1 ? 'var(--grey-light)' : '#fff',
      }}
    >
      <Image
        src={data?.banking_logo}
        width={100}
        height={100}
        radius={8}
        fit="contain"
        classNames={{ figure: classes.figureImage }}
      />
      <Stack className={classes.stack}>
        <Text className={classes.nameBank}>{data?.short_name}</Text>
        {data?.banking_name === 'Binance' ? (
          <>
            {data?.account_name !== '' && <Text className={classes.accountName}>Nickname - {data?.account_name}</Text>}
            <Text className={classes.accountName}>ID - {data?.account_number}</Text>
          </>
        ) : (
          <>
            <Text className={classes.accountName}>{data?.account_name}</Text>
            <Text className={classes.accountName}>{data?.account_number}</Text>
          </>
        )}

        <Flex>
          {data?.status === 0 ? (
            <FilledButton className={`${classes.button} ${classes.buttonLock}`} onClick={() => handleSelectLockItem(data)}>
              {t('bankManagement.Lock')}
            </FilledButton>
          ) : (
            <FilledButton className={`${classes.button} ${classes.buttonUnlock}`} onClick={() => handleSelectLockItem(data)}>
              {t('bankManagement.Unlock')}
            </FilledButton>
          )}

          <FilledButton className={`${classes.button}`} onClick={() => handleSelectItem(data)}>
            {t('bankManagement.Update')}
          </FilledButton>
        </Flex>
      </Stack>
    </Flex>
  );
};

const makeStyles = createStyles(() => ({
  flex: {
    padding: 8,
    borderRadius: 8,
    border: '1px solid var(--grey-light)',
  },

  stack: {
    flex: 1,
    marginLeft: 10,
    gap: 0,
    justifyContent: 'space-between',
  },

  nameBank: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
  },
  name: {
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '18px',
  },
  accountName: {
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '16px',
  },

  button: {
    flex: 1,
    fontSize: '16px !important',

    ':first-of-type': {
      marginRight: 10,
    },
  },

  buttonLock: {
    color: 'var(--secondary-2)',
    border: '1.5px solid var(--secondary-2)',
    background: 'white !important',
  },

  buttonUnlock: {
    background: 'var(--secondary-2) !important',
  },

  figureImage: {
    backgroundColor: '#fff',
    borderRadius: 8,
    border: '1px solid var(--grey-light)',
  },
}));

export default BankItem;
