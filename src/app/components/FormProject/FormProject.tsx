import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from '@mantine/form';
import { Box, Flex, Stack, Text, createStyles } from '@mantine/core';
import SelectLanguage from './SelectLanguage';
import OptimizedInput from './OptimizedInput';
import FileUpload from './FileUpload';
import { FilledButton } from '../Button/FilledButton';
import FilesUploadBanner from './FilesUploadBanner';
import RichEditor from '../RichEditor/RichEditor';

import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Link } from '@mantine/tiptap';
import { TextStyleExtended } from 'app/components/RichEditor/font-size';
import PromptForm from '../PromptForm/PromptForm';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { projectsActions } from 'store/slice/projects';
import { selectResponse } from 'store/slice/projects/selectors';
import ModalSuccess from '../Modal/ModalSuccess';
import { useNavigate, useParams } from 'react-router-dom';
import { ETypeForm } from './enum';
import Loading from '../Loading/Loading';

export type TFieldForm = {
  nameProject: string;
  publisher: string;
  website: string;
  avatar: string | File | null;
  cover_photo: Array<string | File>;
  vn_description: string;
  en_description: string;
};

export type TFile = {
  name?: File;
  src: string;
  progress?: number;
  done?: boolean;
};

interface FormProjectProps {
  type: string;
  data?: any;
}

const FormProject = ({ type, data }: FormProjectProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes } = makeStyles();

  const { projectId } = useParams();

  const [language, setLanguage] = useState<string | null>('vi');
  const [submit, setSubmit] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);

  const [file, setFile] = useState<TFile>({ src: '' });
  const [files, setFiles] = useState<TFile[]>([]);

  const responseProject = useSelector(selectResponse);
  const form = useForm({
    initialValues: {
      nameProject: '',
      publisher: '',
      website: '',
      avatar: null as File | string | null,
      cover_photo: [] as Array<string | File>,
      vn_description: '',
      en_description: '',
    },

    validate: {
      nameProject: value => {
        if (value.length <= 0 || !value) return 'Vui lòng nhập tên dự án !';
        if (value.length > 100) return 'Tên dự án không được quá 100 kí tự';
        return null;
      },

      cover_photo: value => {
        if (value.length <= 0) return 'Vui lòng tải lên ít nhất 1 ảnh';
        if (value.length > 5) return 'Không được tải quá 5 ảnh';
        return null;
      },

      avatar: value => (!value ? 'Vui lòng tải lên ít nhất 1 ảnh' : null),
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: 'body_1-bold',
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: 'small_3-regular',
          },
        },
      }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyleExtended,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
  });

  useEffect(() => {
    if (data) {
      form.setFieldValue('nameProject', data?.name);
      form.setFieldValue('publisher', data?.author?.name);
      form.setFieldValue('website', data?.website);
      form.setFieldValue('vn_description', data?.intro?.VN);
      form.setFieldValue('en_description', data?.intro?.ENG);
      form.setFieldValue('avatar', data?.avatar);
      form.setFieldValue('cover_photo', data?.cover_photo);

      setFile({ src: data?.avatar, done: true });
      setFiles(
        data?.cover_photo.map((item, _) => ({
          src: item,
          done: true,
        })),
      );
    }
  }, [data]);

  useEffect(() => {
    if (editor && data) {
      editor?.chain().setContent(data?.intro?.VN).run();
    }
  }, [editor, data]);

  useMemo(() => {
    if (editor) {
      language === 'vi'
        ? form.setFieldValue('vn_description', editor?.getHTML() as string)
        : form.setFieldValue('en_description', editor?.getHTML() as string);
      form.resetDirty({ ...form.values, vn_description: editor?.getHTML() });
    }
  }, [editor?.getHTML()]);

  function handleSubmit(values) {
    setSubmit(true);
    form.resetDirty();
    const payload = {
      name: values.nameProject,
      avatar: file.src,
      cover_photo: values.cover_photo,
      author: {
        name: values.publisher,
      },
      intro: {
        ENG: values.en_description,
        VN: values.vn_description,
      },
      website: values.website,
    };
    if (type === ETypeForm.AddProject) {
      dispatch(projectsActions.requestCreateProject(payload));
    } else {
      dispatch(projectsActions.requestUpdateProject({ projectId, ...payload }));
    }
  }

  function handleChangeLanguage(value) {
    setLanguage(value);
    value === 'vi'
      ? editor?.chain().setContent(form.values.vn_description).run()
      : editor?.chain().setContent(form.values.en_description).run();
  }

  useEffect(() => {
    if (submit) {
      if (
        responseProject.error === 0 &&
        responseProject.message === 'success'
      ) {
        setOpened(true);
        dispatch(projectsActions.resetResponse());
        setTimeout(() => {
          setOpened(false);
          type === ETypeForm.AddProject
            ? navigate('/home')
            : navigate(`/project-details/${projectId}`);
        }, 1500);
      }
    }
  }, [responseProject]);

  useEffect(() => {
    // Reset when component unmounted
    return () => {
      dispatch(projectsActions.resetResponse());
    };
  }, []);

  const onChangeInput = useCallback(e => {
    if (e.target.value.length > 100) {
      form.setFieldError('nameProject', 'Tên dự án không được quá 100 kí tự');
    } else {
      form.getInputProps('nameProject').onChange(e.target.value);
    }
  }, []);

  return (
    <>
      <Loading
        visible={
          type === ETypeForm.AddProject
            ? responseProject.loading
            : responseProject.updating
        }
      />
      <form
        onSubmit={form.onSubmit(values => handleSubmit(values))}
        className={classes.form}
      >
        <Stack className={classes.stackContainer}>
          <Text className={classes.title}>Thông tin cơ bản</Text>
          <SelectLanguage value={language} onSelect={handleChangeLanguage} />
          <Flex className={classes.flex}>
            <Stack className={classes.stack}>
              <OptimizedInput
                label={t('FormProject.Name of project')}
                form={form}
                field="nameProject"
                require={true}
                placeholder={t('FormProject.Enter project name')}
                onChangeInput={onChangeInput}
              />
              <OptimizedInput
                label={t('FormProject.Publisher')}
                field="publisher"
                form={form}
                require={false}
                placeholder={t('FormProject.Enter publisher name')}
              />
            </Stack>
            <FileUpload
              label={t('FormProject.Avatar')}
              file={file}
              setFile={setFile}
              form={form}
              data={data?.avatar}
              field="avatar"
            />
          </Flex>

          <FilesUploadBanner
            label={t('FormProject.Banner')}
            files={files}
            setFiles={setFiles}
            form={form}
          />
          <Box my={10}>
            <Text className={classes.text}>{t('FormProject.Description')}</Text>
            <RichEditor editor={editor} />
          </Box>
          <OptimizedInput
            label={t('FormProject.Website')}
            field="website"
            form={form}
            require={false}
            placeholder={t('FormProject.Enter website link')}
          />

          <FilledButton type="submit" className={classes.button}>
            {type === ETypeForm.AddProject ? 'Lưu' : 'Sửa'}
          </FilledButton>
        </Stack>

        <PromptForm form={form.isDirty()} />

        <ModalSuccess
          opened={opened}
          setOpened={setOpened}
          title={
            type === ETypeForm.AddProject
              ? 'Thêm dự án thành công !'
              : 'Sửa dự án thành công !'
          }
        />
      </form>
    </>
  );
};

const makeStyles = createStyles(theme => ({
  form: {
    width: '100%',
  },
  flex: {
    gap: 16,
  },
  stack: {
    flex: 1,
    justifyContent: 'space-between',
  },

  stackContainer: {
    gap: 5,
  },
  button: {
    fontSize: '18px !important',
    marginTop: 5,
  },

  text: {
    fontSize: 14,
    fontWeight: 600,
  },

  title: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: 'center',
  },
}));

export default FormProject;
