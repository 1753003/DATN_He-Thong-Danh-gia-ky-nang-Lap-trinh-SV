import { stringify } from 'querystring';
import { history } from 'umi';
import { createSubmission, createSubmissionBatch, getSubmission, getSubmissionBatch } from '@/services/judge0'
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'judge',
  state: {
    isDone: false,
    token: null,
    result: null
  },
  effects: {
    *sendCode({ payload }, { call, put }) {
      const res = yield createSubmission(payload)
      yield put({
        type: 'setToken',
        payload: res.token
      })
      yield put({
        type: 'setDone',
      })
    },
    *sendCodeBatch({ payload }, { call, put }) {
      const res = yield createSubmissionBatch(payload)
      // console.log(res)
      const token_batch= []
      for(var tk of res){
        token_batch.push(tk.token)
      }
      const token = token_batch.join(',')
      // console.log(token)
      yield put({
        type: 'setToken',
        payload: token
      })
      yield put({
        type: 'setDone',
      })
    },
    *getResult(isBatch, { call, put, select }){
      yield put({
        type: 'setDone',
      })
      const state = yield select(state => state.judge)
      let res =null;

      if(!isBatch.payload)
        res = yield getSubmission(state.token)
      else
        res = yield getSubmissionBatch(state.token)
      res = JSON.parse(JSON.stringify(res, function (key, value) {
        return (value == null) ? "" : value
      }));
      // console.log('res',res)
      yield put({
        type: 'setResult',
        payload: res
      })
      // yield put({
      //   type: 'practice/setIsRun'
      // })
    },
    
  },
  reducers: {
    setToken(state, { payload }) {
      return { ...state, token: payload};
    },
    setDone(state) {
      return { ...state, isDone:!state.isDone };
    },
    setResult(state, { payload }) {
      return { ...state, result: payload };
    },
  },
};
export default Model;
