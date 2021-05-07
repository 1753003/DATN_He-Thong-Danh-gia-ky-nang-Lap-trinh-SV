// import { queryCurrent, query as queryUsers } from '@/services/user';
import { getTestList, getTestById, createNewTest } from '@/services/test';

const TestModal = {
  namespace: 'test',
  state: {
    testList: [],
    testById: {},
    question: 0,
    answer: []
  },
  effects: {
    *fetchTestList(_, { call, put }) {
      const response = yield call(getTestList);
      yield put({
        type: 'saveTestList',
        payload: response,
      });
    },
    *getTestByIdModel({ payload }, { call, put }) {
      const response = yield call(getTestById, payload.id);
     
      yield put({
        type: 'saveTestById',
        payload: response,
      });
    },
    *getTestByID({ payload }, {put, call, select}){
      const response = yield call(getTestById, payload.id);
     
      yield put({
        type: 'saveTestById',
        payload: response,
      });
      const answerList = [];
      yield select((state) => {
        state.test.testById.listQuestion.forEach(e=>{
          answerList.push({
            id: e.ID,
            data: []
          });
        })
      });
    
      yield put({
        type: 'resetAnswerReducer',
        payload: answerList
      })
    },
    *createTest({ payload }, { call }) {
      const response = yield call(createNewTest, payload);
    },
    *changeQuestion({payload}, { put, select }) {
      var current = 0;
      yield select((state) => {
        current = state.test.question;
      });

      if (payload === 'next')
        current++;
      else
        current--;

      yield put({
        type: 'updateQuestion',
        payload: current
      })
    },
    *updateAnswer({payload}, { put, select }) {
      var answerList = [];
      yield select(state => {
        answerList = state.test.answer
      })
      var count = 0;
      answerList.forEach(e => {
        if (e.id === payload.id) {
          e.data = payload.data
        }
        count++;
      })
      
      console.log(answerList)
      yield put({
        type: 'updateAnwserList',
        payload: answerList
      })
    }
  },
  reducers: {
    saveTestList(state, { payload }) {
      return { ...state, testList: [...payload] };
    },
    saveTestById(state, { payload }) {
      return { ...state, testById: payload };
    },
    resetAnswerReducer(state, {payload}) {
      return { ...state, answer: payload}
    },
    updateQuestion(state, {payload}) {
      return { ...state, question: payload}
    },
    updateAnswerList(state, {payload}) {
      return { ...state, anwser: payload}
    }
  },
};
export default TestModal;
