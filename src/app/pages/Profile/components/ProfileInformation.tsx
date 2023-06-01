import React from 'react';
import { UseFormReturnType } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import {
  Center,
  Divider,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  createStyles,
} from '@mantine/core';
import { ReactComponent as Camera } from 'assets/images/profilePage/camera-plus.svg';
import { ReactComponent as People1 } from 'assets/images/profilePage/people-3.svg';
import { configDate } from 'utils/helpers/configDate';

interface ProfileInformationProps {
  form: UseFormReturnType<any>;
  appear: boolean;
  setAppear: React.Dispatch<React.SetStateAction<boolean>>;
  avatar: any;
  setAvatar: any;
}

const ProfileInformation = ({
  form,
  appear,
  setAppear,
  avatar,
  setAvatar,
}: ProfileInformationProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  return (
    <Stack className={classes.stack}>
      <Center>
        <Group className={classes.group}>
          <Center className={classes.centerImage}>
            {avatar ? (
              avatar
            ) : form.values.url === '' ? (
              <People1 width="100%" height="100%" />
            ) : (
              <Image
                src={form.values.url}
                classNames={{ image: classes.image }}
              />
            )}
          </Center>

          <Center className={classes.centerIcon}>
            <Camera />
          </Center>
        </Group>
      </Center>

      <Stack className={classes.stackInfo}>
        <Flex className={classes.flexInfo}>
          <Text className={classes.title}>{t('profile.Phone Number')}:</Text>
          <Text className={classes.text}>{form.values.phone}</Text>
        </Flex>

        <Flex className={classes.flexInfo}>
          <Text className={classes.title}>{t('profile.Date created')}:</Text>
          <Text className={classes.text}>
            {configDate(form.values.create_time)}
          </Text>
        </Flex>
      </Stack>

      <Divider className={classes.divider} color="var(--primary-5)" />
    </Stack>
  );
};

const makeStyles = createStyles(() => ({
  stack: {
    marginTop: 42,
  },

  group: {
    position: 'relative',
  },
  centerImage: {
    width: 158,
    height: 158,
    backgroundColor: 'var(--primary-5)',
    borderRadius: 158,
    overflow: 'hidden',
    cursor: 'pointer',
  },
  centerIcon: {
    position: 'absolute',
    border: '1px solid #E9DEFF',
    width: 40,
    height: 40,
    overflow: 'hidden',
    borderRadius: 41,
    backgroundColor: '#fff',
    top: 'calc(50% - 40px/2 + 62.17px)',
    left: 'calc(50% - 40px/2 + 44.33px)',
    cursor: 'pointer',
  },

  title: {
    fontWeight: 400,
    fontSize: 14,
    color: 'var(--grey-dark)',
  },
  text: {
    fontWeight: 700,
    fontSize: 16,
  },

  stackInfo: {
    backgroundColor: 'var(--white-light)',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    padding: '14px 12px',
    gap: 5,
  },
  flexInfo: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  divider: {
    marginTop: 15,
  },

  image: {},
}));

export default ProfileInformation;
