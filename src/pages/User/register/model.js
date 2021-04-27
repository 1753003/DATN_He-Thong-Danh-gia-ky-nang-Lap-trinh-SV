import { Register, ConfirmEmail, ConfirmCode } from './service';

const Model = {
  namespace: 'userRegister',
  state: {
    status: 'start',
    message: '',
    codeMessage: '',
    uid: ''
  },
  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(Register, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },
  reducers: {
    registerHandle(state, { payload }) {
      console.log(payload);
      if (payload.status === 'Ok')
        return { ...state, status: payload.status, uid: payload.uid };
      return { ...state, status: payload.status, message: payload.message };
    },
  },
};
export default Model;
