import React, { Component, useEffect, useState } from 'react';
import { Table, Space, ConfigProvider } from 'antd';
import { connect } from 'dva';
import SubmissionDetail from '../SubmissionDetail';
import { SmileOutlined } from '@ant-design/icons';
const { Column } = Table;

let data = [];

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <SmileOutlined style={{ fontSize: 20 }} />
    <p>No Submissions Found. Let do some practice!</p>
  </div>
);

const Submission = ({ dispatch, practice, loading }) => {
  useEffect(() => {
    dispatch({
      type: 'practice/getSubmissionList',
      payload: practice.listDetail.generalInformation.PracticeID,
    });
  }, []);
  useEffect(() => {
    data = [];
    let i = 1;
    practice.submissions?.forEach((submission) => {
      var temp = submission;
      temp.key = i;
      i += 1;
      data.push(temp);
    });
  }, [practice.submissions]);
  const handleOnclick = (submission) => {
    dispatch({
      type: 'practice/getSubmissionDetail',
      payload: { submission },
    });
  };
  return (
    <>
      {
        <div>
          {practice.currentSubmission != null ? (
            <SubmissionDetail></SubmissionDetail>
          ) : (
            <ConfigProvider renderEmpty={ customizeRenderEmpty}>
              <Table loading={loading} dataSource={data}>
                <Column title="" dataIndex="key" key="no" />
                <Column
                  title="RESULT"
                  key="result"
                  render={(text, record) => (
                    <>
                      {record.CorrectPercent == 100
                        ? record.CorrectPercent + '%'
                        : record.CorrectPercent + '%'}
                    </>
                  )}
                />
                <Column title="SCORE" dataIndex="Score" key="score" />
                <Column title="TYPE" dataIndex="SubmissionType" key="type" />
                {/* <Column title="TIME" dataIndex="DoingTime" key="time" /> */}
                <Column
                  title=""
                  key="action"
                  render={(text, record) => (
                    <Space size="middle">
                      <a onClick={() => handleOnclick(record)}>View Details</a>
                    </Space>
                  )}
                />
              </Table>
            </ConfigProvider>
          )}
        </div>
      }
    </>
  );
};

export default connect(({ practice, loading }) => ({
  practice,
  loading: loading.effects['practice/getSubmissionList'],
}))(Submission);
