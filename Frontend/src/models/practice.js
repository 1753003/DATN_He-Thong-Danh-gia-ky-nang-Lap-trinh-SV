import { stringify } from 'querystring';
import { history } from 'umi';
import { getPracticeListDetail, getSubmissionList, getPracticeSet } from '@/services/practice'
import { saveSubmission } from '@/services/practice';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'practice',
  state: {
    listDetail: null,
    isRun: false,
    isSubmit: false,
    submissions: null,
    currentSubmission: null,
    currentQuestionID: null,
    tabChange:false,
    list:null
  },
  effects: {
    *getPracticeSetList({ payload }, { call, put,select }){
      const data = yield getPracticeSet(payload)
      yield put({
        type:'setList',
        payload: data
      })
    },
    *getSubmissionList({ payload }, { call, put }) {
      let uid = 'zcwVw4Rjp7b0lRmVZQt6ZXmspql1'
      let pid = payload
      const listSubmission = yield getSubmissionList(pid, uid)
      yield put({
        type:'saveSubmissionList',
        payload: listSubmission
      })
    },
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
    *setCurrentSubmission({payload}, {put}) {
      yield put({
        type: 'changeCurrentSubmission',
        payload:payload
      })
    },
    *setOnTabChange({payload}, {put}) {
      yield put({
        type: 'changeTab',
        payload:payload
      })
    },
  },
  reducers: {
    setListDetail(state, { payload }) {
      return { ...state, listDetail: payload.listDetail };
    },
    setList(state, { payload }) {
      return { ...state, list: payload };
    },
    setIsRun(state, {payload}) {
      return { ...state, isRun: payload, isSubmit: !payload };
    },
    setIsSubmit(state, {payload}) {
      return { ...state, isRun: !payload, isSubmit: payload };
    },
    saveSubmissionList(state,{payload}) {
      return { ...state, submissions: payload };
    },
    changeCurrentSubmission(state,{payload}) {
      return { ...state, currentSubmission: payload };
    },
    changeTab(state,{payload}) {
      return { ...state, tabChange: payload };
    }
  },
};
export default Model;
