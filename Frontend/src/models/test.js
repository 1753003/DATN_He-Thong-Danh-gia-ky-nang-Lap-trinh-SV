// import { queryCurrent, query as queryUsers } from '@/services/user';
import { getTestList, getTestById } from '@/services/test';

const TestModal = {
  namespace: 'test',
  state: {
    testList: [],
    testById: {},
  },
  effects: {
    *fetchTestList(_, { call, put }) {
      const response = yield call(getTestList);
      yield put({
        type: 'saveTestList',
        payload: response,
      });
    },
    *getTestByIdModel({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(getTestById, payload.id);
      console.log(response);
      yield put({
        type: 'saveTestById',
        payload: response,
      });
    },
  },
  reducers: {
    saveTestList(state, { payload }) {
      return { ...state, testList: [...payload] };
    },
    saveTestById(state, { payload }) {
      return { ...state, testById: payload };
    },
  },
};
export default TestModal;
