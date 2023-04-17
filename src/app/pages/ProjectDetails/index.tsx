import {
  Center,
  Divider,
  Flex,
  Image,
  LoadingOverlay,
  Modal,
  Text,
  createStyles,
} from '@mantine/core';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { images } from 'assets/images';
import React, { useLayoutEffect, useState } from 'react';
import { ReactComponent as XCircle } from 'assets/icons/modal/x-circle.svg';
import { ReactComponent as UsdtCoin } from 'assets/icons/coin/usdt.svg';
import { FilledButton } from 'app/components/Button/FilledButton';
import { ChangeInfoCoin } from './ChangeInfoCoin';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { projectsActions } from 'store/slice/projects';
import { selectProject, selectResponse } from 'store/slice/projects/selectors';
import { formatCoinUS } from 'utils/helpers/formatCoinUs';
import { configDate } from 'utils/helpers/configDate';
import Loading from 'app/components/Loading/Loading';
import { useDisclosure } from '@mantine/hooks';
import { conFigE8 } from 'app/components/Maths/conFig-E8';
import { useTranslation } from 'react-i18next';
interface propsStyle {
  viewMobile: any;
}
interface InPropsStyle {}

const ContentDetail = () => {
  const { t } = useTranslation();
  const data = useSelector(selectProject);
  return (
    <Flex className="contentDetail">
      <Flex className="totalInfo">
        <Flex
          className="AvatarProject"
          sx={{ backgroundImage: `url(${data.avatar})` }}
        ></Flex>
        <Flex className="InfoProject">
          <Flex className="InfoTop">
            <Text className="text1" lineClamp={1}>
              {data.name}
            </Text>
            <Text className="text2" lineClamp={1}>
              {data.author.name}
            </Text>
          </Flex>
          <Flex className="InfoBottom">
            <Flex className="TextTop">
              <Text className="text3">{t('projectDetail.Date created')}</Text>
              <Text className="text3">{configDate(data.create_time)}</Text>
            </Flex>
            <Flex className="TextBottom">
              <Text className="text3">{t('projectDetail.Update day')}</Text>
              <Text className="text3">{configDate(data.update_time)}</Text>
            </Flex>
            <Outlet></Outlet>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const InfoStakeCoin = () => {
  const { classes: c } = createStyleProps({});
  const { t } = useTranslation();
  const data = useSelector(selectProject);

  return (
    <Flex className={c.InfoStakeCoin}>
      <Flex className="StakeTop">
        <Flex className="left">
          <Text className="text4">{t('projectDetail.Staking')}</Text>
        </Flex>
        <Flex className="right">
          <Text className="text4">{t('projectDetail.Coin Machine')}</Text>
        </Flex>
      </Flex>
      <Flex className="StakeBottom">
        <Flex className="left">
          <Text className="text4">{formatCoinUS(data.staking)}</Text>
          <UsdtCoin></UsdtCoin>
        </Flex>
        <Flex className="right">
          <Text className="text4">0</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

// MAIN
export const ProjectDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { classes: c } = createStyleProps({});
  const data = useSelector(selectProject);
  const params = useParams();
  const selector = useSelector(selectResponse);
  const [opened, { open, close }] = useDisclosure(false);

  const [checkStateLock, setCheckStateLock] = useState(
    data.state === 0 ? false : data.state === 1 ? true : false,
  );
  useLayoutEffect(() => {
    dispatch(projectsActions.requestProjectInfo({ userid: params.projectId }));
    setCheckStateLock(
      data.state === 0 ? false : data.state === 1 ? true : false,
    );
  }, [data.state, checkStateLock]);

  // khoá project
  const lockProject = () => {
    // console.log(data, 'this is data');
    open();
  };

  const onlockPopup = () => {
    setCheckStateLock(!checkStateLock);
    dispatch(
      projectsActions.requestLockproject({
        projectId: params.projectId,
        isLock: checkStateLock ? 0 : 1,
      }),
    );
    dispatch(projectsActions.requestProjectInfo({ userid: params.projectId }));
    close();
  };
  const onCancelPopup = () => {
    close();
  };
  return (
    <>
      <Loading visible={selector.loading} />
      <Center className={c.boxDetail}>
        <NavContainer
          backRole="/home"
          laberHeader={t('projectDetail.Coin information')}
        >
          <Flex className={c.box}>
            <ContentDetail></ContentDetail>
            <InfoStakeCoin></InfoStakeCoin>
            <Divider
              sx={{
                border: '1px solid var(--primary-1)',
                maxWidth: '570px',
                width: '100%',
                marginTop: '18px',
                marginBottom: '18px',
              }}
            />
            <ChangeInfoCoin></ChangeInfoCoin>
            <FilledButton
              maw={570}
              w={'100%'}
              h={46}
              mt={12}
              fz={16}
              fw={700}
              onClick={() => navigate(`/edit/${params.projectId}`)}
            >
              {t('projectDetail.Basic information')}
            </FilledButton>
            <FilledButton
              mt={8}
              mb={8}
              maw={570}
              w={'100%'}
              h={46}
              fz={16}
              fw={700}
              onClick={() => navigate(`/stacking/${params.projectId}`)}
            >
              {t('projectDetail.Staking')}
            </FilledButton>
            <FilledButton maw={570} w={'100%'} h={46} fz={16} fw={700}>
              {t('projectDetail.Coin Mining Machine')}
            </FilledButton>
            <FilledButton
              onClick={lockProject}
              mt={24}
              maw={570}
              w={'100%'}
              h={46}
              fz={16}
              fw={700}
              sx={{
                background: `var(--${
                  data.state === 1 ? 'secondary-2' : 'white'
                }) !important`,
                border: '1px solid var(--secondary-2)',
                '.mantine-1ryt1ht': {
                  color: `var(--${
                    data.state === 1 ? 'white' : 'secondary-2'
                  }) !important`,
                },
              }}
            >
              {data.state === 0
                ? t('projectDetail.Project Lock')
                : t('projectDetail.Release')}
            </FilledButton>
            <Modal
              className={c.fixModal}
              centered
              opened={opened}
              onClose={close}
              closeButtonProps={{
                children: <XCircle />,
              }}
            >
              {/* Modal content */}
              <Text
                sx={{
                  textAlign: 'center',
                  marginBottom: '25px',
                  fontSize: '18px',
                  fontWeight: 400,
                }}
              >
                {t('projectDetail.Are you sure you want')}
                {data.state === 0
                  ? t('projectDetail.Project Locks')
                  : t('projectDetail.Release')}
                {t('projectDetail.this project?')}
              </Text>
              <Flex>
                <FilledButton
                  onClick={() => onlockPopup()}
                  sx={{
                    color: 'var(--secondary-2)',
                    maxWidth: '257px',
                    width: '100%',
                    height: '44px',
                    border: '1.5px solid var(--secondary-2)',
                    background: 'white !important',
                    borderRadius: '8px',
                    marginRight: '10px',
                    fontSize: '16px',
                    fontWeight: 700,
                  }}
                >
                  {data.state === 0
                    ? t('projectDetail.Project Locks')
                    : t('projectDetail.Release')}
                </FilledButton>
                <FilledButton
                  onClick={() => onCancelPopup()}
                  sx={{
                    color: 'white',
                    maxWidth: '257px',
                    width: '100%',
                    height: '44px',
                    background: 'var(--primary-1) !important',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 700,
                  }}
                >
                  {t('projectDetail.Cancel')}
                </FilledButton>
              </Flex>
            </Modal>
          </Flex>
        </NavContainer>
      </Center>
    </>
  );
};

const createStyleProps = createStyles((theme, params: InPropsStyle) => ({
  box: {
    maxWidth: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  boxDetail: {
    width: '100%',
    alignItems: 'flex-start',

    '.contentDetail': {
      minWidth: '100%',
      width: '100%',
      justifyContent: 'center',

      '.totalInfo': {
        maxWidth: '570px',
        width: '100%',
        height: '124px',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px #00000026',
        marginBottom: '12px',
        border: '1px solid var(--grey-light)',
        alignItems: 'center',

        '.AvatarProject': {
          maxWidth: '108px',
          width: '100%',
          height: '108px',
          objectFit: 'cover',
          margin: '8px',
          borderRadius: '14px',
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          border: '.5px solid #e9e6e6',
        },
        '.InfoProject': {
          maxWidth: '100%',
          width: '100%',
          height: '110px',
          marginRight: '8px',
          flexDirection: 'column',
          justifyContent: 'space-between',

          '.InfoTop': {
            flexDirection: 'column',
            height: 'fit-content',
            '.text1': {
              fontSize: '20px',
              lineHeight: 1.2,
              fontWeight: 700,
            },
            '.text2': {
              fontSize: '12px',
              fontWeight: 400,
              color: '#000000',
            },
          },

          '.InfoBottom': {
            height: 'fit-content',
            flexDirection: 'column',
            width: '100%',
            '.TextTop': {
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            '.TextBottom': {
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            '.text3': {
              fontSize: 12,
              fontWeight: 400,
              color: 'var(--grey-dark)',
            },
          },
        },
      },
    },
  },
  InfoStakeCoin: {
    maxWidth: '570px',
    width: '100%',
    height: '94px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '14px',
    overflow: 'hidden',
    boxShadow: '0px 2px 4px #00000026',

    '.StakeTop': {
      height: '46px',
      width: '100%',

      '.left': {
        width: '50%',
        height: '100%',
        background: 'var(--primary-2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: '.5px solid white',

        '.text4': {
          fontSize: 20,
          fontWeight: 700,
          color: 'white',
        },
      },

      '.right': {
        width: '50%',
        height: '100%',
        background: 'var(--primary-2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeft: '.5px solid white',

        '.text4': {
          fontSize: 20,
          fontWeight: 700,
          color: 'white',
        },
      },
    },
    '.StakeBottom': {
      height: 'calc(94px - 46px)',
      width: '100%',

      '.left': {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: '.5px solid var(--primary-2)',

        '.text4': {
          fontSize: 16,
          marginRight: '6px',
          fontWeight: 700,
          marginBottom: '3px',
          color: 'var(--primary-2)',
        },
      },

      '.right': {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeft: '.5px solid var(--primary-2)',

        '.text4': {
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--primary-2)',
        },
      },
    },
  },
  fixModal: {},
}));
