import React from 'react';
import { Collapse, Flex, Group, Stack, Text, createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowDown } from 'assets/icons/arrow/Arr_topBig.svg';
import { useTranslation } from 'react-i18next';

type Props = {
  iconLeft: React.ReactNode;
  label: string;
  submenu: { id: number; label: string; navigate?: string }[];
};

export const CollapseSubmenu = (props: Props) => {
  const [opened, { toggle }] = useDisclosure(false);
  const navigation = useNavigate();
  const { classes } = makeStyles();
  const { t } = useTranslation();

  return (
    <Stack onClick={toggle} className="menu1">
      <Group
        sx={{
          background: opened ? 'var(--primary-5)' : 'white',
        }}
        className="menu1_a"
        noWrap
      >
        <Group className={classes.menu1_s} spacing={6} noWrap px={10}>
          {props.iconLeft}
          <Text className="body_5-medium">{t(props.label)}</Text>
        </Group>
        <Flex
          sx={{
            transform: opened ? 'rotate(0deg) !important' : 'rotate(180deg) !important',
            transition: 'all .2s linear',
          }}
          className={classes.fixARR}
        >
          <ArrowDown />
        </Flex>
      </Group>
      <Collapse in={opened}>
        <Flex className={classes.requestUser}>
          {!!props.submenu.length &&
            props?.submenu?.map(submenu => (
              <Flex key={submenu.id} onClick={() => navigation(submenu?.navigate ?? '')} className="request_1" px={10}>
                <Text>{t(submenu.label)}</Text>
              </Flex>
            ))}
        </Flex>
      </Collapse>
    </Stack>
  );
};

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
