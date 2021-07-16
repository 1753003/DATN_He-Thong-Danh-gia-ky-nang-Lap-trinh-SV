import { getTestListBySet, getRanking } from "@/services/testDev";

const TestModel = {
  namespace: 'testDev',
  state: {
    setList: [],
    rankList: []
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
    *fetchRankList({payload}, { call, put }) {
      console.log("model")
      const response = yield call(getRanking, payload);
      yield put({
        type: 'saveRanking',
        payload: response,
      });
    }
  },
  reducers: {
    saveTestList(state, { payload }) {
      return { ...state, setList: [...payload] };
    },
    saveTestById(state, { payload }) {
      return { ...state, testById: payload };
    },
    saveRanking(state, { payload }) {
      return { ...state, rankList: payload };
    }
  },
};
export default TestModel;
