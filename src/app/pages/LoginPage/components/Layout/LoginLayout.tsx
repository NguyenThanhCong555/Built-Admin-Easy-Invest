import * as React from 'react';
import { Avatar, Card, Center, Stack, createStyles } from '@mantine/core';

import { useTranslation } from 'react-i18next';

import { media } from 'styles/media';
import { images } from 'assets/images';

interface Props {
  children?: JSX.Element | JSX.Element[];
}
export const LoginLayout = ({ children }: Props) => {
  const { t } = useTranslation();
  const { cx, classes } = makeStyles({ images });
  const [instructions, setInstructions] = React.useState(false);
  const isinstructions = () => {
    setInstructions(!instructions);
  };
  const [opened, setOpened] = React.useState<boolean>(false);
  return (
    <Center className={classes.container}>
      <Card className={classes.wrapper}>
        <Stack className={classes.content}>
          <div className={classes.logoWrap}>
            <Avatar src={images.logo} className={classes.logo} />
          </div>
          {children}
        </Stack>
      </Card>
    </Center>
  );
};

const makeStyles = createStyles((theme, { images }: any) => ({
  container: {
    width: '100vw',
    height: '100vh',
    padding: '84px 16px 16px',
    overflow: 'hidden',
    [media.x_large()]: {
      padding: 16,
    },
    [media.small()]: {
      padding: 0,
    },
  },
  wrapper: {
    minHeight: 660,
    width: '100%',
    maxWidth: 570,
    margin: 'auto',
    borderRadius: 20,
    border: '1px solid var(--grey-light)',
    backgroundImage: `url(${images.backgroundWeb})`,
    backgroundSize: 'cover',
    [media.small()]: {
      height: '100vh',
      border: 'none',
      borderRadius: 0,
      backgroundImage: `url(${images.backgroundMobile})`,
    },
  },
  content: {
    gap: 0,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  logoWrap: {
    width: '100%',
    height: 250,
  },
  logo: {
    width: 180,
    height: 180,
    margin: '0px auto',
  },
  tutorial: {
    gap: 8,
    height: 64,
    borderRadius: 8,
    padding: '6px 8px',
    marginTop: 122,
    border: '1px solid var(--grey-light)',
    backgroundColor: 'var(--white)',
    cursor: 'pointer',
  },
  image: {
    width: 52,
    height: 52,
  },
  navigate: {
    color: 'var(--primary-1)',
  },
}));
