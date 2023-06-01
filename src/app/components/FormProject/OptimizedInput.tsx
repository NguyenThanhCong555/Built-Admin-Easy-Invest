import React, { forwardRef, memo } from 'react';
import { TextInput, createStyles } from '@mantine/core';
import { TFieldForm } from './FormProject';
import { UseFormReturnType } from '@mantine/form';

interface OptimizedInputProps {
  form: UseFormReturnType<any>;
  label: string;
  require: boolean;
  placeholder: string;
  field: string;
  onChangeInput?: any;
  isUppercase?: boolean;
}

const OptimizedInput = forwardRef<HTMLInputElement, OptimizedInputProps>(
  ({ field, form, label, require, placeholder, onChangeInput, isUppercase }, ref) => {
    const { classes } = makeStyles({ isUppercase });
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
        ref={ref}
        data-label={field}
      />
    );
  },
);

const makeStyles = createStyles((theme, { isUppercase }: { isUppercase: boolean | undefined }) => ({
  input: {
    border: '1px solid #929292',
    height: 44,
    borderRadius: 8,
    textTransform: isUppercase ? 'uppercase' : 'none',

    '::placeholder': {
      textTransform: 'none',
    },

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
