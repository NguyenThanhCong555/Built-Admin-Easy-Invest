import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { getTextFromHtmlString } from 'utils/helpers/getTextFromHtmlString';

import { ReactComponent as ArrowLeft } from 'assets/icons/loginPage/arrow-narrow-left.svg';

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

  const [disable, setDisable] = useState<boolean>(false);

  const [file, setFile] = useState<TFile>({ src: '' });
  const [files, setFiles] = useState<TFile[]>([]);

  const inputRef = useRef<any>([]);

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
        if (value.trim().length <= 0 || !value) return t('FormProject.Please enter project name !');
        if (value.trim().length > 100) return t('FormProject.Project name cannot exceed 100 characters');
        return null;
      },
      publisher: value => {
        if (value.trim().length <= 0 || !value) return t('FormProject.Please enter publisher name !');
        if (value.trim().length > 100) return t('FormProject.Publisher name cannot exceed 100 characters');
        return null;
      },
      cover_photo: value => {
        if (value.length <= 0) return t('FormProject.Please upload at least 1 photo !');
        if (value.length > 5) return t('FormProject.No more than 5 photos can be uploaded');
        return null;
      },
      avatar: value => (!value ? t('FormProject.Please upload at least 1 photo !') : null),
      vn_description: value => {
        if (getTextFromHtmlString(value) === '') return t('FormProject.Please enter a description !');
        return null;
      },
      en_description: value => {
        if (getTextFromHtmlString(value) === '') return t('FormProject.Please enter a description !');
        return null;
      },
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
      if (responseProject.error === 0 && responseProject.message === 'success') {
        setOpened(true);
        dispatch(projectsActions.resetResponse());
        dispatch(projectsActions.resetCalledFirstProjects());
        setTimeout(() => {
          setOpened(false);
          type === ETypeForm.AddProject ? navigate('/home') : navigate(`/project-details/${projectId}`);
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
      form.setFieldError('nameProject', t('FormProject.Project name cannot exceed 100 characters'));
    } else {
      form.getInputProps('nameProject').onChange(e.target.value);
    }
  }, []);

  const isObjectEmpty = objectName => {
    return Object.keys(objectName).length === 0;
  };

  useEffect(() => {
    if (!isObjectEmpty(form.errors) && submit) {
      setSubmit(false);
      const errorFilter = Object.keys(form.errors).filter((item, _) => item !== 'cover_photo' && item !== 'avatar');
      if (errorFilter[0] === 'vn_description' || errorFilter[0] === 'en_description') {
        editor?.chain().focus().run();
      }

      for (var i = 0; i < inputRef.current.length; i++) {
        if (inputRef.current[i].getAttribute('data-label') === errorFilter[0]) {
          inputRef.current[i].focus();
          break;
        }
      }
    }
  }, [form.errors]);

  return (
    <>
      <Loading visible={type === ETypeForm.AddProject ? responseProject.loading : responseProject.updating} />
      <form onSubmit={form.onSubmit(values => handleSubmit(values))} className={classes.form}>
        <Stack className={classes.stackContainer}>
          <Flex className={classes.flexBox}>
            <Box
              className={classes.boxIcon}
              onClick={() => {
                type === 'add' ? navigate('/home') : navigate(`/project-details/${projectId}`);
              }}
            >
              <ArrowLeft />
            </Box>
            <Text className={classes.title}>{t('projectDetail.Basic information')}</Text>
          </Flex>
          <SelectLanguage
            error={
              form.errors.vn_description || form.errors.en_description
                ? t('projectDetail.Please enter full description for Vietnamese and English')
                : false
            }
            value={language}
            onSelect={handleChangeLanguage}
          />
          <Flex className={classes.flex}>
            <Stack className={classes.stack}>
              <OptimizedInput
                label={t('FormProject.Name of project')}
                form={form}
                field="nameProject"
                require={true}
                placeholder={t('FormProject.Enter project name')}
                onChangeInput={onChangeInput}
                ref={el => (inputRef.current[0] = el)}
              />
              <OptimizedInput
                label={t('FormProject.Publisher')}
                field="publisher"
                form={form}
                require={true}
                placeholder={t('FormProject.Enter publisher name')}
              />
            </Stack>
            <FileUpload
              label={t('FormProject.Avatar')}
              file={file}
              setFile={setFile}
              form={form}
              error={form?.errors?.avatar}
              data={data?.avatar}
              field="avatar"
              setDisable={setDisable}
            />
          </Flex>

          <FilesUploadBanner
            label={t('FormProject.Banner')}
            files={files}
            setFiles={setFiles}
            form={form}
            setDisable={setDisable}
          />
          <Box my={10}>
            <Text className={classes.text}>
              {t('FormProject.Description')}
              <Text className={classes.textStar}>{'  *'}</Text>
              <Text className={classes.textError}>
                {language === 'vi' ? form?.errors.vn_description : form?.errors.en_description}
              </Text>
            </Text>
            <RichEditor editor={editor} />
          </Box>
          <OptimizedInput
            label={t('FormProject.Website')}
            field="website"
            form={form}
            require={false}
            placeholder={t('FormProject.Enter website link')}
          />

          <FilledButton type="submit" className={classes.button} onClick={() => setSubmit(true)} disabled={disable}>
            {type === ETypeForm.AddProject ? t('FormProject.Save') : t('FormProject.Edit')}
          </FilledButton>
        </Stack>

        <PromptForm form={form.isDirty()} />

        <ModalSuccess
          opened={opened}
          setOpened={setOpened}
          title={
            type === ETypeForm.AddProject ? t('FormProject.Add successful project !') : t('FormProject.Edit successful project !')
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

  textStar: {
    display: 'inline',
    color: '#fa5252',
  },

  title: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: 'center',
  },

  textError: {
    color: '#fa5252',
    fontSize: 12,
    marginBottom: 3,
    fontWeight: 500,
  },

  flexBox: {
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
  },

  boxIcon: {
    position: 'absolute',
    left: 0,
  },
}));

export default FormProject;
