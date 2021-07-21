import React, { useState } from 'react';
import { Button, Alert, Modal, Table, Tag } from 'antd';

export const ModalCreateNewTest = ({
  visible,
  onCancel,
  createNewEmptyTest,
  onPressBankTest,
  testBankList,
}) => {
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Question Type',
      dataIndex: 'QuestionType',
      key: 'QuestionType',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'Language Allowed',
      dataIndex: 'Language_allowed',
      key: 'Language_allowed',
      render: (list) => {
        return (
          <div>
            {list?.map((item) => (
              <Tag color="magenta">{item}</Tag>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      title="Create Test"
      visible={visible}
      onCancel={onCancel}
      width={'80vw'}
      footer={[
        <Button key="back" onClick={onCancel}>
          Close
        </Button>,

        <Button key="create" onClick={createNewEmptyTest} type="primary">
          Create New Plank Test
        </Button>,
      ]}
    >
      <Alert message="Click at a test to select them" type="info" showIcon />
      <Table
        loading={true}
        columns={columns}
        dataSource={testBankList}
        loading={loading}
        scroll={{ y: '55vh' }}
        rowKey="ID"
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              onPressBankTest(record);
              setLoading(true);
            },
          };
        }}
      />
    </Modal>
  );
};
