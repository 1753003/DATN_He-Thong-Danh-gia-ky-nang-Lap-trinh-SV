import React, { useEffect, useState } from 'react';
import { Table, Input, Tag, Card } from 'antd';
import { connect } from 'umi';
import styles from './index.less';
import MDEditor from '@uiw/react-md-editor';
import { CheckCircleTwoTone, CloseCircleTwoTone, LeftOutlined } from '@ant-design/icons';

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

  const onSearch = (value) => {
    const searchList = [];
    testList.forEach((element) => {
      if (element.TestName.includes(value)) {
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
          <h3 className={styles.title}>Test Bank</h3>
        </div>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          className={styles.searchBar}
        />

        <div className={styles.content}>
          <Table
            columns={columns}
            dataSource={list}
            loading={loading}
            scroll={{ y: '60vh' }}
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={onBack}
      >
        <LeftOutlined />
        <h3 style={{ justifySelf: 'center', paddingTop: 8 }}>Back</h3>
      </div>

      <Card className={styles.questionContainer} title={`${test.ID}-${test.QuestionType}`}>
        <div className={styles.question}>{test.Question}</div>
        <b>Description: </b>
        <MDEditor.Markdown className="problem" source={test.Description}></MDEditor.Markdown>

        <div className={styles.mark}>{test.Score} mark</div>
        {test.QuestionType === 'Code' ? (
          <div>
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
            <div>
              <b>CodeSample: </b>
              <br />
              <MDEditor.Markdown
                className="problem"
                source={`\`\`\` \n${test?.CodeSample}\n\`\`\`` || 'Empty'}
              ></MDEditor.Markdown>
              <br />
            </div>
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
          </div>
        ) : (
          <>
            <div>
              <b>CodeSample: </b>
              <MDEditor.Markdown
                className="problem"
                source={`\`\`\`\n${test?.CodeSample}\n\`\`\`` || 'Empty'}
              ></MDEditor.Markdown>
              <br />
            </div>
            {test?.Answer?.map((choice, index) => {
              return (
                <div className={styles.multipleChoiceContainer}>
                  <div className={styles.answer}>{choice}</div>
                  <div className={styles.answer}>
                    {checkCorrect(test.CorrectAnswer, index) ? (
                      <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '32px' }} />
                    ) : (
                      <CloseCircleTwoTone twoToneColor="red" style={{ fontSize: '32px' }} />
                    )}
                  </div>
                </div>
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
