import React, { useState, useEffect } from 'react';
import styles from './styles.less';
import { Button, Card, List, Skeleton, Modal, Input, message } from 'antd';
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { connect, useHistory } from 'umi';
import '../../../components/GlobalHeader/style.less';
import _ from 'lodash';
import PageLoading from '@/pages/dashboard/analysis/components/PageLoading';

const { Search } = Input;

const CollectionDetail = ({ location, collection, dispatch, testList, loading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [testAddList, setTestAddList] = useState(false);
  const history = useHistory();
  const handleModalCancel = () => {
    setModalVisible(false);
    dispatch({ type: 'collection/getCollectionByIdModel', payload: { id: location.query.id } });
    dispatch({ type: 'test/fetchTestList' });
  };

  useEffect(() => {
    dispatch({ type: 'collection/getCollectionByIdModel', payload: { id: location.query.id } });
    dispatch({ type: 'test/fetchTestList' });
  }, []);

  useEffect(() => {
    setTestAddList(_.differenceBy(testList, collection.Test, 'TestID'));
  }, [testList]);

  const onTestSearch = (value) => {
    const list = _.differenceBy(testList, collection.Test, 'TestID');
    const searchList = [];
    list.forEach((test) => {
      if (test.TestName.toLowerCase().includes(value)) {
        searchList.push(test);
      }
    });
    setTestAddList(searchList);
  };

  const handleTestOnClick = (testID) => {
    history.push({
      pathname: '/creator/testDetail',
      query: {
        id: testID,
      },
    });
  };

  return loading ? (
    <PageLoading />
  ) : (
    <div className={`${styles.container} custom`}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={collection.CoverImage} />
          <h1>{collection.CollectionName}</h1>
        </div>
        {/* <div className={styles.headerRight}>
          <Button className={styles.button}>Exit</Button>
          <Button type="primary" className={styles.button}>
            Done
          </Button>
        </div> */}
      </div>
      <div className={styles.content}>
        <div className={styles.testContainer}>
          <div className={styles.testContainerHeader}>
            <h3>Add collection content</h3>
            <Button
              className={styles.buttonAddTest}
              type="primary"
              onClick={() => {
                setModalVisible(true);
              }}
            >
              Add tests
            </Button>
          </div>
          <div className={styles.listTest}>
            <div className={styles.testCount}>{collection.Test?.length} tests</div>
            <div className={styles.testInfo}>
              <Test
                list={collection.Test}
                collectionID={location.query.id}
                dispatch={dispatch}
                handleTestOnClick={handleTestOnClick}
              />
            </div>
          </div>
        </div>
        <div className={styles.description}>
          <Card title="Description" bordered={false}>
            {collection.CollectionDescription}
          </Card>
        </div>
      </div>
      <AddTestModal
        visible={modalVisible}
        handleCancel={handleModalCancel}
        testList={testAddList}
        dispatch={dispatch}
        collectionID={location.query.id}
        testIDInCollection={collection.TestID}
        onTestSearch={onTestSearch}
      />
    </div>
  );
};

const Test = ({ list, collectionID, dispatch, handleTestOnClick }) => {
  const onDeleteSuccess = () => {
    dispatch({ type: 'collection/getCollectionByIdModel', payload: { id: collectionID } });
    dispatch({ type: 'test/fetchTestList' });

    message.success('Remove test from collection successfully !!!');
  };
  const handleRemoveTest = (testID) => {
    dispatch({
      type: 'collection/removeTestToCollectionModel',
      payload: {
        testID,
        collectionID,
        onSuccess: onDeleteSuccess,
        onFail: () => message.error('Fail to remove test !!!'),
      },
    });
  };
  return (
    <List
      itemLayout="horizontal"
      dataSource={list}
      style={{ height: '380px', overflow: 'scroll' }}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <div
              className={styles.testInfoContainer}
              onClick={() => handleTestOnClick(item.TestID)}
            >
              <div className={styles.questions}>{item.TotalQuestion} questions</div>
              <img src={item.TestImage} className={styles.collectionImg} />
              <div className={styles.infoContainer}>
                <h3 className={styles.title}>{item.TestName}</h3>
                <div className={styles.testMoreInfo}>
                  <div className={styles.MoreOutlined}>
                    <MoreOutlined style={{ fontSize: '22px' }} />
                  </div>
                  <div style={{ flexDirection: 'row', display: 'flex' }}>
                    <Button
                      className={styles.description}
                      style={{ width: 'auto' }}
                      onClick={() => handleRemoveTest(item.TestID)}
                    >
                      <DeleteOutlined /> Delete from the collection
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

const AddTestModal = ({
  visible,
  handleCancel,
  testList,
  collectionID,
  testIDInCollection,
  dispatch,
  onTestSearch,
}) => {
  const handleAddTestClick = (testID) => {
    dispatch({
      type: 'collection/addTestToCollectionModel',
      payload: {
        testID,
        collectionID,
        onSuccess: () => message.success('Add test successfully !!!'),
        onFail: () => message.error('Fail to Add Test !!!'),
      },
    });
  };

  const checkExist = (testId) => {
    if (testIDInCollection.includes(testId)) {
      return true;
    }
    return false;
  };
  return (
    <Modal
      title="Add test to this collection"
      visible={visible}
      // onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Done
        </Button>,
      ]}
      className={`${styles.modal} custom`}
      width={600}
    >
      <Search placeholder="Search tests..." enterButton onSearch={onTestSearch} />
      <div className={styles.modalList}>
        <div className={styles.testCount}>{testList.length} tests</div>
        <div className={styles.testInfo}>
          <List
            itemLayout="horizontal"
            dataSource={testList}
            style={{ height: '380px', overflow: 'scroll' }}
            renderItem={(item) =>
              !checkExist(item.TestID) && (
                <List.Item>
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <div
                      className={styles.testInfoContainer}
                      style={{ backgroundColor: '#35577a' }}
                    >
                      <div className={styles.questions}>{item.TotalQuestion} questions</div>
                      <img src={item.TestImage} className={styles.collectionImg} />
                      <div className={styles.infoContainer}>
                        <h3 className={styles.title} style={{ color: 'white' }}>
                          {item.TestName}
                        </h3>
                        <div className={styles.testMoreInfo} style={{ color: 'white' }}>
                          <div className={styles.MoreOutlined}>
                            <Button onClick={() => handleAddTestClick(item.TestID)}>Add</Button>
                          </div>
                          <div>{item.TotalDone} done</div>
                        </div>
                      </div>
                    </div>
                  </Skeleton>
                </List.Item>
              )
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default connect(({ collection: { collectionById }, test: { testList }, loading }) => ({
  collection: collectionById,
  testList,
  loading: loading.effects['collection/getCollectionByIdModel'],
}))(CollectionDetail);
