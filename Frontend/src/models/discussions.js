import { postComment, updateVote } from "@/services/discussion";

const Model = {
  namespace: 'discussion',
  state: {
    discussions:[],
    rootComments:[],
  },
  effects: {
    *getDiscussions({ payload }, { call, put,select }){
      
    },
    *postComment({ payload }, { call, put,select }){
      console.log(payload)
      yield postComment(payload)
    },
    *updateVote({payload}, { call, put, select}){
      const uid = yield select((state) =>
      state.user.uid)
      var update = {}
      update[payload.commentId] = payload.status
      yield updateVote(uid,payload.postId, payload.commentId, payload.value, payload.status)
    }
  },
  reducers: {
    setDiscussion(state, { payload }) {
      return { ...state, discussions: payload };
    },
    setRootComments(state, { payload }) {
      return { ...state, rootComments: payload };
    },
    updateDiscussion(state, { payload }) {
      return { ...state, discussions: [...state.discussions, payload] };
    },
  },
};
export default Model;