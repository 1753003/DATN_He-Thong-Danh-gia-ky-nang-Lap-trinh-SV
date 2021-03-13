import React, { useEffect, useState } from 'react';
import { Button, List, Skeleton, Avatar } from 'antd';
import styles from './index.less';
import { DownOutlined } from '@ant-design/icons';

const Collection = () => {
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collectionList, setCollectionList] = useState([
    {
      CollectionID: '1',
      CollectionName: 'C++ tests',
      CollectionDescription: 'Includes 8 tests',
      CoverImage: 'https://codelearn.io/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg',
      CreatedBy: 'Phu Vinh Hung',
      UpdatedAt: '24 Feb 2021',
    },
    {
      CollectionID: '2',
      CollectionName: 'C++ tests',
      CollectionDescription: 'Includes 8 tests',
      CoverImage: 'https://codelearn.io/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg',
      CreatedBy: 'Phu Vinh Hung',
      UpdatedAt: '24 Feb 2021',
    },
    {
      CollectionID: '3',
      CollectionName: 'C++ tests',
      CollectionDescription: 'Includes 8 tests',
      CoverImage: 'https://codelearn.io/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg',
      CreatedBy: 'Phu Vinh Hung',
      UpdatedAt: '24 Feb 2021',
    },
  ]);

  const onLoadMore = () => {
    setCollectionList([
      ...collectionList,
      {
        CollectionID: '1',
        CollectionName: 'C++ tests',
        CollectionDescription: 'Includes 8 tests',
        CoverImage: 'https://codelearn.io/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg',
        CreatedBy: 'Phu Vinh Hung',
        UpdatedAt: '24 Feb 2021',
      },
      {
        CollectionID: '2',
        CollectionName: 'C++ tests',
        CollectionDescription: 'Includes 8 tests',
        CoverImage: 'https://codelearn.io/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg',
        CreatedBy: 'Phu Vinh Hung',
        UpdatedAt: '24 Feb 2021',
      },
      {
        CollectionID: '3',
        CollectionName: 'C++ tests',
        CollectionDescription: 'Includes 8 tests',
        CoverImage: 'https://codelearn.io/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg',
        CreatedBy: 'Phu Vinh Hung',
        UpdatedAt: '24 Feb 2021',
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

  return collectionList.length > 0 ? (
    <List
      className="demo-loadmore-list"
      //   loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={collectionList}
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

export default Collection;
