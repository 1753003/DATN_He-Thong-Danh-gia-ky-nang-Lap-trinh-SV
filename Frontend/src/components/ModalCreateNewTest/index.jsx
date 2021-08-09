import React, { useState, useEffect } from 'react';
import { Button, Alert, Modal, Table, Tag, ConfigProvider, Input } from 'antd';
import { getLocale } from 'umi';
import { removeAccents } from '@/utils/string';

const { Search } = Input;

export const ModalCreateNewTest = ({
  visible,
  onCancel,
  createNewEmptyTest,
  onPressBankTest,
  testBankList,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(testBankList || []);
  useEffect(() => {
    setLoading(false);
  }, []);
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
      filters: [
        {
          text: 'Multiple Choice',
          value: 'MultipleChoice',
        },
        {
          text: 'Code',
          value: 'Code',
        },
      ],
      onFilter: (value, record) => record.QuestionType === value,
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
      filters: [
        {
          text: 'C',
          value: 'C',
        },
        {
          text: 'C++',
          value: 'C++',
        },
        {
          text: 'Javascript',
          value: 'Javascript',
        },
        {
          text: 'Java',
          value: 'Java',
        },
      ],
      onFilter: (value, record) => record.Language_allowed?.includes(value),
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

  const onSearch = (value) => {
    const searchList = [];
    const refactorValue = removeAccents(value).toLowerCase();
    testBankList.forEach((element) => {
      if (removeAccents(element?.Description).toLowerCase().includes(refactorValue)) {
        searchList.push(element);
      }
    });
    setData(searchList);
  };

  return (
    <ConfigProvider locale={getLocale()}>
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
        <Search placeholder="input search text" onSearch={onSearch} enterButton />
        <Alert message="Click at a test to select them" type="info" showIcon />
        <Table
          loading={true}
          columns={columns}
          dataSource={data}
          loading={loading}
          scroll={{ y: '55vh' }}
          style={{ cursor: 'pointer' }}
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
    </ConfigProvider>
  );
};
