import React, { useEffect, useRef, useState } from 'react';
import { Flex, Stack, TextInput, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import OptimizedInput from 'app/components/FormProject/OptimizedInput';
import { UseFormReturnType } from '@mantine/form';
import FileUpload from 'app/components/FormProject/FileUpload';
import { useDisclosure } from '@mantine/hooks';

interface BinanceFormProps {
  form: UseFormReturnType<any>;
  setDisable?: React.Dispatch<React.SetStateAction<boolean>>;
}

const BinanceForm = ({ form, setDisable }: BinanceFormProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();

  const [file, setFile] = useState<any>({ src: '' });
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (form.values.qr !== '') {
      setFile({
        src: form.values.qr,
        done: true,
      });
    }

    return () => {
      form.clearErrors();
      setDisable?.(false);
    };
  }, []);

  useEffect(() => {
    if (form.errors?.binance_id) {
      ref.current?.focus();
    }
  }, [JSON.stringify(form.errors)]);

  return (
    <Stack>
      <Flex className={classes.flex}>
        <Stack className={classes.stack}>
          <TextInput
            ref={ref}
            label="ID_Binance"
            placeholder={t('bankManagement.Enter ID')}
            withAsterisk
            {...form.getInputProps('binance_id')}
            classNames={{ input: classes.input, label: classes.label }}
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
          />

          <OptimizedInput
            label="Nickname"
            form={form}
            require={false}
            placeholder={t('bankManagement.Enter nickname')}
            field="name"
          />
        </Stack>

        <FileUpload
          label="QR Code"
          file={file}
          setFile={setFile}
          form={form}
          error={form?.errors?.qr}
          field="qr"
          setDisable={setDisable}
        />
      </Flex>
    </Stack>
  );
};

const makeStyles = createStyles(() => ({
  flex: {
    gap: 16,
  },
  stack: {
    flex: 1,
    justifyContent: 'space-between',
  },

  button: {
    fontSize: '16px !important',
  },

  form: {
    marginTop: 18,
  },

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

export default BinanceForm;
