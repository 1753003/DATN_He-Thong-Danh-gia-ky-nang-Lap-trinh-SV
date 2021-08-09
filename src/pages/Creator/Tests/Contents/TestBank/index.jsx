import React, { useEffect, useState } from 'react';
import { Table, Input, Tag, Card, Alert, Space, Typography, PageHeader, Divider  } from 'antd';
import { connect, getLocale } from 'umi';
import styles from './index.less';
import MDEditor from '@uiw/react-md-editor';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import NoData from '@/components/NoData';
import { removeAccents } from '@/utils/string';

const { Search } = Input;

const TestBank = ({ testBankList, dispatch, loading }) => {
  const [list, setList] = useState([]);
  const [selectTest, setSelectTest] = useState(undefined);

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
        <div className={styles.container}>
        <div className={styles.header}>
        <Typography.Title level={2} className={styles.title}>Questions Bank</Typography.Title>
        </div>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          className={styles.searchBar}
        />

        <div className={styles.content}>
          <Alert message="Click to show detail" type="info" showIcon />
          <Table
            columns={columns}
            dataSource={list}
            loading={loading}
            locale={{ emptyText: NoData }}
            style={{ cursor: 'pointer' }}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  handleTestOnClick(record);
                },
              };
            }}
          />
      </div>
      </div>
    );

  return <RenderTestDetail test={selectTest} onBack={onBack} />;
};

const RenderTestDetail = ({ test, onBack }) => {
  const checkCorrect = (listCorrect, index) => {
    return listCorrect.includes(index);
  };
  return (
    <div className={styles.testContainer}>
      <PageHeader
    onBack={() => onBack()}
    title={`Question ${test.ID} - ${test.QuestionType}`}
    subTitle={` ${test.Score} mark(s)`}
  />
      <Card className={styles.questionContainer}>
        <div className={styles.question}>{test.Question}</div>
        <MDEditor.Markdown className="problem" source={test.Description}></MDEditor.Markdown>
    
        {test.QuestionType === 'Code' ? (
          
          <Space direction="vertical" style={{width:"100%"}}>
            <Divider/>
            <div>
              <b>Language Allowed: </b>
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
            {test?.CodeSample && test?.CodeSample!== null && test?.CodeSample.length > 0 &&<div>
              <Divider orientation="left"><b>CodeSample: </b> </Divider>
              <br />
              <MDEditor.Markdown
                className="problem"
                source={`\`\`\` \n${test?.CodeSample}\n\`\`\`` || 'Empty'}
              ></MDEditor.Markdown>
              <br />
            </div>}
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
            {test?.CodeSample && test?.CodeSample!== null && test?.CodeSample.length > 0 &&<div>
              <b>CodeSample: </b>
              <MDEditor.Markdown
                className="problem"
                source={`\`\`\`\n${test?.CodeSample}\n\`\`\`` || 'Empty'}
              ></MDEditor.Markdown>
              <br />
            </div>}
            <Divider orientation="left">Answer</Divider>
            {test?.Answer?.map((choice, index) => {
              return (<>
              <Alert showIcon style={{marginBottom:"4px", fontSize:"18px"}} type={checkCorrect(test.CorrectAnswer, index) ? "success":"error"} message={<MDEditor.Markdown
                className="problem"
                style={{backgroundColor:"rgba(0, 0, 0, 0)"}}
                source={choice}
              ></MDEditor.Markdown>}/>
              
              </>
                );
            })}
          </>
        )}
      </Card>
    </div>
  );
};

export default connect(({ test: { testBankList }, loading }) => ({
  testBankList,
  loading: loading.effects['test/fetchTestBankList'],
}))(TestBank);
