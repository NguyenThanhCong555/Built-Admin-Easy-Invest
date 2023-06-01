import React, { memo, useEffect, useState } from 'react';

import { Box, FileButton, Image, LoadingOverlay, Progress, Text, createStyles } from '@mantine/core';
import { ReactComponent as UploadFIle } from 'assets/icons/formProject/file-upload.svg';
import { TFieldForm, TFile } from './FormProject';
import { UseFormReturnType } from '@mantine/form';
import axios from 'axios';

interface FileUploadProps {
  label?: string;
  file: TFile;
  setFile: React.Dispatch<React.SetStateAction<any>>;
  form?: UseFormReturnType<any>;
  error?: any;
  field?: string;
  data?: string;
  setDisable?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileUpload = memo(({ data, field, label, file, setFile, form, error, setDisable }: FileUploadProps) => {
  const { classes } = makeStyles();
  async function handleChange(file) {
    if (file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      setFile({ src: objectUrl, progress: 0, done: false });
      try {
        setDisable?.(true);
        const response = await axios.post(
          'https://api.imgbb.com/1/upload?key=2e5f11102e33acf7162185235030bf52',
          { image: file },
          {
            headers: { 'content-type': 'multipart/form-data' },
          },
        );

        URL.revokeObjectURL(objectUrl);

        if (form) form.setFieldValue(field as string, response.data.data.url);
        setFile({ src: response.data.data.url, progress: 100, done: false });
        setTimeout(() => {
          setFile({ src: response.data.data.url, progress: 100, done: true });
          setDisable?.(false);
        }, 200);
      } catch (error) {}
    } else return;
  }

  return (
    <FileButton onChange={file => handleChange(file)} accept="image/png,image/jpeg">
      {property => (
        <Box {...property}>
          <Text className={classes.title}>
            {label}
            <Text className={classes.textStar}>{'  *'}</Text>
            <Text className={classes.textError}>{error}</Text>
          </Text>
          {file.src !== '' ? (
            <Box className={classes.boxContainer}>
              <Image
                src={file.src}
                classNames={{
                  root: classes.rootImage,
                  figure: classes.imageBanner,
                  imageWrapper: classes.imageWrapper,
                  image: classes.image,
                }}
              />
              <Box className={classes.boxOverlay}>
                <LoadingOverlay visible={file?.done ? false : true} overlayBlur={2} loaderProps={{ color: 'var(--primary-1)' }} />
              </Box>
              {!file?.done && <Progress value={file?.progress} color="var(--primary-1)" />}
            </Box>
          ) : (
            <UploadFIle />
          )}
        </Box>
      )}
    </FileButton>
  );
});

const makeStyles = createStyles(theme => ({
  title: {
    fontSize: 14,
    lineHeight: 1,
    fontWeight: 600,
  },

  boxContainer: {
    position: 'relative',
    height: '125px',
  },
  boxOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 1,
  },

  textStar: {
    display: 'inline',
    color: '#fa5252',
  },

  textError: {
    color: '#fa5252',
    fontSize: 12,
    marginBottom: 3,
    fontWeight: 500,
  },

  rootImage: {
    width: '125px !important',
    height: '125px !important',
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    height: '100% !important',
  },
  imageWrapper: {
    height: '100%',
  },
  imageBanner: {
    height: '100%',
  },
}));

export default FileUpload;
