import React from 'react';
import { createStyles, Select, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

const SelectFont = ({ editor }) => {
  const { classes } = makeStyles();
  return (
    <Select
      defaultValue="14"
      type="number"
      classNames={{
        root: classes.root,
        input: classes.input,
        wrapper: classes.wrapper,
        item: classes.item,
        dropdown: classes.dropdown,
        rightSection: classes.rightSection,
      }}
      rightSection={<IconChevronDown size={12} />}
      data={[
        { label: '14', value: '14' },
        { label: '16', value: '16' },
        { label: '18', value: '18' },
        { label: '20', value: '20' },
        { label: '22', value: '22' },
        { label: '24', value: '24' },
        { label: '26', value: '26' },
        { label: '28', value: '28' },
        { label: '30', value: '30' },
      ]}
      onChange={value => {
        editor.commands.setFontSize(Number(value));
      }}
    />
  );
};

const makeStyles = createStyles(() => ({
  root: {
    height: 26,
    width: 50,
    marginLeft: 5,
  },

  input: {
    padding: '0 5px',
    height: '100%',
    minHeight: 26,
    fontSize: 12,
    fontWeight: 600,
  },

  wrapper: {
    height: '100%',
  },

  item: {
    fontSize: 12,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    pointerEvents: 'none',
  },
  dropdown: {},
}));

export default SelectFont;
