import React, { ReactNode } from 'react';

import { Box, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { ReactComponent as IconXCircle } from 'assets/icons/modal/x-circle.svg';
import { OutlineButton } from '../Button/OutlineButton';
import { FilledButton } from '../Button/FilledButton';

type Props = {
  title?: string;
  content?: ReactNode;
  cancelText: string;
  successText: string;
  onClose?: () => void;
  onCancel?: () => void;
  onSuccess?: () => void;
};

export const ConfirmAskPopup = (props: Props) => {
  return (
    <Box p={'20px 23px 40px'}>
      <Group position="right" mb={12}>
        <IconXCircle onClick={props.onClose} style={{ cursor: 'pointer' }} />
      </Group>
      {props.title && <Text align="center">{props.title}</Text>}
      {props.content && props.content}

      <Group noWrap mt={24}>
        <OutlineButton onClick={props.onCancel} w={'calc(50% - 4.5px)'} h={'44px'}>
          {props.cancelText}
        </OutlineButton>
        <FilledButton onClick={props.onSuccess} w={'calc(50% - 4.5px)'} h={'44px'}>
          {props.successText}
        </FilledButton>
      </Group>
    </Box>
  );
};
