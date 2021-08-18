import React, { useState, useEffect, useMemo } from 'react';
import { Table, Progress, Typography, Divider, Alert, Button } from 'antd';
import { connect, useHistory } from 'umi';
import styles from './styles.less';
import MDEditor from '@uiw/react-md-editor';
import { CheckCircleTwoTone, CloseCircleTwoTone, LeftOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import '@/components/GlobalHeader/style.less';
import NoData from '@/components/NoData';

const UserReport = ({ summaryUser, location, dispatch }) => {
  const [listQuestion, setListQuestion] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentTest, setCurrentTest] = useState(undefined);
  const history = useHistory();
  useEffect(() => {
    if (location.query.userName) {
      dispatch({
        type: 'report/getSummaryUserById',
        payload: {
          id: location.query.reportID,
        },
      });
      dispatch({
        type: 'report/getUserReport',
        payload: {
          reportID: location.query.reportID,
          username: decodeURIComponent(location.query.userName),
          onSuccess: (response) => {
            console.log(response);
            setListQuestion(response);
          },
        },
      });
    }
  }, []);

  const onClickQuestion = (record) => {
    dispatch({
      type: 'test/getTestBankByIdModel',
      payload: {
        id: record.QuestionID,
        callback: (question) => {
          setCurrentTest({
            ...record,
            ...question,
          });
        },
      },
    });
  };

  const onClickCompareCode = () => {
    history.push({
      pathname: '/creator/report/user/compareCode',
      query: {
        reportID: location.query.reportID,
        userName: location.query.userName,
      },
    });
  };

  useEffect(() => {
    summaryUser?.forEach((item) => {
      if (item.UserName === decodeURIComponent(location.query.userName)) {
        setCurrentUser(item);
      }
    });
  }, [summaryUser]);
  // const report
  const userColumns = [
    {
      title: 'Question ID',
      dataIndex: 'QuestionID',
      key: 'QuestionID',
    },
    {
      title: 'Question Type',
      dataIndex: 'QuestionType',
      key: 'QuestionType',
    },
    {
      title: 'Score',
      dataIndex: 'Point',
      key: 'Point',
    },
  ];
  return currentTest ? (
    <RenderTestDetail
      test={currentTest}
      onBack={() => setCurrentTest(undefined)}
      onClickCompareCode={onClickCompareCode}
    />
  ) : (
    <PageHeaderWrapper
      onBack={() => history.goBack()}
      title={decodeURIComponent(location.query.userName)}
      className={`${styles.container} custom`}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <Progress
            type="circle"
            trailColor={'#f5222d'}
            strokeColor={'#a0d911'}
            percent={currentUser?.CorrectPercent}
            width={140}
            format={(percent) => {
              return (
                <div>
                  <div style={{ fontSize: 32 }}>{percent}%</div>
                  <div style={{ fontSize: 18 }}>Correct</div>
                </div>
              );
            }}
          />
        </div>
        <div style={{ width: '30%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Rank</Typography>
            <Typography style={{ fontWeight: 'bold' }}>
              {currentUser?.Rank} of {summaryUser?.length}
            </Typography>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Final Score</Typography>
            <Typography style={{ fontWeight: 'bold' }}>{currentUser?.Score}</Typography>
          </div>
        </div>
        <div style={{ width: '30%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Questions Answered</Typography>
            <Typography style={{ fontWeight: 'bold' }}>
              {currentUser?.AnsweredNumber} of {listQuestion.length}
            </Typography>
          </div>
          <Divider />
        </div>
      </div>
      <Table
        dataSource={listQuestion}
        columns={userColumns}
        locale={{ emptyText: NoData }}
        style={{ cursor: 'pointer' }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              onClickQuestion(record);
            }, // double click row
          };
        }}
      />
    </PageHeaderWrapper>
  );
};

const RenderTestDetail = ({ test, onBack, onClickCompareCode }) => {
  console.log(test);
  const checkCorrect = (listCorrect, index) => {
    return listCorrect.includes(index);
  };

  const testCasePass = useMemo(() => {
    if (test.QuestionType === 'Code') {
      let count = 0;
      for (let i = 0; i < test?.TestCase?.length; i++) {
        if (test?.TestCase[i] === test?.StudentOutput[i]) {
          count = count + 1;
        }
      }
      return `${count}/${test?.TestCase.length}`;
    }
    return '';
  }, [test?.TestCase, test?.StudentOutput, test?.QuestionType]);

  const renderExtra = () => {
    if (test.QuestionType === 'Code') {
      return [
        <Button key="1" type="primary" onClick={onClickCompareCode}>
          Compare With Other Code Submissions
        </Button>,
      ];
    }
    return [];
  };
  return (
    <PageHeaderWrapper
      onBack={onBack}
      className={`${styles.container} custom`}
      title={`${test.ID}-${test.QuestionType}`}
      extra={renderExtra()}
    >
      <Alert message={`Points achieved: ${test?.Point}`} type="success" showIcon />
      <br />
      <Alert message="Question information" type="info" showIcon />
      <br />
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
          <br />
          <Alert message="Student submission" type="info" showIcon />
          <br />
          <Alert message={`Test Case Pass: ${testCasePass}`} type="success" showIcon />
          <br />
          <div>
            <b>Student Submit Script: </b>
            <br />
            <MDEditor.Markdown
              className="problem"
              source={`\`\`\` \n${test?.StudentCodeScript}\n\`\`\`` || 'Empty'}
            ></MDEditor.Markdown>
            <br />
          </div>

          <div>
            <b>Student Memory Usage: </b>
            {test?.StudentMemoryUsage}
          </div>
          <div>
            <b>Student Running Time:</b>
            {test?.StudentRunningTime}
          </div>

          <b>Student TC Output:</b>
          <br />
          {test?.TestCase?.map((tc, index) => {
            return (
              <div className={styles.multipleChoiceContainer}>
                <div className={styles.answer}>
                  <div>Input: </div>
                  <div>{tc.Input}</div>
                </div>
                <div className={styles.answer}>
                  <div>Output: </div>
                  <div>{test?.StudentOutput[index]}</div>
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
          <br />
          <br />
          <Alert message="Student submission" type="info" showIcon />
          <br />
          <b>Student Answer: </b>
          {test?.Choice?.map((item) => {
            return <div className={styles.multipleChoiceContainer}>{test.Answer[item]}</div>;
          })}
        </>
      )}
    </PageHeaderWrapper>
  );
};

export default connect(({ report: { summaryUser } }) => ({ summaryUser }))(UserReport);
