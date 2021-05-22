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
        },
      });
      yield put({
        type: 'saveNotices',
        payload: JSON.stringify(payload),
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const uid = yield select((state) =>
      state.user.uid)
      firebase.database().ref(`users/${uid}/notifications/${payload}`).update({ read:true });
      const count = yield select((state) =>
        state.user.currentUser.unreadCount)
      firebase.database().ref(`users/${uid}`).update({ unreadCount: count - 1});
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
  },
};
export default GlobalModel;
