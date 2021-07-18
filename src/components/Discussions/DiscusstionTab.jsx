import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import CommentList from './CommentList';
import ReplyEditor from './ReplyEditor';
import firebase from '@/utils/firebase';


const DiscussionTab = ({ location, discussion, dispatch }) => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    if (dispatch)
            {dispatch({
              type: 'discussion/setDiscussion',
              payload: [],
            });
            dispatch({
              type: 'discussion/setRootComments',
              payload: [],
            });
          }

    setInit(true);
    let id = location.state.id;
    let type = location.state.type;
    const rootRef = firebase.firestore().collection('discussions').doc(`${type}-${id}`);
    rootRef.onSnapshot((doc) => {
      if (doc.data()) {
        let comments = doc.data().root;
        if (dispatch)
          dispatch({
            type: 'discussion/setRootComments',
            payload: comments,
          });
      }
    });
  }, []);

  useEffect(() => {
    if (init) {
      let id = location.state.id;

      const commentRef = firebase
        .firestore()
        .collection('discussions')
        .doc(`${location.state.type}-${id}`)
        .collection('comments')
        .orderBy('vote', 'desc')
        .orderBy('time', 'desc')
        .onSnapshot((querySnapshot) => {
          let comments = [];
          let subComments = [];
          // console.log('flag');
          querySnapshot.forEach((doc) => {
            let temp = doc.data();
            temp.id = doc.id;
            if (typeof doc.data().children === 'undefined') temp.children = [];
            if (discussion.rootComments.includes(temp.id)) comments.push(temp);
            else subComments.push(temp);
          });
          comments.forEach((cmt) => {
            let tempChildren = [];

            cmt.children.forEach((id) => {
              let tmp = subComments.find((subcmt) => subcmt.id === id);
              tempChildren.push(tmp);
            });
            cmt.children = tempChildren;
          });
          if (dispatch)
            dispatch({
              type: 'discussion/setDiscussion',
              payload: comments,
            });
        });
      // commentRef()
      // console.log(commentRef)
    }
  }, [discussion.rootComments]);

  return (
    <div>
      <ReplyEditor id={location.state.id} type={location.state.type}></ReplyEditor>
      <CommentList id={location.state.id} type={location.state.type} loading={false}></CommentList>
    </div>
  );
};

export default connect(({ discussion }) => ({
  discussion,
}))(DiscussionTab);
