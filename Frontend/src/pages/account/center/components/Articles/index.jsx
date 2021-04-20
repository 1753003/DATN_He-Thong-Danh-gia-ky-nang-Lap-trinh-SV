import { StarTwoTone, LikeOutlined, MessageFilled } from '@ant-design/icons';
import { List, Tag, Radio, Row } from 'antd';
import React from 'react';
import { connect } from 'umi';
import ArticleListContent from '../ArticleListContent';
import styles from './index.less';

const Articles = (props) => {
  const { list } = props;

  const IconText = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  );
  function onPermissionChange (e)  {

  }
  return (
    <div>
      <Row>
        <Radio.Group className = {styles.rdGroup} onChange={onPermissionChange} defaultValue="a">
          <Radio.Button value="a">Passed</Radio.Button>
          <Radio.Button value="b">Failed</Radio.Button>
        </Radio.Group>
        <Radio.Group className = {styles.rdGroup} onChange={onPermissionChange} defaultValue="b">
          <Radio.Button value="a">Public</Radio.Button>
          <Radio.Button value="b">Private</Radio.Button>
        </Radio.Group>
      </Row>
      <List
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          // actions={[
          //   <IconText key="star" icon={<StarTwoTone />} text={item.star} />,
          //   <IconText key="like" icon={<LikeOutlined />} text={item.like} />,
          //   <IconText key="message" icon={<MessageFilled />} text={item.message} />,
          // ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle} href={item.href}>
                {item.title}
              </a>
            }
            description={
              <span>
                <Tag>Medium</Tag>
                <Tag>Javascript</Tag>
              </span>
            }
          />
          <ArticleListContent data={item} />
        </List.Item>
      )}
    />
    </div>
  );
};

export default connect(({ accountAndcenter }) => ({
  list: accountAndcenter.list,
}))(Articles);
