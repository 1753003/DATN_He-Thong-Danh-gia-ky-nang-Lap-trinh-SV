import { query as queryUsers, queryInviteList } from '@/services/user';
import firebase from '@/utils/firebase'
import Cookies from 'js-cookie';
import jwt from 'jwt-decode'

const UserModel = {
  namespace: 'user',
  state: {
    uid:"", //need get this each time user load page
    currentUser: {
      react: {}
    },
    inviteList:[],
  },
  effects: {
    *fetch(_, { call, put }) {
      const token = Cookies.get('accessToken');
      const user = jwt(token);
      console.log(user.uid)
      yield put({
        type: 'saveUid',
        payload: user.uid,
      });
    },
    *fetchCurrent({payload}, { call, put }) {
      const inviteList = yield call(queryInviteList);
      yield put({
        type: 'saveInviteList',
        payload: inviteList,
      });
      const uid = payload
      console.log("in",uid)
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
    saveInviteList(state, action) {
      return { ...state, inviteList: action.payload || [] };
    },
    saveUid(state, action) {
      return { ...state, uid: action.payload || "" };
    },
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
