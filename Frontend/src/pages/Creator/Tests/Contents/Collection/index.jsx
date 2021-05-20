import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Input, Modal, Form, Upload, Image, Dropdown, Menu } from 'antd';
import { useHistory, connect } from 'umi';
import styles from './index.less';
import {
  MoreOutlined,
  InboxOutlined,
  FolderOpenOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
const { Search } = Input;
const { Dragger } = Upload;

const Collection = ({ collectionList, dispatch, loading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (collectionList.length === 0) {
      dispatch({ type: 'collection/fetchCollection' });
    }
  }, []);

  const handleDeleteCollection = (CollectionID) => {
    dispatch({
      type: 'collection/deleteCollectionModel',
      payload: {
        CollectionID,
      },
    });
  };

  const menu = (item) => {
    return (
      <Menu>
        <Menu.Item key="open" icon={<FolderOpenOutlined />} onClick={() => {}}>
          Open
        </Menu.Item>
        <Menu.Item key="edit" icon={<EditOutlined />}>
          Edit
        </Menu.Item>
        <Menu.Item
          key="delete"
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteCollection(item.CollectionID)}
        >
          Delete
        </Menu.Item>
      </Menu>
    );
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
    },
    {
      title: '',
      render: (item) => {
        console.log(item);
        return (
          <Dropdown overlay={() => menu(item)} placement="bottomRight">
            <MoreOutlined />
          </Dropdown>
        );
      },
    },
  ];

  const onSearch = (value) => {
    console.log(value);
  };

  const buttonModalOnClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleCollectionOnClick = (collectionID) => {
    history.push({
      pathname: '/creator/collectionDetail',
      query: {
        id: collectionID,
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Collections</h3>
        <Button type="primary" className={styles.button} onClick={buttonModalOnClick}>
          Create Collection
        </Button>
      </div>
      {collectionList.length > 0 ? (
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          className={styles.searchBar}
        />
      ) : null}
      <div className={styles.content}>
        <Table
          columns={columns}
          dataSource={collectionList}
          loading={loading}
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
      />
    </div>
  );
};

const CreateCollectionModal = ({ visible, handleCancel, dispatch }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    dispatch({
      type: 'collection/createNewCollectionModel',
      payload: {
        CollectionName: title,
        CollectionDescription: description,
        CoverImage: imageUrl,
      },
    });
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      // this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl));
    }
  };

  const onOk = () => {
    //call api
  };

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
          Create
        </Button>,
      ]}
      className={styles.modal}
      width={900}
    >
      <div className={styles.formContainer}>
        <div className={styles.formInfo}>
          <div className={styles.formTitleContainer}>
            <h3 className={styles.formTitle}>Title(Require)</h3>
            <Input
              className={styles.titleInput}
              placeholder="Collection Name"
              // value={title}
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
            style={{ display: imageUrl !== '' ? 'none' : null, marginTop: '-22px' }}
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
