import React from 'react';
import { Box, Center, Flex, Modal, Stack, Text, TextInput, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';
import { FilledButton } from 'app/components/Button/FilledButton';

interface ModalConfirmRequestProps {
  opened: boolean;
  close: () => void;
  data?: any;
  children?: any;
  isChildren?: boolean;
  idProject?: any;
}

const ModalConfirmRequest = ({ opened, close, children, isChildren }: ModalConfirmRequestProps) => {
  const { t } = useTranslation();

  const { classes: c } = makeStyles();

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      closeButtonProps={{
        display: 'none',
      }}
      classNames={{ header: c.header, body: c.body }}
      radius={14}
    >
      <Stack className={c.stack}>
        <Center className={c.center}>
          <Text className={c.text}>{t('Confirmation.Check information')}</Text>
        </Center>

        <Box className={c.box}>{children}</Box>
      </Stack>
    </Modal>
  );
};

const makeStyles = createStyles(() => ({
  form: {
    width: '100%',
  },
  boxRequestCoin: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stack: {
    gap: 0,
  },
  center: {
    height: 68,
    backgroundColor: 'var(--primary-2)',
  },
  body: {
    padding: 0,
  },
  text: {
    fontSize: 24,
    fontWeight: 700,
    color: '#fff',
  },
  header: {
    display: 'none',
  },

  box: {
    padding: 24,

    '@media (max-width: 768px)': {
      padding: 12,
    },
  },
}));

export default ModalConfirmRequest;
