import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Card,
  Container,
  Flex,
  Group,
  Stack,
  Text,
  createStyles,
} from '@mantine/core';

import { ReactComponent as CloseIcon } from 'assets/icons/homePage/x.svg';
import { selectAuth } from 'store/slice/auth/selectors';
import { SubtleButton } from '../Button/SubtleButton';
import { navArray } from 'utils/arrays/navArray';
import { images } from 'assets/images';
import { ReactComponent as Logout } from 'assets/icons/header/log-out.svg';
import { authActions } from 'store/slice/auth';
import ModalConfirm from '../Modal/ModalConfirm';
import { OutlineButton } from '../Button/OutlineButton';
import { FilledButton } from '../Button/FilledButton';
interface Props {
  showState: [boolean, Dispatch<SetStateAction<boolean>>];
}
const Menu = ({ showState }: Props) => {
  const dispatch = useDispatch();
  const { username } = useSelector(selectAuth);
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

  if (!isShow) return null;
  return createPortal(
    <Container fluid className={classes.container} ref={containerRef}>
      <div className={classes.wrapper}>
        <Card className={classes.menu} ref={modalRef}>
          <Flex className={classes.header}>
            <Group className={classes.info}>
              <Avatar src={images.avatar} className={classes.avatar} />
              <div>
                <Text className="body_4-bold">{username}</Text>
                <Text className={cx('small_3-regular', classes.userId)}>
                  @NAThu
                </Text>
              </div>
            </Group>
            <SubtleButton onClick={() => toggleShow(false)}>
              <CloseIcon />
            </SubtleButton>
          </Flex>
          <Stack className={classes.menuItem}>
            {navArray.map((nav, index) => (
              <NavLink
                key={index}
                to={nav.navigate}
                className={classes.navItem}
              >
                {nav.icon}
                <Text className="body_5-medium">{t(`Header.${nav.name}`)}</Text>
              </NavLink>
            ))}
            <Flex className={classes.navItem} onClick={() => setIsLogout(true)}>
              <Logout />
              <Text className="body_5-medium">{t(`Header.Log out`)}</Text>
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
          <FilledButton
            className={classes.logoutBtn}
            onClick={() => setIsLogout(false)}
          >
            {t('Header.Cancel')}
          </FilledButton>
        }
        title={t('Header.Are you sure you want to sign out?')}
      />
    </Container>,
    document.body,
  );
};

export default Menu;

const makeStyles = createStyles(() => ({
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
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
    borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
  },
  info: {
    gap: 6,
    flex: 1,
  },
  avatar: {
    width: 42,
    height: 42,
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
  },
  logoutBtn: {
    width: '50%',
    height: 44,
  },
}));
