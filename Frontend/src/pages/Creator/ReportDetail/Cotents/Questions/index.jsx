import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Table, Modal, Progress, Typography } from 'antd';
import '../../../../../components/GlobalHeader/style.less';
import { connect } from 'umi';

const Questions = ({ dispatch, summaryReport }) => {
  const [visible, setVisible] = useState(false);
  const [currentSelect, setCurrentSelect] = useState(null);
  const [list, setList] = useState([]);

  const setTestInformation = (testObject) => {
    console.log(testObject);
    setList(testObject.listQuestion);
  };

  useEffect(() => {
    if (summaryReport) {
      dispatch({
        type: 'test/getTestByIdModel',
        payload: { id: summaryReport.ID, callback: setTestInformation },
      });
    }
  }, []);

  const columns = [
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'Type',
      dataIndex: 'QuestionType',
      key: 'QuestionType',
    },
  ];

  const callBackSumaryQuestion = (response) => {
    setVisible(true);
    set;
    console.log(response);
  };

  return (
    <div className={`${styles.container} custom`}>
      <Table
        dataSource={list}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              const payload = {
                id: record.ID,
                callback: callBackSumaryQuestion,
              };
              dispatch({ type: 'report/getSummaryQuestionById', payload });
            }, // double click row
          };
        }}
      />
      <Modal
        title={`${currentSelect?.ID} - ${currentSelect?.QuestionType}`}
        className="custom"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={800}
      >
        <div>
          <b>{currentSelect?.Description}</b>
        </div>
      </Modal>
    </div>
  );
};

export default connect(({ report: { reportList }, loading }) => ({
  reportList,
  loading: loading.effects['report/fetchReportList'],
}))(Questions);
