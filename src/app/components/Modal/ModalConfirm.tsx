import React, { memo } from 'react';
import { Flex, Modal, Stack, Text, createStyles } from '@mantine/core';
import { ReactComponent as XCircle } from 'assets/icons/modal/x-circle.svg';

interface ModalConfirmProps {
  title: string;
  opened: boolean;
  onCloseModal: () => void;
  btnLeft?: JSX.Element;
  btnRight?: JSX.Element;
  boldTitle?: string;
}

const ModalConfirm = memo(({ title, opened, btnLeft, btnRight, boldTitle, onCloseModal }: ModalConfirmProps) => {
  const { classes } = makeStyles();
  return (
    <Modal
      centered
      opened={opened}
      onClose={() => {
        onCloseModal();
      }}
      closeButtonProps={{
        children: <XCircle />,
      }}
      classNames={{ content: classes.content }}
    >
      <Stack className={classes.stack}>
        {boldTitle && <Text className={classes.boldTitle}>{boldTitle}</Text>}
        <Text className={classes.title}>{title}</Text>
        <Flex className={classes.flex}>
          {btnLeft}
          {btnRight}
        </Flex>
      </Stack>
    </Modal>
  );
});

const makeStyles = createStyles(theme => ({
  root: {},
  content: {
    borderRadius: 8,
  },
  stack: { gap: 0 },
  title: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'center',
    color: '#000',

    '@media (max-width: 768px)': {
      fontSize: 16,
    },
  },

  boldTitle: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center',

    '@media (max-width: 768px)': {
      fontSize: 18,
    },
  },
  flex: {
    gap: 10,
    marginTop: 15,
  },
}));

export default ModalConfirm;
