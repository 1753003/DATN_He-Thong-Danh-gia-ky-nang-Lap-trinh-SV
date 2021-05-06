// import { queryCurrent, query as queryUsers } from '@/services/user';

import { getTestListBySet } from "@/services/testDev";

const TestModel = {
  namespace: 'testDev',
  state: {
    setList: [],
  },
  effects: {
    *fetchTestListBySet({payload}, { call, put }) {
      const response = yield getTestListBySet(payload.split(' ')[0]);
      yield put({
        type: 'saveTestList',
        payload: response,
      });
    },
    
  },
  reducers: {
    saveTestList(state, { payload }) {
      return { ...state, setList: [...payload] };
    },
    saveTestById(state, { payload }) {
      return { ...state, testById: payload };
    },
  },
};
export default TestModel;
