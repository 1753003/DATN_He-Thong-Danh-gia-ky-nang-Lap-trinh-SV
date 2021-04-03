import { search } from '@/services/search'

const Model = {
  namespace: 'search',
  state: {
    list:[]
  },
  effects: {
    *getSearchList({ payload }, { put }){
      const data = yield search(payload)
      yield put({
        type:'setList',
        payload: data
      })
    }
  },
  reducers: {
    setList(state, { payload }) {
      return { ...state, list: payload };
    },
  }
};

export default Model;
