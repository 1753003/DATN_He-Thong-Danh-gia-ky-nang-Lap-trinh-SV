import React, { useState } from 'react';
import { Button, List, Skeleton, Avatar } from 'antd';
import styles from './index.less';
import { DownOutlined } from '@ant-design/icons';
import { connect, useHistory } from 'umi';

const Collection = ({ collectionList }) => {
  const history = useHistory();

  const onLoadMore = () => {
    history.push({
      pathname: '/creator/tests',
      query: {
        menuKey: 'collection',
      },
    });
  };

  const loadMore = (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <div onClick={onLoadMore} className={styles.seeAll}>
        See all <DownOutlined />
      </div>
    </div>
  );

  return collectionList.length > 0 ? (
    <List
      className="demo-loadmore-list"
      //   loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={_.chunk(collectionList, 3)[0]}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <div className={styles.container}>
              <img src={item.CoverImage} className={styles.collectionImg} />
              <div className={styles.infoContainer}>
                <h3 className={styles.title}>{item.CollectionName}</h3>
                <p className={styles.description}>{item.CollectionDescription}</p>
                <p className={styles.description}>Create on {item.UpdatedAt}</p>
              </div>
            </div>
          </Skeleton>
        </List.Item>
      )}
    />
  ) : (
    <div className={styles.EmptyContainer}>
      <p>
        Welcome to collections! Here you can create collections and add several tests to them. Get
        started by creating your first collection.
      </p>
      <div className={styles.buttonContainer}>
        <Button style={styles.createButton} color={'#4ad5cf'} type="primary">
          Create Collection
        </Button>
      </div>
    </div>
  );
};

export default connect(({ collection: { collectionList } }) => ({
  collectionList,
}))(Collection);
