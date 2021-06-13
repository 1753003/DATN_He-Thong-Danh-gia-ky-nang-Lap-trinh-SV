// import { queryCurrent, query as queryUsers } from '@/services/user';

import { getTestListBySet } from "@/services/testDev";

const TestModel = {
  namespace: 'testDev',
  state: {
    setList: [],
  },
  effects: {
    *fetchTestListBySet({payload}, { call, put }) {
      const response = yield getTestListBySet(payload.listname.split(' ')[0]);
    
      payload.Callback(response)
      payload.Callback1(response)
      payload.Callback2(response)
      payload.Callback3(response)
      yield put({
        type: 'saveTestList',
        payload: response,
      });
    },
    
  },
  reducers: {
    saveTestList(state, { payload }) {
      console.log("reducers")
      return { ...state, setList: [...payload] };
    },
    saveTestById(state, { payload }) {
      return { ...state, testById: payload };
    },
  },
};
export default TestModel;
