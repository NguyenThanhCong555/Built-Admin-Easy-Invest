import React, { memo, useState } from 'react';
import { Box, FileButton, Flex, Group, Image, LoadingOverlay, Progress, Stack, Text, createStyles } from '@mantine/core';
import { ReactComponent as UploadFileBanner } from 'assets/icons/formProject/file-uploadBanner.svg';
import { ReactComponent as XCircle } from 'assets/icons/modal/x-circle.svg';
import axios from 'axios';
import { UseFormReturnType } from '@mantine/form';
import { TFieldForm } from './FormProject';

interface FilesUploadBannerProps {
  files: any;
  setFiles: any;
  label: string;
  form?: UseFormReturnType<TFieldForm>;
  setDisable?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilesUploadBanner = memo(({ label, files, form, setFiles, setDisable }: FilesUploadBannerProps) => {
  const { classes } = makeStyles();

  function handleChange(data: File[]) {
    // Create BLOB file
    data = data.filter(file => file.type.startsWith('image/'));
    if (data.length + files.length > 5) {
      form?.setFieldError('cover_photo', 'Không được upload quá 5 ảnh');
      data = data.slice(0, 5 - files.length);
    }

    // Reset error
    form?.setFieldValue('cover_photo', []);
    const blobFiles = data.map((file, _) => {
      const objectUrl = URL.createObjectURL(file);
      return {
        name: file.name,
        src: objectUrl,
        progress: 0,
        done: false,
      };
    });

    setFiles(prev => [...prev, ...blobFiles]);
    setDisable?.(true);
    Array.from(data).forEach(async (file, index) => {
      try {
        // test key
        const response = await axios.post(
          'https://api.imgbb.com/1/upload?key=2e5f11102e33acf7162185235030bf52',
          { image: file },
          {
            headers: { 'content-type': 'multipart/form-data' },
          },
        );
        if (response.data.status === 200) {
          const findData = blobFiles.find((item, _) => item.name === file.name);
          URL.revokeObjectURL(findData!.src);
          findData!.src = response.data.data.url;
          findData!.progress = 100;

          setTimeout(() => {
            findData!.done = true;
            setFiles([...files, ...blobFiles]);
          }, 200);

          setFiles([...files, ...blobFiles]);
        }
      } catch (error) {}

      const data = blobFiles.filter((item, _) => item.done !== true);
      if (data?.length === 1) {
        setDisable?.(false);
      }

      if (form) {
        const newData = blobFiles.map((item, _) => item.src);
        form.setFieldValue('cover_photo', [...form.values.cover_photo, ...newData]);
      }
    });
  }

  function handleDelete(index) {
    const newFiles = files.filter((item, i) => i !== index);
    setFiles(newFiles);
    if (form)
      form.setFieldValue(
        'cover_photo',
        newFiles.map((item, _) => item.src),
      );
  }

  return (
    <Stack className={classes.stack}>
      <Text className={classes.title}>
        {label}
        <Text className={classes.textStar}>{'  *'}</Text>
        <Text className={classes.textError}>{form?.errors.cover_photo}</Text>
      </Text>
      <Flex className={classes.flex}>
        {files?.map((item, index) => (
          <Box className={classes.box} key={index}>
            <Image
              classNames={{
                root: classes.rootImage,
                figure: classes.imageBanner,
                imageWrapper: classes.imageWrapper,
                image: classes.image,
              }}
              src={item.src}
            />
            <Group className={classes.group} onClick={() => handleDelete(index)}>
              <XCircle className={classes.icon} />
            </Group>

            <Box className={classes.boxOverlay}>
              <LoadingOverlay visible={item?.done ? false : true} overlayBlur={2} loaderProps={{ color: 'var(--primary-1)' }} />
            </Box>

            {!item?.done && <Progress value={item?.progress} color="var(--primary-1)" />}
          </Box>
        ))}
        {files.length < 5 && (
          <FileButton onChange={files => handleChange(files)} accept="image/png,image/jpeg" multiple>
            {property => (
              <Box {...property}>
                <UploadFileBanner />
              </Box>
            )}
          </FileButton>
        )}
      </Flex>
    </Stack>
  );
});

const makeStyles = createStyles(theme => ({
  box: {
    position: 'relative',
    height: 82,
  },
  boxOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  group: {
    position: 'absolute',
    cursor: 'pointer',
    zIndex: 3,
    top: 0,
    right: 0,
    color: 'red',
    padding: 5,
  },
  stack: {
    gap: 0,
  },
  title: {
    fontSize: 14,
    lineHeight: 1,
    fontWeight: 600,
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
  flex: {
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 5,
    rowGap: 5,
  },
  rootImage: {
    width: '145px !important',
    height: '82px !important',
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

  icon: {
    width: 16,
    height: 16,
    path: {
      stroke: '#fa5252',
    },
  },
}));

export default FilesUploadBanner;
