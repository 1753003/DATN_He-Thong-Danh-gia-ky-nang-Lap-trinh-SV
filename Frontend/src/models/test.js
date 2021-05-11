// import { queryCurrent, query as queryUsers } from '@/services/user';
import { getTestList, getTestById, createNewTest } from '@/services/test';
import { createSubmission, createSubmissionBatch, getSubmission, getSubmissionBatch } from '@/services/judge0'
import { u_atob, u_btoa } from '@/utils/string';
const TestModel = {
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
          var temp = [];
          console.log(e.QuestionType)
          if (e.QuestionType === "MultipleChoice")
            temp = [];
          else
            temp = "";
          answerList.push({
            id: e.ID,
            data: temp
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

      current = payload;

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
      console.log(payload)
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
    },
    *submitTest({payload},{put, call, select}) {
      let data = {};
      yield select((state) => {
        data.test = state.test.testById;
        data.answer = state.test.answer;
      })
      let count = 0;
      console.log(data.test.listQuestion)
      let listAnswer = [];
      for (let e of data.test.listQuestion) {
        if (e.QuestionType === "Code") {
          let batch_Submission = [];   
          let code = data.answer[count].data;
          let lang_id = 54; //54 C++ 71 python
          code = code.replace(/(^")|("$)/g, '');
          code = u_btoa(code);
          for (var tc of e.TestCase) {
            // console.log(tc.Input[0])
            var input = tc.Input[0];
            var expected_output = tc.Output[0];
            let data = {
              source_code: code,
              language_id: lang_id,
              stdin: u_btoa(input),
              expected_output: u_btoa(expected_output),
            };
            batch_Submission.push(data);
          }
          const batch = {
            submissions: batch_Submission,
          };
      
          const send = {
            submissions: batch.submissions
          }
          const res = yield createSubmissionBatch(send)
          
          const token_batch = []
          for(var tk of res){
            token_batch.push(tk.token)
          }
          const token = token_batch.join(',')
  
          let result = yield getSubmissionBatch(token)
          result = JSON.parse(JSON.stringify(result, function (key, value) {
            return (value == null) ? "" : value
          }));        

          let RunningTime = 0;
          let MemoryUsage = 0;
          let OutputTestcase = [];
          let TestCasePassed = [];

          let i = 0;

          result.submissions.forEach(item => {
            console.log(item.time)
            if (item.expected_output === item.stdout)
              TestCasePassed.push(i);
            i++;
            OutputTestcase.push(item.stdout);
            RunningTime += parseFloat(item.time);
            MemoryUsage += parseInt(item.memory)
          })

          console.log(RunningTime)
          RunningTime /= 3;
          MemoryUsage /= 3;

          listAnswer[count] = {
            Type: "Code",
            DescriptionCode: code,
            UsedLanguage: lang_id,
            RunningTime,
            MemoryUsage,
            OutputTestcase,
            TestCasePassed
          }
        }
        else if (e.QuestionType === "MultipleChoice") {
          listAnswer[count] = {
            Type: "MultipleChoice",
            QuestionID: data.answer[count].id,
            Choice: data.answer[count].data
          }
        }
        count++;
      }

      console.log(listAnswer)
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
export default TestModel;
