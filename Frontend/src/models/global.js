import { queryNotices } from '@/services/user';
import firebase from '@/utils/firebase'


const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
  },
  effects: {
    *fetchNotices({payload}, { call, put, select }){
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: payload,
          unreadCount:payload.filter((item) => !item.read).length,
        },
      });
      yield put({
        type: 'saveNotices',
        payload: JSON.stringify(payload),
      });
      // const unreadCount = yield select(
      //   (state) => state.global.notices.filter((item) => !item.read).length,
      // );
      
    },
    

    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select((state) => state.global.notices.length);
      const unreadCount = yield select(
        (state) => state.global.notices.filter((item) => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },

    *changeNoticeReadState({ payload }, { put, select }) {
      firebase.database().ref(`notifications/zcwVw4Rjp7b0lRmVZQt6ZXmspql1/${payload}`).update({ read:true });
      const notices = yield select((state) =>
        state.global.notices.map((item) => {
          const notice = { ...item };

          if (notice.key === payload) {
            notice.read = true;
          }

          return notice;
        }),
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
        },
      });
    },
  },
  reducers: {
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },

    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: JSON.parse(payload),
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
