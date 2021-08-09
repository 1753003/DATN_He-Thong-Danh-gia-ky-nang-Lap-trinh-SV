import React, { useState, useEffect } from 'react';
import styles from './styles.less';
import './custom.less'
import {
  PageHeader,
  Button,
  Card,
  List,
  Skeleton,
  Modal,
  Input,
  message,
  ConfigProvider,
  Row,
  Col,
} from 'antd';
import { DeleteOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { connect, useHistory } from 'umi';
import '../../../components/GlobalHeader/style.less';
import _ from 'lodash';
import PageLoading from '@/components/PageLoading';
import Constants from '@/utils/constants';
import NoData from '@/components/NoData';
import { getLocale } from 'umi';

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

  // console.log(collection.Test);

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
      pathname: '/creator/tests/testDetail',
      query: {
        id: testID,
      },
    });
  };

  return loading ? (
    <PageLoading />
  ) : (
    <ConfigProvider locale={getLocale()}>
      <div className={`${styles.container} custom`}>
        <div className={styles.header}>
          <PageHeader
            onBack={() => history.goBack()}
            title={`Collection: ${collection.CollectionName}`}
          />
          {/* <div className={styles.headerLeft}>
            <img src={collection.CoverImage} />
            <h1>{collection.CollectionName}</h1>
          </div> */}
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
              icon={<PlusOutlined/>}
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
              <div className={styles.testCount}>Total: {collection.Test?.length} tests</div>
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
            <Card
              cover={
                <img
                alt="Collection cover image"
                  style={{ width:"auto", maxWidth:"32vw", height:"50%",maxHeight: '100%', minHeight: '240px', margin: '0 auto' }}
                  src={collection.CoverImage}
                />
              }
              bordered={false}
              style={{ width: '100%',position: "relative",overflow:"hidden" }}
            >
              <Card.Meta title="Description" description={collection.CollectionDescription} />
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
    </ConfigProvider>
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
      style={{ height: 500, overflow: 'scroll' }}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <Card style={{width:"96%",minHeight:"120px"}} hoverable className={styles.testInfoContainer}>
              <Row align="middle" style={{width:"100%"}}>
                <Col xs = {24} md = {8} lg = {11}>
                <h3 className={styles.title}>{item.TestName}</h3>
                <div className={styles.questions}>{item.QuestionID.length} questions</div>
                </Col>
                <Col offset={4} xs = {10} md = {10} lg = {8} >
                <div className={styles.testMoreInfo}>
                  <div
                    style={{
                      flexDirection: 'column',
                      display: 'flex',
                    }}
                  >
                    <Button
                    icon={<DeleteOutlined />}
                    block
                      className={styles.description}
                      style={{ width: 'auto' }}
                      onClick={() => handleRemoveTest(item.TestID)}
                    >Remove
                    </Button>
                    <Button
                    block
                      className={styles.description}
                      style={{ width: 'auto', marginTop:"6px" }}
                      onClick={() => handleTestOnClick(item.TestID)}
                      type="primary"
                    >
                      View Detail
                    </Button>
                  </div>
                </div>
                </Col>
              </Row>
              
              {/* <img
                src={'https://image.flaticon.com/icons/png/512/1039/1039328.png'}
                className={styles.collectionImg}
              /> */}
              {/* <div className={styles.infoContainer}>
                
                
              </div> */}
            </Card>
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

  // console.log(testList);
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
        <div className={styles.testCount}>Total: {testList.length} Tests</div>
        <div className={styles.testInfo}>
          <List
            itemLayout="horizontal"
            dataSource={testList}
            style={{ height: '380px', overflow: 'scroll' }}
            locale={{ emptyText: NoData }}
            renderItem={(item) =>
              !checkExist(item.TestID) && (
                <List.Item>
                  <Skeleton avatar title={false} loading={item.loading} active>
                  <Card style={{width:"96%"}} hoverable className={styles.testInfoContainer}>
              <Row align="middle" style={{width:"100%"}}>
                <Col span={18}>
                <h3 className={styles.title}>{item.TestName}</h3>
                <div className={styles.questions}>{item.TotalQuestion} questions</div>
                </Col>
                <Col offset={1} span={2} >
                <div className={styles.testMoreInfo}>
                  <div
                    style={{
                      flexDirection: 'row',
                      display: 'flex',
                    }}
                  >
                    <Button
                    icon={<PlusOutlined/>}
                    block
                      className={styles.description}
                      style={{ width: 'auto', marginLeft: 10 }}
                      onClick={() => handleAddTestClick(item.TestID)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                </Col>
              </Row>
              
              {/* <img
                src={'https://image.flaticon.com/icons/png/512/1039/1039328.png'}
                className={styles.collectionImg}
              /> */}
              {/* <div className={styles.infoContainer}>
                
                
              </div> */}
            </Card>
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
