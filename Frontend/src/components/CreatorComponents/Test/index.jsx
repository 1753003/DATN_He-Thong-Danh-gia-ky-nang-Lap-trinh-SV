import React, { useState } from 'react';
import { List, Skeleton } from 'antd';
import styles from './index.less';
import { DownOutlined } from '@ant-design/icons';
import { connect, useHistory } from 'umi';
import _ from 'lodash';

const Test = ({ testList }) => {
  const history = useHistory();

  const onLoadMore = () => {
    history.push({
      pathname: '/creator/tests',
      query: {
        menuKey: 'tests',
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
        cursor: 'pointer',
      }}
    >
      <div onClick={onLoadMore} className={styles.seeAll}>
        See all <DownOutlined />
      </div>
    </div>
  );

  return (
    <List
      className="demo-loadmore-list"
      //   loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      loading={testList.length === 0}
      dataSource={_.chunk(testList, 3)[0]}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <div className={styles.container}>
              <div className={styles.questions}>{item.TestSet} questions</div>

              <img
                src={'https://codelearn.io/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg'}
                className={styles.collectionImg}
              />
              <div className={styles.infoContainer}>
                <h3 className={styles.title}>{item.TestName}</h3>
                <p className={styles.description}>{item.TotalDone} done</p>
              </div>
            </div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default connect(({ test: { testList } }) => ({
  testList,
}))(Test);
