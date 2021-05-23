import React, { useState } from 'react';
import { connect } from 'umi';
import { Avatar, Comment, Button, List, Col, Row, Divider } from 'antd'
import MDEditor from '@uiw/react-md-editor';
import PageLoading from '../PageLoading';
import { useEffect } from 'react';
import ReplyEditor from './ReplyEditor';
import moment from 'moment';
import './style.less'
import ReactComment from './ReactComment';


const CommentList = ({data, loading, dispatch, location}) =>{

  const handleClick= (cid, react, value)=>{
    let postId = location.state.PracticeID
    const payload = {
      postId: postId,
      commentId: cid,
      value: value,
      status: react
    }

    if(dispatch)
      dispatch({
        type:'discussion/updateVote',
        payload: payload
      })
  }
  const ParentComment = ({data, handleClick}) => {
    const [showReplyTo, setShowReplyTo] = useState(false)
    const [viewReply, setViewReply] = useState(true)
    const replyComment = () => {
      setShowReplyTo(true)
    }
    const handleDiscard = () =>{
      setShowReplyTo(false)
    }
    const handleViewReply = () =>{
      setViewReply(!viewReply)
    }
    
    return(<Row gutter={24}>
      <Col className="vote" span={1}>
      <ReactComment data = {data.vote} id = {data.id} handleClick= {handleClick}></ReactComment>
      </Col>
      <Col span={20}>
      <Comment
      actions={[
      showReplyTo&&<ReplyEditor location={location} pid={data.id} handleDiscard={handleDiscard}></ReplyEditor>,!showReplyTo&&<span key="comment-nested-reply-to" onClick={()=>replyComment(data.id)}>Reply To</span>,
      data.children.length>0?<span onClick={()=>handleViewReply()}>{viewReply?'Hide Reply': 'View Reply'}</span>:null]}
      author={
        `${data.author}
        ${moment(data.time.toDate()).locale('en').format('MMMM Do YYYY, h:mm:ss a')}`
        }
      avatar={
        <Avatar
          src={data.authorURL}
          alt={data.author}
        />
      }
      content={
        <MDEditor.Markdown source = {
          data.content}
        />
      }
    >
      {viewReply && data.children.map((subitem, key)=>{
        return <Row gutter={24} key={key}>
                <Divider></Divider>
          <Col className="vote" span={1}>
          <ReactComment data= {subitem.vote} id = {subitem.id} handleClick= {handleClick}></ReactComment>
          </Col>
          <Col span={20}>
          <Comment 
        author={
          `${subitem.author}
          ${moment(subitem.time.toDate()).locale('en').format('MMMM Do YYYY, h:mm:ss a')}`
          }
        avatar = {<Avatar
          src={subitem.authorURL}
          alt={subitem.author}
        />}
        content = {<MDEditor.Markdown source = {
          subitem.content}
        />}
      >
    </Comment>
      </Col>

    </Row>
  })}
</Comment>
</Col>
</Row>)
  }

  return(data.length===0?<PageLoading/>:
    <List
    itemLayout="vertical"
    size="large"
    pagination={{
      pageSize: 3,
      onChange: page => {
        console.log(page);
      },
    }}
    dataSource={data}
    renderItem={item => (
      <List.Item key={item.id}>
        <ParentComment handleClick={handleClick} data = {item}></ParentComment>
      </List.Item>
    )}
  />)
} 

export default connect(({ discussion, user }) => ({
  discussion,
  data: discussion.discussions,
  react: user.currentUser.react
}))(CommentList);
