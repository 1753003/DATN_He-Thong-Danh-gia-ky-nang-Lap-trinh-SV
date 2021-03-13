import React, { useEffect, useState } from 'react';
import { Button, List, Skeleton, Avatar } from 'antd';
import styles from './index.less';
import { DownOutlined } from '@ant-design/icons';

const Test = () => {
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testList, setTestList] = useState([
    {
      TestID: '1',
      TestName: 'C++ tests',
      TestImage: 'https://codelearn.io/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg',
      TestSet: 9,
      TestDone: 39,
    },
    {
      TestID: '2',
      TestName: 'C++ tests fasdjfhaskjdfhasdkf',
      TestImage: 'https://codelearn.io/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg',
      TestSet: 6,
      TestDone: 100,
    },
    {
      TestID: '3',
      TestName: 'C++ tests fasdjfhaskjdfhasdkf',
      TestImage: 'https://codelearn.io/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg',
      TestSet: 6,
      TestDone: 100,
    },
  ]);

  const onLoadMore = () => {
    setTestList([
      ...testList,
      {
        TestID: '1',
        TestName: 'C++ tests',
        TestImage: 'https://codelearn.io/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg',
        TestSet: 9,
        TestDone: 39,
      },
      {
        TestID: '2',
        TestName: 'C++ tests fasdjfhaskjdfhasdkf',
        TestImage: 'https://codelearn.io/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg',
        TestSet: 6,
        TestDone: 100,
      },
      {
        TestID: '3',
        TestName: 'C++ tests fasdjfhaskjdfhasdkf',
        TestImage: 'https://codelearn.io/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg',
        TestSet: 6,
        TestDone: 100,
      },
    ]);
    // this.setState({
    //   loading: true,
    //   list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    // });
    // this.getData(res => {
    //   const data = this.state.data.concat(res.results);
    //   this.setState(
    //     {
    //       data,
    //       list: data,
    //       loading: false,
    //     },
    //     () => {
    //       // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    //       // In real scene, you can using public method of react-virtualized:
    //       // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    //       window.dispatchEvent(new Event('resize'));
    //     },
    //   );
    // });
    console.log('Load More');
  };

  const loadMore =
    !initLoading && !loading ? (
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
    ) : null;

  return (
    <List
      className="demo-loadmore-list"
      //   loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={testList}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <div className={styles.container}>
              <div className={styles.questions}>{item.TestSet} questions</div>

              <img src={item.TestImage} className={styles.collectionImg} />
              <div className={styles.infoContainer}>
                <h3 className={styles.title}>{item.TestName}</h3>
                <p className={styles.description}>{item.TestDone} done</p>
              </div>
            </div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default Test;
