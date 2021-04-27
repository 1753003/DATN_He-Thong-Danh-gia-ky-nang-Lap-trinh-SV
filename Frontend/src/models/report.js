// import { queryCurrent, query as queryUsers } from '@/services/user';
import { getReportList, getSummaryReport, getSummaryUser } from '@/services/report';

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
