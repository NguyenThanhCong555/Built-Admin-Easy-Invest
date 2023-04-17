import {
  Box,
  Divider,
  Flex,
  Text,
  TextInput,
  createStyles,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { BoxLabel } from 'app/__tests__/Box/BoxLabel';
import { FilledButton } from 'app/components/Button/FilledButton';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router';
import { selectProject } from 'store/slice/projects/selectors';
import { media } from 'styles/media';
import { formatCoinUS } from 'utils/helpers/formatCoinUs';
import { projectsActions } from 'store/slice/projects';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
interface InPropsStyle {}

export interface IPayloadCreateCoin {
  coin_id?: string;
  project_id?: string;
  coin_name?: string;
  coin_avatar?: string;
  rate_usdt_coin?: string;
  min_transfer?: string;
}

export type FormInput = {
  coin_id?: string;
  project_id?: string;
  coin_name?: string;
  coin_avatar?: string;
  rate_usdt_coin?: string;
  min_transfer?: string;
};

export const ChangeInfoCoin = () => {
  const { t } = useTranslation();
  const nav = useNavigate();
  const data = useSelector(selectProject);
  const dispatch = useDispatch();
  const params = useParams();

  const form = useForm({
    initialValues: {
      project_id: '',
      coin_name: '',
      coin_avatar: '',
      rate_usdt_coin: '',
      min_transfer: '',
    },
  });

  const { classes: c } = createStyle2({});

  const handleAddEndEditValue = (values: FormInput) => {
    const payload: IPayloadCreateCoin = {
      coin_id: values.coin_id,
      project_id: params.projectId,
      coin_name: values.coin_name,
      coin_avatar: values.coin_avatar,
      rate_usdt_coin: values.rate_usdt_coin,
      min_transfer: values.min_transfer,
    };

    if (!data.coinInfo) {
      nav(`/add-Infocoin/${params.projectId}`);
    } else {
      nav(`/edit-Infocoin/${params.projectId}`);
    }
  };

  return (
    <BoxLabel
      frontSize="20px"
      frontW={700}
      background="var(--primary-2)"
      label={`${t('projectDetail.Coin information')}`}
    >
      <form
        style={{
          width: '100%',
        }}
        encType="multipart/form-data"
        onSubmit={form.onSubmit(values => handleAddEndEditValue(values))}
      >
        <Flex className={c.editform}>
          <Flex className="formTop">
            <Text className="topText1">
              {t('projectDetail.Enter coin name')}
            </Text>
            <TextInput
              className="topIp1"
              disabled
              placeholder={data.coinInfo?.coin_name}
              {...form.getInputProps('coin_name')}
            />
          </Flex>
          <Divider
            sx={{
              border: '0.1px solid #ccc8c8',
              width: '95%',
              color: '#BFBFBF',
              marginTop: '8px',
              marginBottom: '8px',
            }}
          />
          <Flex className="formBottom">
            <Text className="bottomText2">
              {t('projectDetail.USDT/COIN Rate')}
            </Text>
            <TextInput
              className="bottomIp2"
              disabled
              placeholder={formatCoinUS(data.coinInfo?.rate_usdt_coin)}
              {...form.getInputProps('rate_usdt_coin')}
            />
          </Flex>
          <Box className="fixbottom">
            <FilledButton
              type="submit"
              mb={5}
              mt={2}
              w={135}
              h={36}
              fz={16}
              fw={700}
            >
              {!data.coinInfo
                ? t('projectDetail.Add')
                : t('projectDetail.Edit')}
            </FilledButton>
          </Box>
        </Flex>
      </form>
    </BoxLabel>
  );
};

const createStyle2 = createStyles((theme, params: InPropsStyle) => ({
  ChangeInfoCoin: {
    maxWidth: '570px',
    width: '100%',
    height: '226px',
  },

  editform: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '0px',

    '.fixbottom': {
      '.mantine-1lkt194': {
        marginBottom: '0px',
      },
    },
    '.formTop': {
      maxWidth: '100%',
      height: 'fit-content',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      '.topText1': {
        marginLeft: '12px',
      },
      '.topIp1': {
        margin: '12px',
        maxWidth: '258px',
        height: '44px',
        '.mantine-g9emdi': {
          border: '1px solid #D6D6D6',
          width: '258px',
          height: 44,
          transition: 'all 1s linear',
          background: 'white',
          [`${media.small()}`]: {
            '&': {
              maxWidth: '170px',
              width: '100%',
              height: '44px',
            },
          },
          '::placeholder': {
            color: 'var(--black)',
            fontSize: 16,
            fontWeight: 500,
          },
        },
      },
    },
    '.formBottom': {
      maxWidth: '100%',
      height: 'fit-content',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      '.bottomText2': {
        marginLeft: '12px',
      },
      '.bottomIp2': {
        margin: '12px',
        maxWidth: '258px',
        height: '44px',
        '.mantine-g9emdi': {
          border: '1px solid #D6D6D6',
          width: '258px',
          background: 'white',
          height: 44,
          transition: 'all 1s linear',
          [`${media.small()}`]: {
            '&': {
              maxWidth: '170px',
              width: '100%',
              height: '44px',
            },
          },
          '::placeholder': {
            color: 'var(--black)',
            fontSize: 16,
            fontWeight: 500,
          },
        },
      },
    },
  },
}));
