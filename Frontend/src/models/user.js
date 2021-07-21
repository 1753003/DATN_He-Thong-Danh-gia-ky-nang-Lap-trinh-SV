import { getUid, queryInviteList } from '@/services/user';
// import firebase from '@/utils/firebase'


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
    *fetchCurrent(_, { call, put }) {
      /*
      const userID = yield call(getUid);
      yield put({
        type: 'saveUid',
        payload: userID,
      });*/
      const inviteList = yield call(queryInviteList);
      yield put({
        type: 'saveInviteList',
        payload: inviteList,
      });
      // const uid = userID
      // const reactRef = firebase.database().ref(`users/${uid}/react`)
      
      // const react = yield call(()=>{ return new Promise((resolve, reject)=>{
      //     reactRef.on('value', (snapshot)=>{
      //       console.log(snapshot.val())
      //       resolve(snapshot.val())
      //     })
      //   })
      // })
      

        // const currentUser = {
        //   react: react
        // }
        // // console.log(currentUser)
        // yield put({
        //   type:'saveCurrentUser',
        //   payload: currentUser
        // })
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
    
  },
};
export default UserModel;
