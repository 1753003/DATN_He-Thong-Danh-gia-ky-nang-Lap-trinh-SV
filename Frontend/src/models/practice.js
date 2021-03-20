import { stringify } from 'querystring';
import { history } from 'umi';
import { getPracticeListDetail } from '@/services/practice'
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'practice',
  state: {
    listDetail: null
  },
  effects: {
    *getPracticeListDetail({ payload }, { call, put }) {
      const listDetail = yield getPracticeListDetail(payload.id)
      yield put({
        type: 'setListDetail',
        payload: {
          listDetail
        },
      })
    }
  },
  reducers: {
    setListDetail(state, { payload }) {
      return { ...state, listDetail: payload.listDetail };
    },
  },
};
export default Model;
