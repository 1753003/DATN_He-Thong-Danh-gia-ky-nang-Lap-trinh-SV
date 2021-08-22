import React, { useEffect, useState } from 'react';
import { Table, Input, Tag, Card, Alert, Space, PageHeader, Divider, ConfigProvider } from 'antd';
import { connect, getLocale } from 'umi';
import styles from './index.less';
import MDEditor from '@uiw/react-md-editor';
import NoData from '@/components/NoData';
import { removeAccents } from '@/utils/string';

const { Search } = Input;

const TestBank = ({ testBankList, dispatch, loading }) => {
  const [list, setList] = useState([]);
  const [selectTest, setSelectTest] = useState(undefined);
  console.log(testBankList);

  useEffect(() => {
    dispatch({ type: 'test/fetchTestBankList' });
  }, []);

  useEffect(() => {
    setList(testBankList);
  }, [testBankList]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      sorter: (a, b) => a.ID > b.ID,
      defaultSortOrder: 'ascend',
      width: '10%',
      ellipsis: true,
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
    setList(searchList);
  };

  const onBack = () => {
    setSelectTest(undefined);
  };

  const handleTestOnClick = (record) => {
    const payload = {
      id: record.ID,
      callback: (response) => setSelectTest(response),
    };
    dispatch({ type: 'test/getTestBankByIdModel', payload });
  };

  if (!selectTest)
    return (
      <ConfigProvider locale={'en-US'}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Search
              placeholder="Please input search text"
              onSearch={onSearch}
              enterButton
              className={styles.searchBar}
            />
          </div>

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
                    handleTestOnClick(record);
                  },
                };
              }}
            />
          </div>
        </div>
      </ConfigProvider>
    );

  return <RenderTestDetail test={selectTest} onBack={onBack} />;
};

const RenderTestDetail = ({ test, onBack }) => {
  const checkCorrect = (listCorrect, index) => {
    return listCorrect.includes(index);
  };
  return (
    <ConfigProvider locale={getLocale()}>
      <div className={styles.testContainer}>
        <PageHeader
          onBack={() => onBack()}
          title={`Question ${test.ID} - ${test.QuestionType}`}
          subTitle={` ${test.Score} mark(s)`}
          style={{ paddingTop: 0 }}
        />
        <Card className={styles.questionContainer}>
          <div className={styles.question}>{test.Question}</div>
          <MDEditor.Markdown className="problem" source={test.Description}></MDEditor.Markdown>

          {test.QuestionType === 'Code' ? (
            <Space direction="vertical" style={{ width: '100%' }}>
              <Divider />
              <div>
                <b>Allowed Language: </b>
                {test.Language_allowed}
              </div>
              <div>
                <b>Memory Usage: </b>
                {test.MemoryUsage}
              </div>
              <div>
                <b>Running Time: </b>
                {test.RunningTime}
              </div>
              {test?.CodeSample && test?.CodeSample !== null && test?.CodeSample.length > 0 && (
                <div>
                  <Divider orientation="left">
                    <b>Code Sample: </b>{' '}
                  </Divider>
                  <br />
                  <MDEditor.Markdown
                    className="problem"
                    source={`\`\`\` \n${test?.CodeSample}\n\`\`\`` || 'Empty'}
                  ></MDEditor.Markdown>
                  <br />
                </div>
              )}
              {test?.TestCase?.map((tc, index) => {
                return (
                  <div className={styles.multipleChoiceContainer}>
                    <div className={styles.answer}>
                      <div>Input: </div>
                      <div>{tc.Input}</div>
                    </div>
                    <div className={styles.answer}>
                      <div>Output: </div>
                      <div>{tc.Output}</div>
                    </div>
                  </div>
                );
              })}
            </Space>
          ) : (
            <>
              {test?.CodeSample && test?.CodeSample !== null && test?.CodeSample.length > 0 && (
                <div>
                  <b>Code Sample: </b>
                  <MDEditor.Markdown
                    className="problem"
                    source={`\`\`\`\n${test?.CodeSample}\n\`\`\`` || 'Empty'}
                  ></MDEditor.Markdown>
                  <br />
                </div>
              )}
              <Divider orientation="left">Answer</Divider>
              {test?.Answer?.map((choice, index) => {
                return (
                  <>
                    <Alert
                      showIcon
                      style={{ marginBottom: '4px', fontSize: '18px' }}
                      type={checkCorrect(test.CorrectAnswer, index) ? 'success' : 'error'}
                      message={
                        <MDEditor.Markdown
                          className="problem"
                          style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                          source={choice}
                        ></MDEditor.Markdown>
                      }
                    />
                  </>
                );
              })}
            </>
          )}
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default connect(({ test: { testBankList }, loading }) => ({
  testBankList,
  loading: loading.effects['test/fetchTestBankList'],
}))(TestBank);
