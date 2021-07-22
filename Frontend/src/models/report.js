// import { queryCurrent, query as queryUsers } from '@/services/user';
import {
  getReportList,
  getSummaryReport,
  getSummaryUser,
  getSummaryQuestion,
  getUserReport,
} from '@/services/report';
import { message } from 'antd';

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
      try {
        const response = yield call(getSummaryUser, payload.id);
        console.log(response);
        yield put({
          type: 'saveSummaryUser',
          payload: response,
        });
      } catch (e) {
        message.error('Something Wrong Happened, Please try Again later !!!');
      }
    },
    *getUserReport({ payload }, { call }) {
      try {
        const response = yield call(getUserReport, payload);
        payload.onSuccess(response);
      } catch (e) {
        message.error('Something Wrong Happened, Please try Again later !!!');
      }
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
