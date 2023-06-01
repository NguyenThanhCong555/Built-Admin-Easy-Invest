import React from 'react';
import { Tabs, TabsProps } from '@mantine/core';
import { variable } from 'styles/variable';

export function StyledTabs(props: TabsProps) {
  return (
    <Tabs
      unstyled
      styles={theme => ({
        tab: {
          ...theme.fn.focusStyles(),
          backgroundColor: variable.neutral.white,
          color: variable.neutral.black,
          border: `1.5px solid ${variable.primary.primary2}`,
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          cursor: 'pointer',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',

          '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
          },

          '&:not(:first-of-type)': {
            borderLeft: 0,
          },

          '&:first-of-type': {
            borderTopLeftRadius: theme.radius.md,
            borderBottomLeftRadius: theme.radius.md,
          },

          '&:last-of-type': {
            borderTopRightRadius: theme.radius.md,
            borderBottomRightRadius: theme.radius.md,
          },

          '&[data-active]': {
            backgroundColor: variable.primary.primary2,
            borderColor: variable.primary.primary2,
            color: theme.white,
          },
        },

        tabIcon: {
          marginRight: theme.spacing.xs,
          display: 'flex',
          alignItems: 'center',
        },

        tabsList: {
          display: 'flex',
        },
      })}
      {...props}
    />
  );
}
