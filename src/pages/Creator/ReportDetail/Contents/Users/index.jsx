import React, { useState } from 'react';
import styles from './index.less';
import { Table, Modal, Progress, Typography, Divider } from 'antd';
import '../../../../../components/GlobalHeader/style.less';

const Users = ({ summaryUser }) => {
  console.log(summaryUser);
  const [visible, setVisible] = useState(false);
  const [currentSelect, setCurrentSelect] = useState(undefined);
  console.log(currentSelect);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      title: 'Rank',
      dataIndex: 'Rank',
      key: 'Rank',
      sorter: (a, b) => a.Rank - b.Rank,
    },
    {
      title: 'Correct Percent',
      dataIndex: 'CorrectPercent',
      key: 'CorrectPercent',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.CorrectPercent - b.CorrectPercent,
    },
    {
      title: 'Answerd',
      dataIndex: 'AnsweredNumber',
      key:'AnsweredNumber',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.Unanswered - b.Unanswered,
    },
    {
      title: 'Final Score',
      dataIndex: 'Score',
      key: 'Score',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.Score - b.Score,
    },
  ];

  const userCollumns = [
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
      title: 'Answered',
      dataIndex: 'Answered',
      key: 'Answered',
    },
    {
      title: 'RunningTime',
      dataIndex: 'RunningTime',
      key: 'RunningTime',
    },
  ];

  const renderInfo = () => {
    return (
      <div
        title={`${currentSelect?.userName}`}
        className="custom"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={800}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <Progress
              type="circle"
              trailColor={'#f5222d'}
              strokeColor={'#a0d911'}
              percent={currentSelect?.CorrectPercent}
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
                {currentSelect?.Rank} of {summaryUser?.length}
              </Typography>
            </div>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Final Score</Typography>
              <Typography style={{ fontWeight: 'bold' }}>{currentSelect?.Score}</Typography>
            </div>
          </div>
          <div style={{ width: '30%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Questions Answered</Typography>
              <Typography style={{ fontWeight: 'bold' }}>
                {currentSelect?.AnsweredNumber} of {currentSelect?.ListQuestion?.length}
              </Typography>
            </div>
            <Divider />
          </div>
        </div>
        <Table
          dataSource={currentSelect?.ListQuestion}
          columns={userCollumns}
          scroll={{ y: '40vh' }}
        />
      </div>
    );
  };

  return (
    <div className={`${styles.container} custom`}>
      {currentSelect ? (
        renderInfo()
      ) : (
        <Table
          dataSource={summaryUser}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: (event) => {
                setCurrentSelect(record);
              }, // double click row
            };
          }}
        />
      )}
    </div>
  );
};

export default Users;
