import { queryCurrent, queryFakeList, getHistory, getInfo } from './service';

const Model = {
  namespace: 'accountAndcenter',
  state: {
    currentUser: {},
    list: [],
    info: {},
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
      //console.log(res);
      yield put({
        type: 'queryList',
        payload: res
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
      var newList = [];

    }
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    queryList(state, action) {
      return { ...state, list: action.payload };
    },

    queryInfo(state, action) {
      return { ...state, info: action.payload };
    }
  },
};
export default Model;
