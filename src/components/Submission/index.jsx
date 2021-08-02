import React, { useEffect } from 'react';
import { Table, Space, ConfigProvider } from 'antd';
import { connect } from 'dva';
import SubmissionDetail from '../SubmissionDetail';
import { SmileOutlined } from '@ant-design/icons';
import PageLoading from '../PageLoading';
import Language from '@/locales/index';
const { Column } = Table;

let data = [];

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <SmileOutlined style={{ fontSize: 20 }} />
    <p>{Language.noSubmission}</p>
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
            <ConfigProvider renderEmpty={customizeRenderEmpty}>
              <Table loading={{spinning:loading,indicator:<PageLoading/>}} dataSource={data}>
                <Column title="" dataIndex="key" key="no" />
                <Column
                  title={Language.result}
                  key="result"
                  render={(text, record) => (
                    <>
                      {record.CorrectPercent == 100
                        ? record.CorrectPercent + '%'
                        : record.CorrectPercent + '%'}
                    </>
                  )}
                />
                <Column title={Language.score} dataIndex="Score" key="score" />
                <Column title={Language.type} dataIndex="SubmissionType" key="type" />
                {/* <Column title="TIME" dataIndex="DoingTime" key="time" /> */}
                <Column
                  title=""
                  key="action"
                  render={(text, record) => (
                    <Space size="middle">
                      <a onClick={() => handleOnclick(record)}>{Language.viewDetails}</a>
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
