import React, { useState } from 'react';
import styles from './index.less';
import { Button, Modal } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const TestDetail = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalCancel = () => {
    setModalVisible(false);
  };
  const test = {
    TestName: 'JAVA - MIDTERM EXAM - 2021 (17CLC)',
    TestFavorite: 0,
    TestDone: 9,
    Permissions: {
      type: 'Private',
      groups: [
        {
          key: '17CLC1',
          GroupName: '17CLC1',
          GroupMembers: 43,
        },
        {
          key: '17CLC2',
          GroupName: '17CLC2',
          GroupMembers: 43,
        },
        {
          key: '17CLC3',
          GroupName: '17CLC3',
          GroupMembers: 43,
        },
        {
          key: '17CLC4',
          GroupName: '17CLC4',
          GroupMembers: 43,
        },
      ],
      individuals: [
        '1753057@student.hcmus.edu.vn',
        '1753064@student.hcmus.edu.vn',
        '1753047@student.hcmus.edu.vn',
        '1753058@student.hcmus.edu.vn',
      ],
    },
    TestTime: 90,
    DoAgain: true,
    TestSet: [
      {
        ID: '1',
        QuestionType: 'Quiz',
        Score: 5,
        Question: 'What is a correct syntax to output "Hello World" in Java?',
      },
      {
        ID: '2',
        QuestionType: 'Quiz',
        Score: 5,
        Question: 'How do you create a variable with the numeric value 5?',
        choices: [
          {
            choice: 'int x = 5 ;',
            answer: true,
          },
          {
            choice: 'float x = 5.0 ;',
            answer: false,
          },
          {
            choice: 'x = 5 ;',
            answer: false,
          },
          {
            choice: 'num x =  5 ;',
            answer: false,
          },
        ],
      },
      {
        ID: '3',
        QuestionType: 'Code',
        Score: 5,
        Question:
          'Write a simple Java program which will print Fibonacci series, e.g. 1 1 2 3 5 8 13 ... . up to a given number. We ...  ',
      },
      ,
      {
        ID: '4',
        QuestionType: 'Code',
        Score: 5,
        Question:
          'In an instance method or a constructor, "this" is a reference to the current object.',
      },
      {
        ID: '5',
        QuestionType: 'Code',
        Score: 5,
        Question:
          'This is generally asked as follow-up or alternative of the previous program. This time you need to check if given ...',
      },
    ],
    MaxScore: 20,
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src="https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?size=626&ext=jpg" />
        <div className={styles.testName}>{test.TestName}</div>
        <div className={styles.editContainer}>
          <p>
            {test.TestFavorite} favorite {test.TestDone} done
          </p>
          <Button type="primary">Edit</Button>
        </div>
        <div className={styles.otherInfo}>
          <p className={styles.bold}>{test.Permissions.type} Test</p>
          <a
            onClick={() => {
              setModalVisible(true);
            }}
          >
            (See list available users for this test)
          </a>
          <p>
            <b>Time: </b>
            {test.TestTime}
          </p>
          <p>
            <b className={styles.bold}>Do again: </b>
            {test.DoAgain}
          </p>
          <p>
            <b className={styles.bold}>Total of questions: </b>
            {test.TestSet.length}
          </p>
          <p>
            <b className={styles.bold}>Max score: </b>
            {test.MaxScore} marks
          </p>
        </div>
      </div>
      <div className={styles.right}>
        <h3>Questions</h3>
        <Question list={test.TestSet} />
      </div>
      <PermissionModal
        visible={modalVisible}
        handleCancel={handleModalCancel}
        list={test.Permissions}
      />
    </div>
  );
};

const Question = ({ list }) => {
  return list.map((item) => {
    return (
      <div className={styles.questionContainer}>
        <div className={styles.questionHead}>
          {item.ID}-{item.QuestionType}
        </div>
        <div className={styles.question}>{item.Question}</div>
        <div className={styles.mark}>{item.Score} mark</div>
        {item?.choices?.map((choice) => {
          return (
            <div className={styles.multipleChoiceContainer}>
              <div className={styles.answer}>{choice.choice}</div>
              <div className={styles.answer}>
                {choice.answer ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '32px' }} />
                ) : (
                  <CloseCircleTwoTone twoToneColor="red" style={{ fontSize: '32px' }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  });
};

const PermissionModal = ({ visible, list, handleCancel }) => {
  return (
    <Modal
      title="Add test to this collection"
      visible={visible}
      // onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary">
          Edit
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
      className={styles.modal}
      width={600}
    >
      <div className={styles.group}>
        <h3 className={styles.modalTitle}>Group</h3>
        {list.groups.map((item) => {
          return (
            <div className={styles.listGroup}>
              <div>{item.GroupName}</div>
              <div>{item.GroupMembers}</div>
              <a>See this group</a>
            </div>
          );
        })}
      </div>
      <div className={styles.individual}>
        <h3 className={styles.modalTitle}>Individuals</h3>
        {list?.individuals?.map((item) => {
          return (
            <div className={styles.listGroup}>
              <div>{item}</div>
              {/* <div>{item.Group}</div>
              <div>{item.GroupName}</div> */}
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
export default TestDetail;
