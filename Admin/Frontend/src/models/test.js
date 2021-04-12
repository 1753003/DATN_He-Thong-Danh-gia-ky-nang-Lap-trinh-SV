import { getRequest, acceptRequest } from '@/services/test';

const GlobalModel = {
  namespace: 'test',
  state: {
    request: []
  },
  effects: {
    *fetchRequest(_, { call, put  }) {
      const data = yield call(getRequest);
      yield put({
        type: 'saveRequest',
        payload: data,
      });
    },
    *acceptRequest(payload, {call, put, select}) {
        
        const data = yield call(acceptRequest, payload.payload.testID, payload.payload.userID);
        console.log(data);
        yield put({
            type: 'saveRequest',
            payload: data,
          });
    }
  },
  reducers: {
    saveRequest(state, { payload }) {
      return {
        ...state,
        request: payload,
      };
    },

    saveClearedNotices(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return {
        ...state,
        collapsed: false,
        notices: state.notices.filter((item) => item.type !== payload),
      };
    },
  },
};
export default GlobalModel;
