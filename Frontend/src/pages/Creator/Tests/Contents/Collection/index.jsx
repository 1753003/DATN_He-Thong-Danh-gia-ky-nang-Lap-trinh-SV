import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Modal, Upload, Image, message, Alert, ConfigProvider, Row, Col } from 'antd';
import { useHistory, connect, getLocale } from 'umi';
import styles from './index.less';
import { InboxOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Dragger } = Upload;
import NoData from '@/components/NoData';
import { removeAccents } from '@/utils/string';
import Constants from '@/utils/constants';

import _ from 'lodash';

const Collection = ({ collectionList, dispatch, loading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCollection, setCurrentCollection] = useState(undefined);
  const [list, setList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (collectionList.length === 0) {
      dispatch({ type: 'collection/fetchCollection' });
    }
  }, []);

  useEffect(() => {
    setList(collectionList);
  }, [collectionList]);

  const handleDeleteCollection = (CollectionID) => {
    dispatch({
      type: 'collection/deleteCollectionModel',
      payload: {
        CollectionID,
        onSuccess: () => {
          message.success('Delete Collection Successfully !!!');
          dispatch({ type: 'collection/fetchCollection' });
        },
        onFail: () => message.error('Fail to delete collection !!!'),
      },
    });
  };

  const handleEditCollection = (item) => {
    setCurrentCollection(item);
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'Collection name',
      dataIndex: 'CollectionName',
      key: 'CollectionName',
    },
    {
      title: 'Created date',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      sorter: (a, b) => Date.parse(a.CreatedAt) > Date.parse(b.CreatedAt),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Action',
      render: (item) => {
        return (
          <>
            <EditOutlined
              onClick={() => handleEditCollection(item)}
              style={{ width: '25px', height: '25px', cursor: 'pointer' }}
            />
            <DeleteOutlined
              onClick={() => handleDeleteCollection(item.CollectionID)}
              style={{ width: '25px', height: '25px', cursor: 'pointer' }}
            />
          </>
        );
      },
    },
  ];

  const onSearch = (value) => {
    const searchList = [];
    const refactorValue = removeAccents(value).toLowerCase();
    collectionList.forEach((element) => {
      if (
        removeAccents(element?.CollectionName).toLowerCase().includes(refactorValue) ||
        removeAccents(element?.CollectionDescription).toLowerCase().includes(refactorValue)
      ) {
        searchList.push(element);
      }
    });
    setList(searchList);
  };

  const buttonModalOnClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setCurrentCollection(undefined);
  };

  const handleCollectionOnClick = (collectionID) => {
    history.push({
      pathname: '/creator/tests/collectionDetail',
      query: {
        id: collectionID,
      },
    });
  };

  return (
    <ConfigProvider locale={getLocale()}>
      <div className={styles.container}>
        <Row gutter={16} className={styles.header}>
          <Col md={16} lg={16} xs={24}>
          <Search
            placeholder="Please input search text"
            onSearch={onSearch}
            enterButton
            className={styles.searchBar}
          />
          </Col>
          <Col md={8} lg={6} xs={24}>
          <Button block icon={<PlusOutlined />} className={styles.button} onClick={buttonModalOnClick}>Create Collection
          </Button>
          </Col>
        </Row>

        <div className={styles.content}>
          <Alert message="Double click to show detail" type="info" showIcon />
          <Table
            columns={columns}
            dataSource={list}
            loading={loading}
            locale={{ emptyText: NoData }}
            style={{ cursor: 'pointer' }}
            onRow={(record, rowIndex) => {
              return {
                onDoubleClick: (event) => {
                  handleCollectionOnClick(record.CollectionID);
                },
              };
            }}
          />
        </div>
        <CreateCollectionModal
          visible={modalVisible}
          handleCancel={handleModalCancel}
          dispatch={dispatch}
          currentCollection={currentCollection}
        />
      </div>
    </ConfigProvider>
  );
};

const CreateCollectionModal = ({ visible, handleCancel, dispatch, currentCollection }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [action, setAction] = useState('CREATE');

  useEffect(() => {
    if (!_.isNil(currentCollection)) {
      setAction('EDIT');
      setTitle(currentCollection.CollectionName);
      setDescription(currentCollection.CollectionDescription);
      setImageUrl(currentCollection.CoverImage);
    }
  }, [currentCollection]);

  const handleSubmit = () => {
    if (action === 'CREATE') {
      dispatch({
        type: 'collection/createNewCollectionModel',
        payload: {
          CollectionName: title,
          CollectionDescription: description,
          CoverImage: imageUrl,
          onSuccess: () => {
            message.success('Create Collection Successfully !!!');
            dispatch({ type: 'collection/fetchCollection' });
          },
          onFail: () => message.error('Fail to create collection !!!'),
        },
      });
    } else {
      dispatch({
        type: 'collection/editCollection',
        payload: {
          CollectionID: currentCollection.CollectionID,
          CollectionName: title,
          CollectionDescription: description,
          CoverImage: imageUrl,
          onSuccess: () => {
            message.success('Create Collection Successfully !!!');
            dispatch({ type: 'collection/fetchCollection' });
          },
          onFail: () => message.error('Fail to create collection !!!'),
        },
      });
    }

    handleCancel();
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      if (
        info.file.originFileObj.type.endsWith('png') ||
        info.file.originFileObj.type.endsWith('jpeg')
      ) {
        getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl));
      } else {
        message.error('You must select PNG OR JPEG');
      }
    }
  };

  const onOk = () => {};

  return (
    <Modal
      title="Create Collection"
      visible={visible}
      // onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={title === '' || imageUrl === ''}
          onClick={handleSubmit}
        >
          {action === 'CREATE' ? 'CREATE' : 'EDIT'}
        </Button>,
      ]}
      className={styles.modal}
      width={900}
    >
      <div className={styles.formContainer}>
        <div className={styles.formInfo}>
          <div className={styles.formTitleContainer}>
            <h3 className={styles.formTitle}>Title (*)</h3>
            <Input
              className={styles.titleInput}
              placeholder="Collection Name"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className={styles.formDescriptionContainer}>
            <h3 className={styles.formDescription}>Description</h3>
            <Input.TextArea
              className={styles.descriptionInput}
              autoSize={{ minRows: 6, maxRows: 6 }}
              value={description}
              placeholder="Type some description for this collection"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.uploadContainer}>
          <h3 className={styles.uploadTitle}>Cover Image</h3>
          <Image width={206} src={imageUrl} />
          <Dragger
            height="206px"
            multiple={false}
            onOk={onOk}
            onChange={handleChange}
            onRemove={() => {
              setImageUrl('');
            }}
            style={{
              display: imageUrl !== '' && action === 'CREATE' ? 'none' : null,
              marginTop: '-22px',
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
          </Dragger>
        </div>
      </div>
    </Modal>
  );
};
export default connect(({ collection: { collectionList }, loading }) => ({
  collectionList,
  loading: loading.effects['collection/fetchCollection'],
}))(Collection);
