import { stringify } from 'querystring';
import { history } from 'umi';
import { getPracticeListDetail } from '@/services/practice'
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'practice',
  state: {
    listDetail: null,
    isRun: false,
    isSubmit: false,
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
    },
    *changeStatusRun(_, {put}) {
      yield put({
        type: 'setIsRun',
      })
    },
    *changeStatusSubmit(_, {put}) {
      yield put({
        type: 'setIsSubmit',
      })
    },
  },
  reducers: {
    setListDetail(state, { payload }) {
      return { ...state, listDetail: payload.listDetail };
    },
    setIsRun(state) {
      return { ...state, isRun: !state.isRun };
    },
    setIsSubmit(state) {
      return { ...state, isSubmit: !state.isSubmit };
    },
  },
};
export default Model;
