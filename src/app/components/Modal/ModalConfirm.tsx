import React, { memo } from 'react';
import { Flex, Modal, Stack, Text, createStyles } from '@mantine/core';
import { ReactComponent as XCircle } from 'assets/icons/modal/x-circle.svg';

interface ModalConfirmProps {
  title: string;
  opened: boolean;
  onCloseModal: () => void;
  btnLeft?: JSX.Element;
  btnRight?: JSX.Element;
}

const ModalConfirm = memo(
  ({ title, opened, btnLeft, btnRight, onCloseModal }: ModalConfirmProps) => {
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
        <Stack>
          <Text className={classes.title}>{title}</Text>
          <Flex className={classes.flex}>
            {btnLeft}
            {btnRight}
          </Flex>
        </Stack>
      </Modal>
    );
  },
);

const makeStyles = createStyles(theme => ({
  root: {},
  content: {
    borderRadius: 8,
  },
  stack: {},
  title: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'center',
    color: '#000',
  },
  flex: {
    gap: 10,
  },
}));

export default ModalConfirm;
