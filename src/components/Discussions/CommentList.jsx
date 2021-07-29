import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Avatar, Comment, ConfigProvider, List, Col, Row, Divider } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import PageLoading from '../PageLoading';
import ReplyEditor from './ReplyEditor';
import moment from 'moment';
import Expand from 'react-expand-animated';
import './style.less';
// import ReactComment from './ReactComment';
import { SmileOutlined } from '@ant-design/icons';

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <SmileOutlined rotate={180} style={{ fontSize: 20 }} />
    <p>Oops, seem like a bit silent here. Let make some noise!</p>
  </div>
);
const CommentList = ({ data, dispatch, id, type }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const handleClick = (cid, react, value) => {
    let postId = id;
    const payload = {
      postId: postId,
      commentId: cid,
      value: value,
      status: react,
      type: type,
    };

    if (dispatch)
      dispatch({
        type: 'discussion/updateVote',
        payload: payload,
      });
  };
  const ParentComment = ({ data, handleClick }) => {
    const [showReplyTo, setShowReplyTo] = useState(false);
    const [viewReply, setViewReply] = useState(false);
    const replyComment = () => {
      setShowReplyTo(true);
    };
    const handleDiscard = () => {
      setShowReplyTo(false);
    };
    const handleViewReply = () => {
      setViewReply(!viewReply);
    };

    return (
      <Row gutter={24}>
        {/* <Col className="vote" span={1}>
          <ReactComment data={data.vote} id={data.id} handleClick={handleClick}></ReactComment>
        </Col> */}
        <Col span={20}>
          <Comment
            actions={[
              showReplyTo && (
                <ReplyEditor
                  type={type}
                  id={id}
                  pid={data.id}
                  handleDiscard={handleDiscard}
                ></ReplyEditor>
              ),
              !showReplyTo && (
                <span key="comment-nested-reply-to" onClick={() => replyComment(data.id)}>
                  Reply To
                </span>
              ),
              data.children.length > 0 ? (
                <span onClick={() => handleViewReply()}>
                  {viewReply ? 'Hide Reply' : 'View Reply'}
                </span>
              ) : null,
            ]}
            author={`${data.author}
        ${moment(data.time.toDate()).locale('en').format('MMMM Do YYYY, h:mm:ss a')}`}
            avatar={<Avatar src={data.authorURL} alt={data.author} />}
            content={<MDEditor.Markdown source={data.content} />}
          >
            <Expand
              open={viewReply}
              duration={600}
              transitions={['height', 'opacity', 'background']}
            >
              {data.children.map((subitem, key) => {
                return (
                  <Row gutter={24} key={key}>
                    <Divider></Divider>
                    {/* <Col className="vote" span={1}>
                      <ReactComment
                        data={subitem.vote}
                        id={subitem.id}
                        handleClick={handleClick}
                      ></ReactComment>
                    </Col> */}
                    <Col span={20}>
                      <Comment
                        author={`${subitem.author}
          ${moment(subitem.time.toDate()).locale('en').format('MMMM Do YYYY, h:mm:ss a')}`}
                        avatar={<Avatar src={subitem.authorURL} alt={subitem.author} />}
                        content={<MDEditor.Markdown source={subitem.content} />}
                      ></Comment>
                    </Col>
                  </Row>
                );
              })}
            </Expand>
          </Comment>
        </Col>
      </Row>
    );
  };

  return (
    <>
      {loading && <PageLoading />}
      <Expand open={!loading} duration={600} transitions={['height', 'opacity', 'background']}>
        <ConfigProvider renderEmpty={customizeRenderEmpty}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={
              data.length > 0
                ? {
                    pageSize: 3,
                    onChange: (page) => {
                      console.log(page);
                    },
                  }
                : null
            }
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <ParentComment handleClick={handleClick} data={item}></ParentComment>
              </List.Item>
            )}
          />
        </ConfigProvider>
      </Expand>
    </>
  );
};

export default connect(({ discussion, user }) => ({
  discussion,
  data: discussion.discussions,
  react: user.currentUser.react,
}))(CommentList);
