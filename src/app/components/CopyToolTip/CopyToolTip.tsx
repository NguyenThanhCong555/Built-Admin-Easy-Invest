import React from 'react';
import { ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import { ReactComponent as IconCheck } from 'assets/icons/check-success.svg';
import { ReactComponent as IconCopy } from 'assets/icons/icon-copy.svg';
interface Props {
  text: string;
}

const CopyToolTip = ({ text }: Props) => {
  return (
    <CopyButton value={text} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
            {copied ? <IconCheck /> : <IconCopy />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};

export default CopyToolTip;
