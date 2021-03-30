import React, { useState, useEffect } from 'react';
import styles from './styles.less';
import { Button, Card, List, Skeleton, Modal, Input } from 'antd';
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { connect } from 'umi';

const { Search } = Input;

const CollectionDetail = ({ location, collection, dispatch, testList }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalCancel = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    dispatch({ type: 'collection/getCollectionByIdModel', payload: { id: location.query.id } });
    dispatch({ type: 'test/fetchTestList' });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img
            src={'https://trainghiemso.vn/wp-content/uploads/2020/05/%C3%B4m-ti%E1%BB%81n.png'}
          />
          <h1>{collection.CollectionName}</h1>
          <Button type="primary" className={styles.button}>
            Settings
          </Button>
        </div>
        <div className={styles.headerRight}>
          <Button className={styles.button}>Exit</Button>
          <Button type="primary" className={styles.button}>
            Done
          </Button>
        </div>
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
            <div className={styles.testCount}>2 tests</div>
            <div className={styles.testInfo}>
              <Test list={collection.Test} collectionID={location.query.id} dispatch={dispatch} />
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
        testList={testList}
        dispatch={dispatch}
        collectionID={location.query.id}
        testIDInCollection={collection.TestID}
      />
    </div>
  );
};

const Test = ({ list, collectionID, dispatch }) => {
  const handleRemoveTest = (testID) => {
    dispatch({
      type: 'collection/removeTestToCollectionModel',
      payload: {
        testID,
        collectionID,
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
            <div className={styles.testInfoContainer}>
              <div className={styles.questions}>{item.TotalQuestion} questions</div>
              <img src={item.TestImage} className={styles.collectionImg} />
              <div className={styles.infoContainer}>
                <h3 className={styles.title}>{item.TestName}</h3>
                <div className={styles.testMoreInfo}>
                  <div className={styles.MoreOutlined}>
                    <MoreOutlined style={{ fontSize: '22px' }} />
                  </div>
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
}) => {
  const handleAddTestClick = (testID) => {
    dispatch({
      type: 'collection/addTestToCollectionModel',
      payload: {
        testID,
        collectionID,
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
          Cancel
        </Button>,
        <Button key="submit" type="primary">
          Done
        </Button>,
      ]}
      className={styles.modal}
      width={600}
    >
      <Search placeholder="Search tests..." enterButton />
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

export default connect(({ collection: { collectionById }, test: { testList } }) => ({
  collection: collectionById,
  testList,
}))(CollectionDetail);
