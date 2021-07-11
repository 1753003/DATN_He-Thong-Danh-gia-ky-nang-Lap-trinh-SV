import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Button, Typography, Card } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { connect, useHistory } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import ReactMarkdown from 'react-markdown';
import NotFound from '@/pages/404';
import MDEditor from '@uiw/react-md-editor';

const TestDetail = ({ dispatch, location }) => {
  const history = useHistory();
  const [test, setTest] = useState({
    generalInformation: {},
    listQuestion: [],
  });
  const [loading, setLoading] = useState(false);

  const setTestInformation = (testObject) => {
    console.log(testObject);
    setTest(testObject);
    setLoading(false);
  };

  useEffect(() => {
    if (location.query.id) {
      setLoading(true);
      dispatch({
        type: 'test/getTestByIdModel',
        payload: { id: location.query.id, callback: setTestInformation },
      });
    }
  }, [location]);

  const handleEditClick = () => {
    history.push({
      pathname: '/creator/createTest',
      query: {
        id: location.query.id,
      },
    });
  };

  if (loading) return <PageLoading />;
  if (test)
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.testName}>{test.generalInformation?.TestName}</div>

          <div className={styles.otherInfo}>
            <p>
              <b>Permission: </b>
              {test.generalInformation?.Permissions || 'Public'}
            </p>

            <p>
              <b>TestCode: </b>
              {test.generalInformation?.TestCode}
            </p>

            <p>
              <b>Time: </b>
              {test.generalInformation?.TestTime}
            </p>
            <p>
              <b className={styles.bold}>Do again: </b>
              {test.generalInformation?.Again || 'false'}
            </p>
            <p>
              <b className={styles.bold}>Total of questions: </b>
              {test.listQuestion?.length}
            </p>
            <p>
              <b className={styles.bold}>Max score: </b>
              {test.generalInformation?.MaxScore} marks
            </p>
            {test.generalInformation?.StartTime && (
              <p>
                <b className={styles.bold}>Start date: </b>
                {test.generalInformation?.StartTime} marks
              </p>
            )}

            {test.generalInformation?.EndTime && (
              <p>
                <b className={styles.bold}>End Time: </b>
                {test.generalInformation?.EndTime} marks
              </p>
            )}
          </div>
          <div className={styles.editContainer}>
            <Button type="primary" onClick={handleEditClick}>
              Edit
            </Button>
          </div>
        </div>

        <div className={styles.right}>
          <h3>Questions</h3>
          <Question list={test?.listQuestion} />
        </div>
      </div>
    );

  if (!test) {
    return <NotFound />;
  }
};

const Question = ({ list }) => {
  const checkCorrect = (listCorrect, index) => {
    return listCorrect.includes(index);
  };
  return list?.map((item) => {
    return (
      <div className={styles.questionContainer}>
        <div className={styles.questionHead}>
          {item.ID}-{item.QuestionType}
        </div>
        <div className={styles.question}>{item.Question}</div>
        <b>Description: </b>
        <MDEditor.Markdown className="problem" source={item.Description}></MDEditor.Markdown>

        <div className={styles.mark}>{item.Score} mark</div>
        {item.QuestionType === 'Code' ? (
          <div>
            <div>
              <b>Language Allowed: </b>
              {item.Language_allowed}
            </div>
            <div>
              <b>Memory Usage: </b>
              {item.MemoryUsage}
            </div>
            <div>
              <b>Running Time: </b>
              {item.RunningTime}
            </div>
            <div>
              <b>CodeSample: </b>
              <br />
              <MDEditor.Markdown
                className="problem"
                source={`\`\`\` \n${item?.CodeSample}\n\`\`\`` || 'Empty'}
              ></MDEditor.Markdown>
              <br />
            </div>
            {item?.TestCase?.map((tc, index) => {
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
                source={`\`\`\`\n${item?.CodeSample}\n\`\`\`` || 'Empty'}
              ></MDEditor.Markdown>
              <br />
            </div>
            {item?.Answer?.map((choice, index) => {
              return (
                <div className={styles.multipleChoiceContainer}>
                  <div className={styles.answer}>{choice}</div>
                  <div className={styles.answer}>
                    {checkCorrect(item.CorrectAnswer, index) ? (
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
      </div>
    );
  });
};

export default connect(({ test: { testById } }) => ({
  test: testById,
}))(TestDetail);
