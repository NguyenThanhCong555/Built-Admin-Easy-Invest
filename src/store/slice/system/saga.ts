import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import { apiGet, apiGetV2, apiPost } from 'utils/http/request';
import { systemActions as actions } from '.';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';

import { selectAuth } from '../auth/selectors';

export function* systemSaga() {}
