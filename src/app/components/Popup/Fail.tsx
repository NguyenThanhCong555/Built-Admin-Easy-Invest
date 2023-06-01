import { Stack, Text } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as IconFail } from 'assets/icons/loginPage/icondot.svg';

type Props = {
  title: string;
};

export const FailPopup = (props: Props) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={24} align={'center'}>
      <IconFail width={'80px'} height={'80px'} />
      <Text align="center" className="body-3_regular">
        {t(props.title)}
      </Text>
    </Stack>
  );
};
