import React from 'react';
import { Group, Select, Stack, TextInput, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { UseFormReturnType } from '@mantine/form';
import { FilledButton } from 'app/components/Button/FilledButton';
import { variable } from 'styles/variable';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/slice/auth/selectors';

import { ReactComponent as VN } from 'assets/icons/loginPage/vn-lang.svg';
import { ReactComponent as EN } from 'assets/icons/loginPage/en-lang.svg';
import { ReactComponent as CaretDown } from 'assets/icons/homePage/caret-down.svg';
import { authActions } from 'store/slice/auth';

interface ProfileFormProps {
  form: UseFormReturnType<any>;
  appear: boolean;
  setAppear: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileForm = ({ form, appear, setAppear }: ProfileFormProps) => {
  const { t, i18n } = useTranslation();
  const { classes } = makeStyles({ appear: appear });
  const dispatch = useDispatch();

  const { language } = useSelector(selectAuth);

  function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.replace(/^\d/, '');
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/Đ/g, 'D');
    return str;
  }

  const handleOnKeyDown = e => {
    if ([32].indexOf(e.which) > -1) {
      e.preventDefault();
    }
  };

  return (
    <Stack className={classes.stack}>
      <TextInput
        onInput={(e: any) => {
          setAppear(true);
        }}
        label={t('profile.Nickname')}
        placeholder={t('profile.Enter nickname')}
        classNames={{ input: classes.input, label: classes.label }}
        {...form.getInputProps('name')}
        onChange={(e: any) => {
          const value = removeAscent(e.target.value);
          form.getInputProps('name').onChange(value);
        }}
        onKeyDown={e => handleOnKeyDown(e)}
      />

      <Select
        icon={language === 'en-US' ? <EN /> : <VN />}
        classNames={{ input: classes.input, label: classes.label }}
        label={t('profile.Language')}
        defaultValue={language}
        data={[
          { value: 'vi-VN', label: 'Vietnam' },
          { value: 'en-US', label: 'English' },
        ]}
        mt={5}
        mb={5}
        sx={{
          '@media(max-width: 768px)': {
            marginBottom: 60,
          },
        }}
        rightSection={<CaretDown />}
        onChange={value => {
          dispatch(
            authActions.setLanguage({
              language: value ?? language,
            }),
          );
          i18n.changeLanguage(value ?? language);
        }}
      />

      <Group className={classes.groupButtonStake}>
        <FilledButton w="100%" h={42} className={classes.button} type="submit">
          {t('profile.Confirm')}
        </FilledButton>
      </Group>
    </Stack>
  );
};

const makeStyles = createStyles((theme, { appear }: { appear: boolean }) => ({
  stack: {
    gap: 0,
  },
  input: {
    border: '1px solid #929292',
    height: 44,
    borderRadius: 8,

    ':focus, :focus-within': {
      borderColor: 'var(--primary-2)',
    },
  },

  label: {
    fontSize: 14,
    fontWeight: 600,
  },

  button: {
    visibility: !appear ? 'hidden' : 'visible',
    fontSize: '16px !important',
  },

  groupButtonStake: {
    width: '100%',
    marginTop: 20,

    '@media (max-width : 576px)': {
      padding: '10px 16px',
      position: 'fixed',
      bottom: 0,
      left: 0,
      background: !appear ? 'transparent' : variable.neutral.whiteLight,
    },
  },
}));

export default ProfileForm;
