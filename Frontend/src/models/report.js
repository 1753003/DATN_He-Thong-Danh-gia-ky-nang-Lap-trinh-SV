// import { queryCurrent, query as queryUsers } from '@/services/user';
import {
  getReportList,
  getSummaryReport,
  getSummaryUser,
  getSummaryQuestion,
} from '@/services/report';

const ReportModel = {
  namespace: 'report',
  state: {
    testList: [],
    testById: {},
  },
  effects: {
    *fetchReportList(_, { call, put }) {
      const response = yield call(getReportList);
      yield put({
        type: 'saveReportList',
        payload: response,
      });
    },
    *getSummaryReportById({ payload }, { call, put }) {
      const response = yield call(getSummaryReport, payload.id);
      console.log(response);
      yield put({
        type: 'saveSummaryReport',
        payload: response,
      });
    },
    *getSummaryUserById({ payload }, { call, put }) {
      const response = yield call(getSummaryUser, payload.id);
      console.log(response);
      yield put({
        type: 'saveSummaryUser',
        payload: response,
      });
    },
    *getSummaryQuestionById({ payload }, { call, put }) {
      console.log('ehllo');
      const response = yield call(getSummaryQuestion, payload.id);
      console.log(response);
      payload?.callback(response);
    },
  },
  reducers: {
    saveReportList(state, { payload }) {
      return { ...state, reportList: [...payload] };
    },
    saveSummaryReport(state, { payload }) {
      return { ...state, summaryReport: payload };
    },
    saveSummaryUser(state, { payload }) {
      return { ...state, summaryUser: payload };
    },
  },
};
export default ReportModel;
