import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Flex, Stack, Text, createStyles } from '@mantine/core';

import { media } from 'styles/media';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import { FilledButton } from 'app/components/Button/FilledButton';
import { ReactComponent as USDT } from 'assets/icons/coin/usdt.svg';
import { ReactComponent as Lock } from 'assets/icons/homePage/lock.svg';
import { formatCoinUS } from 'utils/helpers/formatCoinUs';
import { useNavigate } from 'react-router-dom';
import { ProjectState } from 'store/slice/auth/type';

interface Props {
  data?: ProjectState;
  projectId?: any;
}
const Project = memo(({ data, projectId }: Props) => {
  const navigate = useNavigate();
  // Local
  const { t } = useTranslation();
  const { cx, classes } = makeStyles({ data });
  // Func

  const nav = useNavigate();

  const toInfoProject = () => {
    nav(`/project-details/${projectId}`);
  };

  function navigateToPreview() {
    window.open(
      `https://share.vietdefi.work/projects/detail/${projectId}`,
      '_blank',
    );
  }

  return (
    <Flex className={classes.project}>
      {data?.state === 1 && (
        <Box className={classes.lock}>
          <Lock />
        </Box>
      )}
      <Avatar src={data?.avatar} className={classes.avatar} />
      <Stack className={classes.content}>
        <div>
          <Text lineClamp={1} className="subtitle_4-bold">
            {data?.name}
          </Text>
          <Text lineClamp={1} className="small_6-regular">
            {data?.author.name}
          </Text>
        </div>
        <Flex className={classes.usdtWrap}>
          <Text className={cx('body_4-bold', classes.money)}>
            {formatCoinUS(data?.total_invested)}
          </Text>
          <USDT />
        </Flex>
        <Flex className={classes.groupBtn}>
          <OutlineButton
            className={classes.projectBtn}
            onClick={navigateToPreview}
          >
            {t('Home.Preview')}
          </OutlineButton>
          <FilledButton
            onClick={() => toInfoProject()}
            className={classes.projectBtn}
          >
            {t('Home.Repair')}
          </FilledButton>
        </Flex>
      </Stack>
    </Flex>
  );
});

export default Project;

const makeStyles = createStyles((theme, { data }: any) => ({
  project: {
    gap: 14,
    width: '100%',
    padding: 8,
    maxHeight: 135,
    borderRadius: 8,
    border: '1px solid var(--grey-light)',
    boxShadow: 'var(--shadow-hover)',
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: data.state === 1 ? 'rgba(234, 234, 234, 0.8)' : '#FFFFFF',
    [`${media.small()}`]: {
      maxWidth: '100%',
    },
  },
  lock: {
    position: 'absolute',
    right: 8,
  },
  avatar: {
    width: 110,
    height: '100%',
    borderRadius: 14,
  },
  content: {
    gap: 4,
    flex: 1,
    justifyContent: 'space-between',
  },
  groupBtn: {
    gap: 8,
  },
  projectBtn: {
    width: '50%',
    padding: 0,
  },
  usdtWrap: {
    gap: 6,
  },
  money: {
    color: 'var(--primary-2)',
  },
}));
