import React from 'react';
import styles from './index.less';
import { Table } from 'antd';

const Questions = () => {
  const columns = [
    {
      title: 'Question',
      dataIndex: 'Question',
      key: 'Question',
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
    },
    {
      title: 'Correct',
      dataIndex: 'Correct',
      key: 'Correct',
    },
  ];

  const dataSource = [
    {
      key: 0,
      Question: '1. What is your comment on the below C statement?',
      Type: 'Quiz',
      Correct: 90,
    },
    {
      key: 1,
      Question: '2.  What is the output of the following program?  ',
      Type: 'Quiz',
      Correct: 90,
    },
    {
      key: 2,
      Question: '3. A macro can execute faster than a function.',
      Type: 'Quiz',
      Correct: 90,
    },
    {
      key: 3,
      Question: '4. What is the output of the following program?',
      Type: 'True and False',
      Correct: 90,
    },
    {
      key: 4,
      Question: '5. What is the built in library function to compare two strings?',
      Type: 'True and False',
      Correct: 90,
    },
  ];

  return (
    <div className={styles.container}>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Questions;
