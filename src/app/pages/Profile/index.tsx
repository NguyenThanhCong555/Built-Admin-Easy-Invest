import { Stack, Text, createStyles } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { images } from 'assets/images';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ProfileInformation from './components/ProfileInformation';
import ProfileForm from './components/ProfileForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProfile,
  selectResponseProfile,
} from 'store/slice/profile/selector';
import { profileActions } from 'store/slice/profile';
import ModalSuccess from 'app/components/Modal/ModalSuccess';

export function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classes } = makeStyles();

  const profile = useSelector(selectProfile);
  const response = useSelector(selectResponseProfile);
  const [avatar, setAvatar] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [opened, setOpened] = useState(false);
  const [appear, setAppear] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      phone: profile?.phone_number ?? '',
      name: profile?.name ?? '',
      url: profile?.avatar ?? '',
      create_time: profile?.create_time ?? 0,
    },

    validate: {
      name: value =>
        !value || value.length === 0
          ? t('profile.Nickname cannot be empty !')
          : null,
    },
  });

  useEffect(() => {
    form.setFieldValue('name', profile?.name);
    form.setFieldValue('phone', profile?.phone_number);
    form.setFieldValue('create_time', profile?.create_time);
    form.setFieldValue('url', profile?.avatar);
  }, [profile]);

  function handleUpdateProfile(values) {
    setSubmit(true);
    const payload = {
      name: values.name,
      avatar: values.url,
    };
    dispatch(profileActions.resetResponse());
    dispatch(profileActions.requestUpdateProfile(payload));
  }

  /*
    https://i.ibb.co/2Mx2Vj3/1.png
  https://i.ibb.co/6v32JNt/2.png
  https://i.ibb.co/cQ7QMJw/3.png
  https://i.ibb.co/3T4mnYH/4.png
  https://i.ibb.co/syHSD8b/5.png
  https://i.ibb.co/FgS98Cj/6.png
  https://i.ibb.co/DCq8wD5/7.png
  https://i.ibb.co/bXycMkw/8.png
  https://i.ibb.co/p0VX3BK/9.png
  https://i.ibb.co/F4CN0vC/10.png
  https://i.ibb.co/DbMWG1T/11.png
  https://i.ibb.co/87VPj8V/12.png
  https://i.ibb.co/48NYnng/13.png
  https://i.ibb.co/WkS70tS/14.png
  https://i.ibb.co/fMHcJQw/15.png
  https://i.ibb.co/r2RNfvt/16.png
  https://i.ibb.co/5RK8Tmv/17.png
  https://i.ibb.co/3mZbVMC/18.png
  https://i.ibb.co/HBXS7rP/19.png
  https://i.ibb.co/vvSnDtz/20.png
  https://i.ibb.co/Yhgm0dm/21.png
  https://i.ibb.co/ccPCxtQ/22.png
  https://i.ibb.co/SJNR4FD/23.png
  https://i.ibb.co/w4wbX6g/24.png
  https://i.ibb.co/SQ6hqPh/25.png
  */

  useLayoutEffect(() => {
    if (submit) {
      if (response.error === 0) {
        setAppear(false);
        setOpened(true);
      } else if (response.error === 10) {
        form.setFieldError('name', t('profile.Duplicate nickname'));
      }
    }
  }, [response]);

  useEffect(() => {
    return () => {
      dispatch(profileActions.resetResponse());
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('profile.Profile')}</title>
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>

      <NavContainer laberHeader={t('profile.Profile')} backRole="/home">
        <form
          onSubmit={form.onSubmit(values => handleUpdateProfile(values))}
          className={classes.form}
        >
          <Stack className={classes.stack}>
            <ProfileInformation
              form={form}
              avatar={avatar}
              setAvatar={setAvatar}
              appear={appear}
              setAppear={setAppear}
            />

            <ProfileForm form={form} appear={appear} setAppear={setAppear} />
          </Stack>
        </form>
        <ModalSuccess
          title={t('profile.Successfully edited information')}
          opened={opened}
          setOpened={setOpened}
        />
      </NavContainer>
    </>
  );
}

const makeStyles = createStyles(theme => ({
  form: {
    width: '100%',
  },
  stack: {
    padding: '0 14px 14px 14px',
    '@media (max-width: 768px)': {
      padding: 0,
    },
  },
}));
