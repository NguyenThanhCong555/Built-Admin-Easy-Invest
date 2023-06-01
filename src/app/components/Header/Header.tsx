import React, { useEffect, useState } from 'react';
import { Avatar, Center, Container, Flex, Group, Text, createStyles } from '@mantine/core';

import { images } from 'assets/images';
import { SubtleButton } from '../Button/SubtleButton';
import { ReactComponent as MenuIcon } from 'assets/icons/homePage/menu.svg';
import { ReactComponent as Bell } from 'assets/icons/homePage/bell.svg';
import Menu from './Menu/Menu';
import { media } from 'styles/media';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCalledProfile } from 'store/slice/profile/selector';
import { profileActions } from 'store/slice/profile';

const Header = () => {
  const { classes } = makeStyles();
  const dispatch = useDispatch();

  // State
  const [isShow, setIsShow] = useState<boolean>(false);
  const nav = useNavigate();

  const calledProfile = useSelector(selectCalledProfile);
  useEffect(() => {
    if (!calledProfile) {
      dispatch(profileActions.requestGetProfile());
    }
  }, []);
  return (
    <Container fluid className={classes.container}>
      <Menu showState={[isShow, setIsShow]} />
      <Flex className={classes.wrapper}>
        <SubtleButton onClick={() => setIsShow(true)}>
          <MenuIcon />
        </SubtleButton>
        <Avatar
          src={images.banner}
          onClick={() => {
            nav('/home');
          }}
          classNames={{
            root: classes.rootAvatar,
            image: classes.imgAvatar,
          }}
        />
        <Group className={classes.notificationWrap}>
          <SubtleButton className={classes.notificationBtn}>
            <Bell />
          </SubtleButton>
          <Center className={classes.quantityWrap}>
            <Text className={classes.quantity}>1</Text>
          </Center>
        </Group>
      </Flex>
    </Container>
  );
};

export default Header;

const makeStyles = createStyles(theme => ({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: 72,
    background: '#FFFFFF',
    padding: 0,
    borderBottom: '1px solid #976FEA',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    [`${media.small()}`]: { '&': { boxShadow: 'none' } },
    zIndex: 97,
  },
  wrapper: {
    width: '100%',
    height: '100%',
    maxWidth: 1170,
    margin: '0px auto',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rootAvatar: {
    width: 165,
    height: '100%',
    cursor: 'pointer',
  },
  imgAvatar: {
    objectFit: 'initial',
  },
  notificationWrap: {
    position: 'relative',
    opacity: 0,
    padding: 10,
  },
  notificationBtn: {
    width: 32,
    height: 32,
    padding: 0,
    borderRadius: '50%',
    backgroundColor: '#EAEAEA !important',
  },
  quantityWrap: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: 'var(--secondary-2)',
    position: 'absolute',
    left: 36,
    top: 18,
  },
  quantity: {
    fontWeight: 600,
    fontSize: 12,
    lineHeight: '14px',
    color: 'var(--white)',
  },
}));
