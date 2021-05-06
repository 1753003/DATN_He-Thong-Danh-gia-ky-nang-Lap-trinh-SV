import firebase from '@/utils/firebase'

export function updateVote(pid, cid, value, status) {
  const dbComment = firebase.firestore().collection("discussions").doc(`practice-${pid}`).collection('comments')
  console.log('run', status)
  return new Promise((resolve, reject) => {
    var updates={};
    updates[`users/zcwVw4Rjp7b0lRmVZQt6ZXmspql1/react/`+cid] = status;
    firebase.database().ref().update(updates)
    dbComment.doc(cid).update({vote : value})

      
    .then(() => {
      resolve()
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  });
}

export async function postComment(payload) {
  const docRef = await firebase.firestore().collection("discussions").doc(`practice-${payload.postId}`).collection('comments').add(payload.cmt);
  if (payload.parentId === "")
    firebase.firestore().collection("discussions").doc(`practice-${payload.postId}`).update({
      root: firebase.firestore.FieldValue.arrayUnion(docRef.id)
    });

  else
    firebase.firestore().collection("discussions").doc(`practice-${payload.postId}`).collection("comments").doc(payload.parentId).update({
      children: firebase.firestore.FieldValue.arrayUnion(docRef.id)
    });
}