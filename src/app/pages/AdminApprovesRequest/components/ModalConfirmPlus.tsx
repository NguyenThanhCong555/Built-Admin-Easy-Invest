import { Box, Flex, Stack, Text, createStyles } from '@mantine/core';
import { FilledButton } from 'app/components/Button/FilledButton';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { requestActions } from 'store/slice/request';

export interface ImodalConfirmPlus {
  close?: any;
  idProject?: any;
}

export const ModalConfirmPlus = (props: ImodalConfirmPlus) => {
  const { t } = useTranslation();
  const { classes: c } = makeStyles();
  const dispatch = useDispatch();
  console.log(props?.idProject?.id);
  console.log(props?.idProject?.service);
  const handleUpdateProfile = () => {
    const payload = {
      request_id: props?.idProject?.id,
      service: props?.idProject?.service,
    };
    dispatch(requestActions.requestAcceptAdditionRequest(payload));
    setTimeout(() => {
      props.close(true);
    }, 200);
  };

  return (
    <Stack className={c.contain}>
      <Flex className="boxSUb">
        <Text fz={16} fw={700} color="black">
          {t('approveWithdraw.Amount requested')}
        </Text>
        <Text fz={16} fw={700} color="var(--primary-2)">
          {props?.idProject?.exchange} USDT
        </Text>
      </Flex>
      <Text lh={0.9} fz={16} fw={700} color="black">
        {t('approveWithdraw.User account receives money')}
      </Text>
      <Flex className="boxAvatar">
        <Flex
          sx={{
            background: '#E9DEFF',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            overflow: 'hidden',
            marginRight: '10px',
            width: '50px',
            height: '50px',
          }}
        >
          <Flex
            className={c.avatar}
            sx={{
              backgroundSize: '50px',
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url(${props.idProject.avt})`,
              backgroundPosition: 'center',
            }}
          ></Flex>
        </Flex>
        <Box className={c.info}>
          <Text fz={14} fw={700} color="black">
            Nickname - {props?.idProject?.name}
          </Text>
          <Text fz={12} fw={700} color="black">
            {t('approveWithdraw.Phone number')} - {props?.idProject.phone}
          </Text>
        </Box>
      </Flex>
      <FilledButton onClick={handleUpdateProfile} mt={6}>
        {t('approveWithdraw.Confirm')}
      </FilledButton>
    </Stack>
  );
};
const makeStyles = createStyles(() => ({
  contain: {
    width: '100%',
    '.boxSUb': {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    '.boxAvatar': {
      width: '100%',
      height: '50px',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  },
  avatar: { width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', boxSizing: 'border-box' },
  info: {
    alignItems: 'flex-start',
  },
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
}));
