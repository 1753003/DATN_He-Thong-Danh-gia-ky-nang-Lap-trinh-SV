import { queryCurrent, query as queryUsers } from '@/services/user';
import firebase from '@/utils/firebase'
const UserModel = {
  namespace: 'user',
  state: {
    uid:"zcwVw4Rjp7b0lRmVZQt6ZXmspql1", //need get this each time user load page
    currentUser: {
      react: {}
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
    
    *fetchCurrent({payload}, { call, put }) {
      const uid = payload
      const totalNotiCount = firebase.database().ref(`users/${uid}/totalNotiCount`)
      const unReadCount = firebase.database().ref(`users/${uid}/unreadCount`)
      const reactRef = firebase.database().ref(`users/${uid}/react`)
      const notiCount = yield call(()=>{ return new Promise((resolve, reject)=>{
          totalNotiCount.on('value', (snapshot)=>{
            resolve(snapshot.val())
          })
        })
      })
      const unread = yield call(()=>{ return new Promise((resolve, reject)=>{
          unReadCount.on('value', (snapshot)=>{
            resolve(snapshot.val())
          })
        })
      })
      const react = yield call(()=>{ return new Promise((resolve, reject)=>{
          reactRef.on('value', (snapshot)=>{
            resolve(snapshot.val())
          })
        })
      })
      //   const getData = yield call(()=>{
      //     return new Promise((resolve, reject)=>{
      //     Promise.all([notiCount, react, unread]).then(values => {
      //       // console.log(values);
      //       resolve(values)
      //     }).catch(reason => {
      //       console.log(reason)
      //     });
          
      //   }) 
      // })

        const currentUser = {
          totalNotiCount: notiCount,
          unreadCount: unread,
          react: react
        }
        // console.log(currentUser)
        yield put({
          type:'saveCurrentUser',
          payload: currentUser
        })
    }
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {react:{}} };
    },
    editCurrentUserReact(state,{payload}) {
      return { ...state, currentUser: {react:{...state.currentUser.react, payload}} };
    },
    changeNotifyCount(
      state = {
        currentUser: {
          react:{}
        },
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
