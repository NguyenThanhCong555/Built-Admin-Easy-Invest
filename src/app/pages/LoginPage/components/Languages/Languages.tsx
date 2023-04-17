import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, Divider, Flex, Stack, Text } from '@mantine/core';

import { media } from 'styles/media';
import { ReactComponent as VN } from 'assets/icons/loginPage/vn-lang.svg';
import { ReactComponent as EN } from 'assets/icons/loginPage/en-lang.svg';
import { ReactComponent as CaretDown } from 'assets/icons/homePage/caret-down.svg';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from 'store/slice/auth';
import { selectAuth } from 'store/slice/auth/selectors';

interface Props {
  isShadow?: boolean;
}
function Languages({ isShadow }: Props) {
  const dispatch = useDispatch();
  const { language } = useSelector(selectAuth);

  // Local
  const { t, i18n } = useTranslation();
  const { cx, classes } = makeStyles({ isShadow });
  // State
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleLanguageChange = lang => {
    dispatch(
      authActions.setLanguage({
        language: lang,
      }),
    );
    i18n.changeLanguage(lang);
  };
  return (
    <Stack
      className={classes.container}
      onClick={() => {
        setIsShow(prev => !prev);
      }}
    >
      <Flex className={classes.langSelect}>
        {language === 'en-US' ? <EN /> : <VN />}
        <Text className={cx(classes.selectTex, classes.optionText)}>
          {language === 'en-US' ? 'ENG' : 'VIE'}
        </Text>
        <CaretDown />
      </Flex>
      {isShow && (
        <Stack className={classes.optionWrapper}>
          <Flex
            sx={{
              gap: 5,
              alignItems: 'center',
              padding: '6px 8px 8px',
              borderRadius: '8px 8px 0px 0px',
              ':hover': {
                backgroundColor: '#ced4da',
              },
            }}
            onClick={() => handleLanguageChange('vi-VN')}
          >
            <VN />
            <Text className={classes.optionText}>Vietnam</Text>
          </Flex>
          <Divider className={classes.divider} />
          <Flex
            sx={{
              gap: 5,
              alignItems: 'center',
              padding: '8px 8px 6px',
              borderRadius: '0px 0px 8px 8px',
              ':hover': {
                backgroundColor: '#ced4da',
              },
            }}
            onClick={() => handleLanguageChange('en-US')}
          >
            <EN />
            <Text className={classes.optionText}>English</Text>
          </Flex>
        </Stack>
      )}
    </Stack>
  );
}

export default Languages;

const makeStyles = createStyles((them, { isShadow }: Props) => ({
  container: {
    height: 36,
    width: isShadow ? 110 : 95,
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    boxShadow: isShadow ? '0px 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
    [media.small()]: {
      height: 30,
      width: 95,
    },
  },
  langSelect: {
    width: '100%',
    height: '100%',
    borderRadius: 21,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 6px',
  },
  selectTex: {
    flex: 1,
    fontWeight: 500,
    textAlign: 'center',
  },
  optionText: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '18px',
    userSelect: 'none',
    color: '#000',
  },
  divider: {
    width: '90%',
    margin: '0px auto',
  },
  optionWrapper: {
    gap: 0,
    background: '#FFFFFF',
    borderRadius: 8,
    cursor: 'pointer',
    position: 'absolute',
    bottom: -100,
    left: '-2%',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    [media.small()]: {
      left: '-6%',
      bottom: -90,
    },
  },
}));
