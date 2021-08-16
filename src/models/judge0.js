
import { createSubmission, createSubmissionBatch, getSubmission, getSubmissionBatch } from '@/services/judge0'
import { saveSubmissionCoding } from '@/services/practice';

const Model = {
  namespace: 'judge',
  state: {
    isDone: true,
    token: null,
    result: null,
    savetoDb: null,
    codeVal:""
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
      console.log(payload)
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
     
      yield put({
        type: 'setResult',
        payload: data
      })
      yield put({
        type: 'setDone',
      })
      
    },
    *sendCodeBatch({ payload }, { call, put, select }) {
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
      console.log(state.result
        .submissions)
      yield saveSubmissionCoding(payload.pid,state.result.submissions)
    },
    *clearState(_, {put}) {
      yield put({
        type: 'clearJudge',
      })
    }
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
    setCodeValue(state, payload) {
      console.log("set", payload)
      return { ...state, codeVal:payload.payload };
    },
    setResult(state, { payload}) {
      return { ...state, result: payload };
    },
    clearJudge(state, _) {
      console.log("ABC")
      return { ... state, isDone: true,
    token: null,
    result: null,
    savetoDb: null, }
    }
  },
};
export default Model;
