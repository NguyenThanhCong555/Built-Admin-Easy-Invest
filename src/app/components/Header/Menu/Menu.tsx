import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Card, Center, Container, Flex, Group, Stack, Text, createStyles } from '@mantine/core';
import { ReactComponent as CloseIcon } from 'assets/icons/homePage/x.svg';
import { SubtleButton } from '../../Button/SubtleButton';
import { ReactComponent as Logout } from 'assets/icons/header/log-out.svg';
import { authActions } from 'store/slice/auth';
import ModalConfirm from '../../Modal/ModalConfirm';
import { OutlineButton } from '../../Button/OutlineButton';
import { FilledButton } from '../../Button/FilledButton';
import { selectProfile } from 'store/slice/profile/selector';
import { ReactComponent as People1 } from 'assets/images/profilePage/people-3.svg';
import { dataMenu } from '../data';
import { CollapseSubmenu } from '../Collapse';

interface Props {
  showState: [boolean, Dispatch<SetStateAction<boolean>>];
}
const Menu = ({ showState }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(selectProfile);
  const naviage = useNavigate();
  // Local
  const modalRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const { cx, classes } = makeStyles();
  //  State
  const [isShow, toggleShow] = showState;
  const [isLogout, setIsLogout] = useState<boolean>(false);
  // Func
  const handleLogout = () => {
    setIsLogout(false);
    dispatch(authActions.requestLogout());
  };
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        containerRef.current &&
        containerRef.current.contains(event.target)
      ) {
        toggleShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  useEffect(() => {
    toggleShow(false);
  }, [location.pathname]);

  if (!isShow) return null;

  return createPortal(
    <Container fluid className={classes.container} ref={containerRef}>
      <div className={classes.wrapper}>
        <Card className={classes.menu} ref={modalRef}>
          <Flex className={classes.header}>
            <Group
              className={classes.info}
              onClick={() => {
                toggleShow(false);
                navigate('/profile');
              }}
            >
              {profile?.avatar === '' ? (
                <Center className={classes.centerImage}>
                  <People1 width="100%" height="100%" />
                </Center>
              ) : (
                <Avatar src={profile?.avatar} className={classes.avatar} />
              )}
              <div>
                <Text className="body_4-bold" lineClamp={1}>
                  {profile?.name}
                </Text>
                <Text className={cx('small_3-regular', classes.userId)} lineClamp={1}>
                  {profile?.phone_number}
                </Text>
              </div>
            </Group>
            <SubtleButton onClick={() => toggleShow(false)}>
              <CloseIcon />
            </SubtleButton>
          </Flex>
          <Stack className={classes.menuItem}>
            <Stack className={classes.boxMenu}>
              {!!dataMenu.length &&
                dataMenu?.map(menu => {
                  if (!menu.submenu) {
                    return (
                      <Stack key={menu.id} onClick={() => naviage(menu?.navigate ?? '')} className="menu1">
                        <Group spacing={6} noWrap className="menu1_a" px={10}>
                          {menu.iconLeft}
                          <Text className="body_5-medium">{t(menu.label)}</Text>
                        </Group>
                      </Stack>
                    );
                  } else
                    return <CollapseSubmenu key={menu.id} iconLeft={menu.iconLeft} label={menu.label} submenu={menu.submenu} />;
                })}
            </Stack>

            <Flex className={classes.navItem} onClick={() => setIsLogout(true)}>
              <Box ml={-21}></Box>
              <Logout />
              <Text ml={-12} className="body_5-medium">
                {t(`Header.Log out`)}
              </Text>
            </Flex>
          </Stack>
        </Card>
      </div>
      <ModalConfirm
        opened={isLogout}
        onCloseModal={() => setIsLogout(false)}
        btnLeft={
          <OutlineButton className={classes.logoutBtn} onClick={handleLogout}>
            {t('Header.Log out')}
          </OutlineButton>
        }
        btnRight={
          <FilledButton className={classes.logoutBtn} onClick={() => setIsLogout(false)}>
            {t('Header.Cancel')}
          </FilledButton>
        }
        title={t('Header.Are you sure you want to sign out?')}
      />
    </Container>,
    document.body,
  );
};

export default React.memo(Menu);

const makeStyles = createStyles(() => ({
  requestUser: {
    width: '100%',
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'flex-start',
    borderLeft: '1px solid #E9DEFF',
    borderRight: '1px solid #E9DEFF',
    borderBottomLeftRadius: '4px  ',
    transition: 'all .2s linear',
    borderBottomRightRadius: '4px ',
    borderBottom: '1px solid #E9DEFF',
    flexDirection: 'column',
    marginTop: '-16px',
    '.request_1': {
      transition: 'all .2s linear',
      width: '100%',
      ':hover': {
        background: '#976FEA',
      },
      ':nth-of-type(1)': {
        padding: '2px 0px 2px 20px',
        marginTop: '0px',
      },
      ':nth-of-type(2)': {
        padding: '2px 0px 2px 20px',
      },
    },
  },
  fixARR: {
    width: '30px',
    transition: 'all .2s linear',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ':nth-last-of-type(1)': {
      transform: 'rotate(180deg)',
    },
  },
  menu1_s: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  boxMenu: {
    maxWidth: '100%',
    width: '100%',
    marginTop: '10px',
    '.menu1': {
      width: '100%',
      '.menu1_a': {
        width: '100%',
        marginTop: '-10px',
        ':hover': {
          backgroundColor: 'var(--primary-5)',
        },
        height: '46px',
        '.icon_a': {
          margin: '9px 3px 9px 16px',
          width: '23px',
          height: '20px',
        },
      },
    },
  },
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    inset: 0,
    padding: 0,
    zIndex: 98,
  },
  wrapper: {
    maxWidth: 1170,
    margin: '0px auto',
  },
  menu: {
    borderRadius: 0,
    width: '100%',
    maxWidth: 300,
    padding: '0px !important',
  },
  header: {
    height: 72,
    justifyContent: 'space-between',
    padding: '11px 6px 0px 16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
  },
  info: {
    gap: 6,
    flex: 1,
    cursor: 'pointer',
  },
  avatar: {
    width: 42,
    height: 42,
    backgroundColor: 'var(--primary-5)',
    borderRadius: 42,
    overflow: 'hidden',
  },
  userId: {
    color: 'var(--grey)',
  },
  menuItem: {
    gap: 0,
    padding: '10px 6px',
  },
  navItem: {
    gap: 20,
    color: 'var(--black)',
    height: 46,
    width: '100%',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    ':hover': {
      backgroundColor: 'var(--primary-5)',
    },

    '.mantine-1d564l0': {
      marginLeft: '-6px',
    },
  },
  logoutBtn: {
    width: '50%',
    height: 44,
  },
  centerImage: {
    width: 42,
    height: 42,
    backgroundColor: 'var(--primary-5)',
    borderRadius: 42,
    overflow: 'hidden',
    cursor: 'pointer',
  },
}));
