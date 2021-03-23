import React, { useState } from 'react';
import styles from './styles.less';
import { Button, Card, List, Skeleton, Modal, Input } from 'antd';
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';

const { Search } = Input;

const CollectionDetail = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalCancel = () => {
    setModalVisible(false);
  };
  const collection = {
    CollectionName: 'KTLT tests (2021)',
    Description: 'This is the collection containing all tests of Ky thuat lap trinh subject (2021)',
    TestList: [
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
      {
        TestID: '4',
        TestName: 'C++ tests fasdjfhaskjdfhasdkf',
        TestImage: 'https://codelearn.io/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg',
        TestSet: 6,
        TestDone: 100,
      },
      {
        TestID: '5',
        TestName: 'C++ tests fasdjfhaskjdfhasdkf',
        TestImage: 'https://codelearn.io/Media/Default/Users/Trg_5FPhu/blog1/blog1.jpg',
        TestSet: 6,
        TestDone: 100,
      },
    ],
  };
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
              <Test list={collection.TestList} />
            </div>
          </div>
        </div>
        <div className={styles.description}>
          <Card title="Description" bordered={false}>
            {collection.Description}
          </Card>
        </div>
      </div>
      <AddTestModal
        visible={modalVisible}
        handleCancel={handleModalCancel}
        list={collection.TestList}
      />
    </div>
  );
};

const Test = ({ list }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={list}
      style={{ height: '380px', overflow: 'scroll' }}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <div className={styles.testInfoContainer}>
              <div className={styles.questions}>{item.TestSet} questions</div>
              <img src={item.TestImage} className={styles.collectionImg} />
              <div className={styles.infoContainer}>
                <h3 className={styles.title}>{item.TestName}</h3>
                <div className={styles.testMoreInfo}>
                  <div className={styles.MoreOutlined}>
                    <MoreOutlined style={{ fontSize: '22px' }} />
                  </div>
                  <Button className={styles.description} style={{ width: 'auto' }}>
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

const AddTestModal = ({ visible, handleCancel, list }) => {
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
        <div className={styles.testCount}>2 tests</div>
        <div className={styles.testInfo}>
          <List
            itemLayout="horizontal"
            dataSource={list}
            style={{ height: '380px', overflow: 'scroll' }}
            renderItem={(item) => (
              <List.Item>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <div className={styles.testInfoContainer} style={{ backgroundColor: '#35577a' }}>
                    <div className={styles.questions}>{item.TestSet} questions</div>
                    <img src={item.TestImage} className={styles.collectionImg} />
                    <div className={styles.infoContainer}>
                      <h3 className={styles.title} style={{ color: 'white' }}>
                        {item.TestName}
                      </h3>
                      <div className={styles.testMoreInfo} style={{ color: 'white' }}>
                        <div className={styles.MoreOutlined}>
                          <Button>Add</Button>
                        </div>
                        <div>{item.TestDone} done</div>
                      </div>
                    </div>
                  </div>
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CollectionDetail;
