import { queryCurrent, queryFakeList, getHistory, getInfo, updateInfo, queryAnswerSheet } from './service';

const Model = {
  namespace: 'accountAndcenter',
  state: {
    currentUser: {},
    list: [],
    storeList: [],
    info: {},
    answerSheet: []
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      console.log(response)
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *fetchHistory(_, { call, put}) {
      const res = yield call(getHistory);
      let i = 0;
      const temp1 = res.test.map(e => {
        e.key = i;
        i++;
        return e
      })
      
      const temp2 = res.practice.map(e => {
        e.key = i;
        i++;
        return e
      })
    

      yield put({
        type: 'queryList',
        payload: {
          test: temp1,
          practice: temp2
        }
      })
    },

    *fetchInfo(_, { call, put}) {
      const res = yield call(getInfo);
      console.log(res);
      yield put({
        type: 'queryInfo',
        payload: res
      })
    },

    *updateFilter({ payload }, { put, select }) {
      var filter = yield select((state) => state.search.filter);
      var list =yield select((state) => state.search.storeList);
    },

    *updateInfo({ payload }, { put, call }) {
      var response = yield call(updateInfo, payload);
      yield put({
        type: 'queryInfo',
        payload: response
      })
    },

    *fetchAnswer({ payload }, { put, call}) {
      var response = yield call(queryAnswerSheet, payload);
      yield put({
        type: 'queryAnswer',
        payload: response
      })
    }
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    queryList(state, action) {
      return { ...state, list: action.payload, filterList: action.payload };
    },

    queryInfo(state, action) {
      return { ...state, info: action.payload };
    },

    queryAnswer(state, action) {
      return { ...state, answerSheet: action.payload };
    }
  },
};
export default Model;
