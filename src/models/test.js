// import { queryCurrent, query as queryUsers } from '@/services/user';
import {
  getTestList,
  getTestById,
  createNewTest,
  postSubmission,
  checkSubmission,
  updateEditedTest,
  getTestIdByCode,
  deleteTest,
  getTestInformationById,
  getTestBankList,
  getTestBankById,
  inviteUserByEmail,
  getInvitedEmail,
} from '@/services/test';
import { checkSession, deleteSession } from '@/services/session';

import moment from 'moment';
import {
  createSubmission,
  createSubmissionBatch,
  getSubmission,
  getSubmissionBatch,
} from '@/services/judge0';
import { u_atob, u_btoa } from '@/utils/string';
import { history } from 'umi';
const TestModel = {
  namespace: 'test',
  state: {
    testInfo: {},
    testList: [],
    testBankList: [],
    testById: {},
    question: 0,
    answer: [],
    time: '',
    start: '',
    timeINT: '',
    isDid: false,
    isOut: false,
    isValid: true,
    loading: true,
    permission: true,
    statusFromCode: null,
  },
  effects: {
    *getTestIdFromCode({ payload }, { call, put }) {
      const response = yield call(getTestIdByCode, payload);
      yield put({
        type: 'saveStatusFromCode',
        payload: response,
      });
      if (response !== -1)
        history.push({
          pathname: '/developer/test/questions',
          state: { id: response, type: 'undefined' },
        });
    },
    *fetchTestList(_, { call, put }) {
      const response = yield call(getTestList);
      yield put({
        type: 'saveTestList',
        payload: response,
      });
    },
    *fetchTestBankList(_, { call, put }) {
      const response = yield call(getTestBankList);
      yield put({
        type: 'saveTestBankList',
        payload: response,
      });
    },
    *getTestByIdModel({ payload }, { call, put }) {
      try {
        const response = yield call(getTestById, payload.id);
        yield put({
          type: 'saveTestById',
          payload: response,
        });
        if (payload.callback) {
          payload.callback(response);
        }
      } catch (e) {
        console.log(e);
        if (payload.callback) {
          payload.callback(undefined);
        }
      }
    },
    *getTestBankByIdModel({ payload }, { call, put }) {
      try {
        const response = yield call(getTestBankById, payload.id);
        if (payload.callback) {
          payload.callback(response);
        }
      } catch (e) {
        console.log(e);
        if (payload.callback) {
          payload.callback(undefined);
        }
      }
    },
    *getTestByID({ payload }, { put, call, select }) {
      if (payload.id.toString().localeCompare(' ') == -1) {
        yield put({
          type: 'saveIsValid',
          payload: false,
        });
      } else {
        const checkSubmit = yield call(checkSubmission, payload.id);
        const response = yield call(getTestById, payload.id);

        console.log('Error:', response.error, response.error.localeCompare('none'));
        if (response.error.localeCompare('none') != 1) {
          console.log('BB');
          if (response.generalInformation.Again === 0 && checkSubmit) {
            yield put({
              type: 'saveIsDid',
              payload: true,
            });
          } else {
            const check = yield call(checkSession, {
              TestID: payload.id,
              Timed: moment(),
            });

            yield put({
              type: 'saveTestById',
              payload: response,
            });
            const answerList = [];
            yield select((state) => {
              state.test.testById.listQuestion.forEach((e) => {
                var temp = [];
                console.log(e.QuestionType);
                if (e.QuestionType === 'MultipleChoice') temp = [];
                else temp = '';
                answerList.push({
                  id: e.ID,
                  data: temp,
                });
              });
            });

            yield put({
              type: 'resetAnswerReducer',
              payload: answerList,
            });

            let timeArr = response.generalInformation.TestTime.split(':');
            let time;

            if (check.check) {
              let temp = moment(check.timed);
              time = temp.add(
                parseInt(timeArr[0] * 60) + parseInt(timeArr[1]) + parseFloat(timeArr[2] / 60),
                'minutes',
              );
            } else
              time = moment().add(
                parseInt(timeArr[0] * 60) + parseInt(timeArr[1]) + parseFloat(timeArr[2] / 60),
                'minutes',
              );

            if (check.check && !checkSubmit)
              yield put({
                type: 'saveIsOut',
                payload: true,
              });
            let now = moment();
            yield put({
              type: 'resetTime',
              payload: time,
            });

            yield put({
              type: 'saveStartTime',
              payload: now,
            });

            yield put({
              type: 'saveTimeINT',
              payload: timeArr,
            });
          }
        } else {
          console.log('AA');
          yield put({
            type: 'savePermissions',
            payload: false,
          });
        }
      }

      yield put({
        type: 'saveLoading',
        payload: false,
      });
    },
    *getTestInformation({ payload }, { put, call }) {
      const response = yield call(getTestInformationById, payload);
      yield put({
        type: 'saveTestInfo',
        payload: response,
      });
    },
    *createTest({ payload }, { call }) {
      try {
        yield call(createNewTest, payload);
      } catch (e) {
        console.log(e);
      }
    },
    *inviteUser({ payload }, { call }) {
      try {
        yield call(inviteUserByEmail, payload);
        payload?.onSuccess();
      } catch (e) {
        payload?.onFail();
      }
    },
    *getInvitedEmailList({ payload }, { call }) {
      try {
        const response = yield call(getInvitedEmail, payload);
        console.log(response);
        payload?.onSuccess(response);
      } catch (e) {
        payload?.onFail();
      }
    },
    *deleteTest({ payload }, { call }) {
      try {
        yield call(deleteTest, payload);
        payload?.onSuccess();
      } catch (e) {
        payload?.onFail();
      }
    },
    *updateTest({ payload }, { call }) {
      try {
        yield call(updateEditedTest, payload);
      } catch (e) {
        console.log(e);
      }
    },
    *changeQuestion({ payload }, { put, select }) {
      var current = 0;
      yield select((state) => {
        current = state.test.question;
      });

      current = payload;

      yield put({
        type: 'updateQuestion',
        payload: current,
      });
    },
    *updateAnswer({ payload }, { put, select }) {
      var answerList = [];
      yield select((state) => {
        answerList = state.test.answer;
      });
      var count = 0;
      console.log(payload);
      answerList.forEach((e) => {
        if (e.id === payload.id) {
          e.data = payload.data;
        }
        count++;
      });

      console.log(answerList);
      yield put({
        type: 'updateAnwserList',
        payload: answerList,
      });
    },
    *submitTest({ payload }, { put, call, select }) {
      let data = {};
      const now = moment();
      yield select((state) => {
        data.test = state.test.testById;
        data.answer = state.test.answer;
        data.start = state.test.start;
      });
      let count = 0;
      let listAnswer = [];
      let score = 0;
      let numCorrect = 0;
      let numAnswer = 0;
      for (let e of data.test.listQuestion) {
        if (e.QuestionType === 'Code') {
          let batch_Submission = [];
          let code = data.answer[count].data === '' ? 'none' : data.answer[count].data;
          let lang_id = 54; //54 C++ 71 python
          code = code.replace(/(^")|("$)/g, '');
          code = u_btoa(code);

          if (data.answer[count].data !== '') numAnswer++;
          for (var tc of e.TestCase) {
            // console.log(tc.Input[0])
            var input = tc.Input;
            var expected_output = tc.Output;
            console.log(tc.Input, tc.Input[0], u_btoa(input));
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
            submissions: batch.submissions,
          };
          const res = yield createSubmissionBatch(send);

          const token_batch = [];
          for (var tk of res) {
            token_batch.push(tk.token);
          }
          const token = token_batch.join(',');

          let result = yield getSubmissionBatch(token);

          result = JSON.parse(
            JSON.stringify(result, function (key, value) {
              return value == null ? '' : value;
            }),
          );

          let RunningTime = 0;
          let MemoryUsage = 0;
          let OutputTestcase = [];
          let TestCasePassed = [];

          let i = 0;
          console.log(result.submissions);
          result.submissions.forEach((item) => {
            if (item.expected_output === item.stdout) TestCasePassed.push(i);
            i++;
            OutputTestcase.push(item.stdout);
            RunningTime += parseFloat(item.time);
            MemoryUsage += parseInt(item.memory);
          });

          RunningTime /= result.submissions.length;
          MemoryUsage /= result.submissions.length;

          listAnswer[count] = {
            Type: 'Code',
            DescriptionCode: code,
            UsedLanguage: lang_id,
            RunningTime,
            MemoryUsage,
            OutputTestcase,
            TestCasePassed,
            QuestionID: data.answer[count].id,
          };

          if (TestCasePassed.length === OutputTestcase.length) {
            score += e.Score;
            numCorrect++;
          }
        } else if (e.QuestionType === 'MultipleChoice') {
          let Choice = [];
          for (let item of data.answer[count].data) {
            if (data.test.listQuestion[count].Answer.indexOf(item) != -1) {
              Choice.push(data.test.listQuestion[count].Answer.indexOf(item));
            }
          }

          if (Choice.length !== 0) {
            numAnswer++;
            console.log(Choice);
          }
          listAnswer[count] = {
            Type: 'MultipleChoice',
            QuestionID: data.answer[count].id,
            Choice: Choice,
          };
        }
        count++;
      }

      const countdown = moment(now.diff(data.start)).utc();
      const hours = countdown.format('HH');
      const minutes = countdown.format('mm');
      const seconds = countdown.format('ss');
      const time = hours + ':' + minutes + ':' + seconds;

      console.log({
        TestID: data.test.generalInformation.TestID,
        AnsweredNumber: numAnswer,
        CorrectPercent: numCorrect / data.test.listQuestion.length,
        DoingTime: time,
        Score: score,
        ListAnswer: listAnswer,
      });

      yield call(postSubmission, {
        TestID: data.test.generalInformation.TestID,
        AnsweredNumber: numAnswer,
        CorrectPercent: numCorrect,
        DoingTime: time,
        Score: score,
        ListAnswer: listAnswer,
      });
    },
    *resetModel(_, { put }) {
      yield put({
        type: 'resetReducer',
        payload: {},
      });
    },
    *removeSession({ payload }, { call }) {
      yield call(deleteSession, payload);
    },
  },
  reducers: {
    saveStatusFromCode(state, { payload }) {
      return { ...state, statusFromCode: payload };
    },
    saveTestList(state, { payload }) {
      return { ...state, testList: [...payload] };
    },
    saveTestBankList(state, { payload }) {
      return { ...state, testBankList: [...payload] };
    },
    saveTestById(state, { payload }) {
      return { ...state, testById: payload };
    },
    saveTestInfo(state, { payload }) {
      return { ...state, testInfo: payload };
    },
    resetAnswerReducer(state, { payload }) {
      return { ...state, answer: payload };
    },
    updateQuestion(state, { payload }) {
      return { ...state, question: payload };
    },
    updateAnswerList(state, { payload }) {
      return { ...state, anwser: payload };
    },
    resetTime(state, { payload }) {
      console.log(payload);
      return { ...state, time: payload };
    },
    saveStartTime(state, { payload }) {
      return { ...state, start: payload };
    },
    saveTimeINT(state, { payload }) {
      return { ...state, timeINT: payload };
    },
    saveIsDid(state, { payload }) {
      return { ...state, isDid: payload };
    },
    saveIsValid(state, { payload }) {
      return { ...state, isValid: payload };
    },
    saveIsOut(state, { payload }) {
      return { ...state, isOut: payload };
    },
    saveLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    savePermissions(state, { payload }) {
      return { ...state, permission: payload };
    },
    resetReducer(state, { payload }) {
      return {
        ...state,
        time: '',
        testById: {},
        question: 0,
        answer: [],
        start: '',
        timeINT: '',
        isDid: false,
        isOut: false,
        permission: true,
      };
    },
  },
};
export default TestModel;
