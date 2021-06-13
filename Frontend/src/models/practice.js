import { getPracticeListDetail, getSubmissionList, getPracticeSet, submitMultipleChoice, getSubmissionDetailInfo } from '@/services/practice'


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
    list:[],
    mulitpleChoiceResponse:null
  },
  effects: {
    *getSubmissionDetail({ payload }, { call, put,select }){
      let data = null

      if(payload.submission.SubmissionType ==="Coding")
        data = yield getSubmissionDetailInfo(payload.submission.SubmissionID, "coding")
      else{
        data = yield getSubmissionDetailInfo(payload.submission.SubmissionID, "multiplechoice")
      }
      yield put({
        type:'changeCurrentSubmission',
        payload: {data, info:payload.submission}
      })
    },
    *submitAnswerMultipleChoice({ payload }, { call, put,select }){

      const data = yield submitMultipleChoice(payload)
      yield put({
        type:'saveMultipleChoiceResponse',
        payload: data
      })
    },
    *getPracticeSetList({ payload }, { call, put,select }){
      const data = yield getPracticeSet(payload.listName)
      payload.callback(data);
      payload.callback1(data);
      payload.callback2(data);
      payload.callback3(data);
      yield put({
        type:'setList',
        payload: data
      })
    },
    *getSubmissionList({ payload }, { call, put }) {
      let pid = payload
      const listSubmission = yield getSubmissionList(pid)

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
    },
    saveMultipleChoiceResponse(state,{payload}) {
      return { ...state, mulitpleChoiceResponse: payload };
    },
  },
};
export default Model;
