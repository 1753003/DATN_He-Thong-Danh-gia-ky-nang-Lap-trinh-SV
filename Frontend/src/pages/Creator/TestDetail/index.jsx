import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Button, Modal } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { connect } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';

const TestDetail = ({ test, dispatch, location }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalCancel = () => {
    setModalVisible(false);
  };

  // const test = {
  //   TestName: 'JAVA - MIDTERM EXAM - 2021 (17CLC)',
  //   TestFavorite: 0,
  //   TestDone: 9,
  //   Permissions: {
  //     type: 'Private',
  //     groups: [
  //       {
  //         key: '17CLC1',
  //         GroupName: '17CLC1',
  //         GroupMembers: 43,
  //       },
  //       {
  //         key: '17CLC2',
  //         GroupName: '17CLC2',
  //         GroupMembers: 43,
  //       },
  //       {
  //         key: '17CLC3',
  //         GroupName: '17CLC3',
  //         GroupMembers: 43,
  //       },
  //       {
  //         key: '17CLC4',
  //         GroupName: '17CLC4',
  //         GroupMembers: 43,
  //       },
  //     ],
  //     individuals: [
  //       '1753057@student.hcmus.edu.vn',
  //       '1753064@student.hcmus.edu.vn',
  //       '1753047@student.hcmus.edu.vn',
  //       '1753058@student.hcmus.edu.vn',
  //     ],
  //   },
  //   TestTime: 90,
  //   DoAgain: true,
  //   TestSet: [
  //     {
  //       ID: '1',
  //       QuestionType: 'Quiz',
  //       Score: 5,
  //       Question: 'What is a correct syntax to output "Hello World" in Java?',
  //     },
  //     {
  //       ID: '2',
  //       QuestionType: 'Quiz',
  //       Score: 5,
  //       Question: 'How do you create a variable with the numeric value 5?',
  //       choices: [
  //         {
  //           choice: 'int x = 5 ;',
  //           answer: true,
  //         },
  //         {
  //           choice: 'float x = 5.0 ;',
  //           answer: false,
  //         },
  //         {
  //           choice: 'x = 5 ;',
  //           answer: false,
  //         },
  //         {
  //           choice: 'num x =  5 ;',
  //           answer: false,
  //         },
  //       ],
  //     },
  //     {
  //       ID: '3',
  //       QuestionType: 'Code',
  //       Score: 5,
  //       Question:
  //         'Write a simple Java program which will print Fibonacci series, e.g. 1 1 2 3 5 8 13 ... . up to a given number. We ...  ',
  //     },
  //     ,
  //     {
  //       ID: '4',
  //       QuestionType: 'Code',
  //       Score: 5,
  //       Question:
  //         'In an instance method or a constructor, "this" is a reference to the current object.',
  //     },
  //     {
  //       ID: '5',
  //       QuestionType: 'Code',
  //       Score: 5,
  //       Question:
  //         'This is generally asked as follow-up or alternative of the previous program. This time you need to check if given ...',
  //     },
  //   ],
  //   MaxScore: 20,
  // };

  useEffect(() => {
    console.log(location.query.id);
    dispatch({ type: 'test/getTestByIdModel', payload: { id: location.query.id } });
  }, []);

  useEffect(() => {
    console.log(test);
  }, [test]);
  return test.generalInformation ? (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={test.generalInformation.img} />
        <div className={styles.testName}>{test.generalInformation?.TestName}</div>
        <div className={styles.editContainer}>
          <Button type="primary">Edit</Button>
        </div>
        <div className={styles.otherInfo}>
          <p className={styles.bold}>{test.generalInformation?.Permissions} Test</p>
          <p>
            <b>Time: </b>
            {test.generalInformation?.TestTime}
          </p>
          <p>
            <b className={styles.bold}>Do again: </b>
            {test.generalInformation?.Again}
          </p>
          <p>
            <b className={styles.bold}>Total of questions: </b>
            {test.listQuestion?.length}
          </p>
          <p>
            <b className={styles.bold}>Max score: </b>
            {test.generalInformation?.MaxScore} marks
          </p>
        </div>
      </div>
      <div className={styles.right}>
        <h3>Questions</h3>
        <Question list={test?.listQuestion} />
      </div>
    </div>
  ) : (
    <PageLoading />
  );
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
        <div className={styles.mark}>{item.Score} mark</div>
        {item.QuestionType === 'Code' ? (
          <div>
            <div>{item.Description}</div>
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
            {item?.TestCase?.map((tc, index) => {
              return (
                <div className={styles.multipleChoiceContainer}>
                  <div className={styles.answer}>
                    <div>Input: </div>
                    <div>
                      {tc.Input.map((item) => (
                        <div>{item}</div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.answer}>
                    <div>Output: </div>
                    <div>
                      {tc.Output.map((item) => (
                        <div>{item}</div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          item?.Answer?.map((choice, index) => {
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
          })
        )}
        {/* {item?.Answer?.map((choice, index) => {
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
        })} */}
      </div>
    );
  });
};

export default connect(({ test: { testById } }) => ({
  test: testById,
}))(TestDetail);
