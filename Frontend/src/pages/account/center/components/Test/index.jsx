import { StarTwoTone, LikeOutlined, MessageFilled } from '@ant-design/icons';
import { List, Tag, Radio, Row } from 'antd';
import React from 'react';
import { connect } from 'umi';
import TestListContent from '../TestListContent';
import styles from './index.less';

const Test = (props) => {
  const { list } = props;

  const IconText = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  );
  function onPermissionChange (e)  {

  }

  console.log(list);
  return (
    <div styles={{display: 'block'}}>
      {/* <Row>
        <Radio.Group className = {styles.rdGroup} onChange={onPermissionChange} defaultValue="a">
          <Radio.Button value="a">Passed</Radio.Button>
          <Radio.Button value="b">Failed</Radio.Button>
        </Radio.Group>
        <Radio.Group className = {styles.rdGroup} onChange={onPermissionChange} defaultValue="b">
          <Radio.Button value="a">Public</Radio.Button>
          <Radio.Button value="b">Private</Radio.Button>
        </Radio.Group>
      </Row> */}
      <List
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={list.test}
      renderItem={(item) => (
        <List.Item
          key={item.TestID}
          // actions={[
          //   <IconText key="star" icon={<StarTwoTone />} text={item.star} />,
          //   <IconText key="like" icon={<LikeOutlined />} text={item.like} />,
          //   <IconText key="message" i con={<MessageFilled />} text={item.message} />,
          // ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle}>
                {item.TestName}
              </a>
            }
            description={
              <span>
                <Tag>{item.DifficultLevel}</Tag>
              </span>
            } 
          />
          <TestListContent data={item} />
        </List.Item>
      )}
    />
    </div>
  );
};

export default connect(({ accountAndcenter }) => ({
  list: accountAndcenter.list,
}))(Test);
