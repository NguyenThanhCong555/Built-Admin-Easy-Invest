import React from 'react';
import { Text, createStyles, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { ReactComponent as ArrowLeft } from 'assets/icons/arrow/arrowLeft.svg';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface PropsProject {
  mobiles?: any;
}

interface Props {
  title: string;
  classTitle?: string;
  fontSizeTitle?: number;
  sizeIcon?: number;
  h?: number;
  onMovePage?: () => void;
  children?: ReactJSXElement;
  rightSection?: JSX.Element;
}

export const BackWithTitle = (props: Props) => {
  const mobile: any = useMediaQuery('(max-width: 768px)');
  const { classes } = createNewStyle({ mobiles: mobile });

  return (
    <Group h={props.h ?? 48} className={classes.bodyNavigate}>
      {props.onMovePage ? (
        <ArrowLeft
          onClick={props.onMovePage}
          style={{
            width: props.sizeIcon || '24px',
            height: props.sizeIcon || '24px',
          }}
        />
      ) : (
        <Text style={{ opacity: 0 }}>hide</Text>
      )}
      <Text fz={props.fontSizeTitle || '24px'} className={props.classTitle || 'subtitle_1-bold'}>
        {props.children}
        {props.title}
      </Text>
      {props.rightSection ? props.rightSection : <Text style={{ opacity: 0 }}>Sửa</Text>}
    </Group>
  );
};

const createNewStyle = createStyles((theme, params: PropsProject) => ({
  bodyNavigate: {
    width: '100%',
    justifyContent: 'space-between',
  },
}));
