import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import CommentList from './CommentList';
import ReplyEditor from './ReplyEditor';
import firebase from '@/utils/firebase'

const DiscussionTab = ({ discussion, dispatch}) =>{
  const [init, setInit] = useState(false)
  useEffect(()=>{
    setInit(true)
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");
    const rootRef =  firebase.firestore().collection('discussions').doc(`practice-${id}`)
    rootRef.onSnapshot((doc)=>{
      let comments = doc.data().root
      if (dispatch )
        dispatch({
          type: 'discussion/setRootComments',
          payload: comments
        });
    })
  },[]);
  
  useEffect(()=>{
    if(init){
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");
    
    const commentRef =  firebase.firestore().collection('discussions').doc(`practice-${id}`).collection('comments')
    commentRef.onSnapshot((querySnapshot) => {
      let comments = []
      let subComments = []
      console.log("flag")
      querySnapshot.forEach((doc) => {
        let temp = doc.data();
        temp.id = doc.id;
        if(typeof(doc.data().children) === "undefined")
          temp.children = []
        if(discussion.rootComments.includes(temp.id))
          comments.push(temp)
        else
          subComments.push(temp)
        });
        comments.forEach(cmt=>{
          let tempChildren = []
          
          cmt.children.forEach(id=>{
            let tmp = subComments.find(subcmt=> subcmt.id === id)
          tempChildren.push(tmp)
          })
          cmt.children = tempChildren;
        })
        if (dispatch )
        dispatch({
          type: 'discussion/setDiscussion',
          payload: comments
        });
      }
    )
    }
  },[discussion.rootComments]);

  return(<div>
    <ReplyEditor></ReplyEditor>
    <CommentList loading={false}></CommentList>
  </div>
  )
} 

export default connect(({ discussion }) => ({
  discussion,
}))(DiscussionTab);
