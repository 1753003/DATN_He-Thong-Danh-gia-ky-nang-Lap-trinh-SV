import React, { useState, useEffect } from 'react';
import {
  Button,
  Alert,
  Modal,
  Table,
  Tag,
  ConfigProvider,
  Input,
  message,
  InputNumber,
  Tooltip,
  Select,
} from 'antd';
import { getLocale } from 'umi';
import { removeAccents } from '@/utils/string';

const { Search } = Input;

export const ModalCreateNewTest = ({
  visible,
  onCancel,
  createNewEmptyTest,
  onPressBankTest,
  testBankList,
  quiz,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [nRandom, setNRandom] = useState(1);
  const [randomType, setRandomType] = useState(0);
  useEffect(() => {
    setData(testBankList);
  }, [testBankList]);

  useEffect(() => {
    setLoading(false);
    setSelectedRowKeys([]);
  }, [visible]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      ellipsis: true,
      width: '10%',
    },
    {
      title: 'Question Type',
      dataIndex: 'QuestionType',
      key: 'QuestionType',
      width: '15%',
      ellipsis: true,
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
      ellipsis: true,
      width: '60%',
    },
    {
      title: 'Allowed Language',
      dataIndex: 'Language_allowed',
      key: 'Language_allowed',
      width: '15%',
      ellipsis: true,
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

  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  function getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len) message.error('More elements taken than available');
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  const onPressRandom = () => {
    if (randomType === 0) {
      const randomArr = getRandom(testBankList, nRandom);
      const randomId = [];
      randomArr.forEach((item) => {
        randomId.push(item.ID);
      });
      setSelectedRowKeys(randomId);
    }

    if (randomType === 1) {
      const multiList = [];
      testBankList.forEach((item) => {
        if (item.QuestionType === 'MultipleChoice') {
          multiList.push(item);
        }
      });
      const randomArr = getRandom(multiList, nRandom);
      const randomId = [];
      randomArr.forEach((item) => {
        randomId.push(item.ID);
      });
      setSelectedRowKeys(randomId);
    }

    if (randomType === 2) {
      const codeList = [];
      testBankList.forEach((item) => {
        if (item.QuestionType === 'Code') {
          codeList.push(item);
        }
      });
      const randomArr = getRandom(codeList, nRandom);
      const randomId = [];
      randomArr.forEach((item) => {
        randomId.push(item.ID);
      });
      setSelectedRowKeys(randomId);
    }
  };

  return (
    <ConfigProvider locale={getLocale()}>
      <Modal
        title="Create Test"
        visible={visible}
        onCancel={onCancel}
        width={'80vw'}
        bodyStyle={{ height: '70vh', overflow: 'scroll' }}
        style={{ marginTop: -70 }}
        footer={[
          <Button key="back" onClick={onCancel}>
            Close
          </Button>,
          <Button key="create" onClick={createNewEmptyTest} type="primary">
            Create Blank Question
          </Button>,
          <Button
            key="create"
            onClick={() => {
              if (selectedRowKeys.length === 0) {
                createNewEmptyTest();
              } else {
                setLoading(true);
                onPressBankTest(selectedRowKeys);
              }
            }}
            type="primary"
          >
            Add Selected Questions
          </Button>,
        ]}
      >
        <Search
          placeholder="Please input search text"
          onSearch={onSearch}
          enterButton
          style={{ marginBottom: 20 }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <Tooltip placement="top" title={'Select number of questions you want to select'}>
            <InputNumber
              style={{ width: '20%' }}
              placeholder={'Hello'}
              value={nRandom}
              onChange={(value) => {
                setNRandom(value);
              }}
            />
          </Tooltip>
          <Select
            style={{ width: '40%' }}
            value={randomType}
            onChange={(value) => {
              setRandomType(value);
            }}
          >
            <Option value={0}>All</Option>
            <Option value={1}>Multiple Choice Only</Option>
            <Option value={2}>Code Only</Option>
          </Select>
          <Button type="primary" onClick={onPressRandom} style={{ width: '30%' }}>
            Random
          </Button>
        </div>
        <Table
          loading={true}
          columns={columns}
          dataSource={data}
          loading={loading}
          rowSelection={rowSelection}
          style={{ cursor: 'pointer' }}
          rowKey="ID"
        />
      </Modal>
    </ConfigProvider>
  );
};
