import { ForgotPassword } from './service';

const Model = {
  namespace: 'forgotPassword',
  state: {
    status: '',
    message: '',
    codeMessage: '',
    uid: ''
  },
  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(ForgotPassword, payload);
      yield put({
        type: 'handle',
        payload: response,
      });
    },
  },
  reducers: {
    handle(state, { payload }) {
      console.log(payload);
      if (payload.status === 'Ok')
        return { ...state, status: payload.status};
      return { ...state, status: payload.status, message: payload.message };
    },
  },
};
export default Model;
