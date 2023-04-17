import React, { memo } from 'react';
import { TextInput, createStyles } from '@mantine/core';
import { TFieldForm } from './FormProject';
import { UseFormReturnType } from '@mantine/form';

interface OptimizedInputProps {
  form: UseFormReturnType<TFieldForm>;
  label: string;
  require: boolean;
  placeholder: string;
  field: string;
  onChangeInput?: any;
}

const OptimizedInput = memo(
  ({
    field,
    form,
    label,
    require,
    placeholder,
    onChangeInput,
  }: OptimizedInputProps) => {
    const { classes } = makeStyles();
    return (
      <TextInput
        label={label}
        placeholder={placeholder}
        withAsterisk={require}
        classNames={{ input: classes.input, label: classes.label }}
        {...form.getInputProps(field)}
        onChange={e => {
          if (onChangeInput) {
            onChangeInput(e);
          } else {
            form.getInputProps(field).onChange(e.target.value);
          }
        }}
      />
    );
  },
);

const makeStyles = createStyles(theme => ({
  input: {
    border: '1px solid #929292',
    height: 44,
    borderRadius: 8,

    ':focus, :focus-within': {
      borderColor: 'var(--primary-2)',
    },
  },

  label: {
    fontSize: 14,
    fontWeight: 600,
  },
}));

export default OptimizedInput;
