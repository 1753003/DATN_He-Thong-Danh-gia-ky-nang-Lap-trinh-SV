import { stringify } from 'querystring';
import { history } from 'umi';
import { createSubmission, createSubmissionBatch, getSubmission, getSubmissionBatch } from '@/services/judge0'
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { saveSubmission } from '@/services/practice';

const Model = {
  namespace: 'judge',
  state: {
    isDone: true,
    token: null,
    result: null,
    savetoDb: null,
  },
  effects: {
    *sendCode({ payload }, { call, put }) {
      yield put({
        type: 'setResult',
        payload : null
      })
      yield put({
        type: 'practice/setIsRun',
        payload : true
      })
      yield put({
        type: 'setDone',
      })
      const res = yield createSubmission(payload)
      yield put({
        type: 'setToken',
        payload: res.token
      })
      let data =null;
      // console.log(payload, state.isDone)
      
      data = yield getSubmission(res.token)
      data = JSON.parse(JSON.stringify(data, function (key, value) {
        return (value == null) ? "" : value
      }));
      // console.log('res',res)
      yield put({
        type: 'setResult',
        payload: data
      })
      yield put({
        type: 'setDone',
      })
      
    },
    *sendCodeBatch({ payload }, { call, put, select }) {
      console.log('fasdd', payload)
      yield put({
        type: 'setResult',
        payload: null
      })
      yield put({
        type: 'practice/setIsSubmit',
        payload : true
      })
      yield put({
        type: 'setDone',
      })
      const send = {
        submissions: payload.submissions
      }
      const res = yield createSubmissionBatch(send)
      
      const token_batch= []
      for(var tk of res){
        token_batch.push(tk.token)
      }
      const token = token_batch.join(',')

      yield put({
        type: 'setToken',
        payload: token
      })
      let data = yield getSubmissionBatch(token)
      data = JSON.parse(JSON.stringify(data, function (key, value) {
        return (value == null) ? "" : value
      }));
      yield put({
        type: 'setResult',
        payload: data
      })

      yield put({
        type: 'setDone',
      })
      //savedb
      const state = yield select(state => state.judge)

      yield saveSubmission(payload.pid,state.result.submissions)
    },
    
  },
  reducers: {
    setDataDB(state, {payload}){
      console.log('dsjahfklashglksdf')
      return { ...state, saveToDb: payload };
    },
    setToken(state, {payload}) {
      return { ...state, token: payload.token};
    },
    setDone(state) {
      return { ...state, isDone:!state.isDone };
    },
    setResult(state, { payload}) {
      return { ...state, result: payload };
    },
  },
};
export default Model;
