import { Avatar, Group, Text, createStyles } from '@mantine/core';
import React from 'react';

type Props = {
  avatar: string;
  coinName: string;
  balance: string | number;
};

export const CoinCard = (props: Props) => {
  const { classes } = useStyle();

  return (
    <Group position="apart" noWrap className={classes.container}>
      <Group spacing={8} noWrap>
        <Avatar src={props.avatar} radius={100} miw={32} mih={32} />
        <Text className="body_4-bold">{props.coinName}</Text>
      </Group>
      <Text className="body_4-bold" c={'var(--primary-2)'}>
        {props.balance}
      </Text>
    </Group>
  );
};

const useStyle = createStyles(() => ({
  container: {
    background: 'var(--white)',
    border: `1px solid var(--primary-1)`,
    boxShadow: '0px 2px 0px var(--primary-1)',
    borderRadius: '8px',
    padding: 8,
    cursor: 'pointer',
  },
}));
