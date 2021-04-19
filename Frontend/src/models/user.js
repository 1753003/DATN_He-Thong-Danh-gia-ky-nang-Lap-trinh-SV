import { queryCurrent, query as queryUsers } from '@/services/user';
import firebase from '@/utils/firebase'
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {
    },
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    
    *fetchCurrent(_, { call, put }) {
      const userRef = firebase.database().ref(`users/zcwVw4Rjp7b0lRmVZQt6ZXmspql1`)
      const currentUser = yield call(()=>{
        return new Promise((resolve, reject)=>{
          userRef.on('value', (snapshot)=>{
            resolve(snapshot.val())
          })
        })
      })
      yield put({
        type:'saveCurrentUser',
        payload: currentUser
      })
    }
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
        },
      };
    },
  },
};
export default UserModel;
