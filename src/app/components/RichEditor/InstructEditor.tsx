import React from 'react';
import { Flex, List, Stack, Text, createStyles } from '@mantine/core';
import { media } from 'styles/media';

const InstructEditor = () => {
  const { classes } = makeStyles();

  return (
    <Stack className={classes.stack}>
      <Text className={classes.text}>
        Chú ý: Kích thước text sẽ giữ nguyên trên giao diện Website và Mobile
      </Text>
      <List>
        <Flex className={classes.flex}>
          <List.Item className={classes.item}>
            Tiêu đề 1(H1): font size 18
          </List.Item>
          <List.Item className={classes.item}>
            Tiêu đề 2(H1): font size 16
          </List.Item>
        </Flex>
        <Flex className={classes.flex}>
          <List.Item className={classes.item}>Nội dung: font size 14</List.Item>
          <List.Item className={classes.item}>
            Nội dung khác: font size 14-16{' '}
          </List.Item>
        </Flex>
      </List>
    </Stack>
  );
};

const makeStyles = createStyles(theme => ({
  stack: {
    backgroundColor: 'var(--white-light)',
    padding: '10px 16px',
    gap: 5,
  },
  text: {
    fontSize: 14,
    color: 'var(--secondary-2)',
    fontWeight: 500,
    [`${media.small()}`]: {
      fontSize: 12,
    },
  },
  flex: {
    alignItems: 'center',
    gap: 20,
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    fontSize: 12,
    color: 'var(--grey)',
    [`${media.small()}`]: {
      fontSize: 10,
    },
  },
}));

export default InstructEditor;
