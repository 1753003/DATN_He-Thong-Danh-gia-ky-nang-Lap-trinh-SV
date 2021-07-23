import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { connect, useHistory } from 'umi';
import styles from './styles.less';
import MDEditor from '@uiw/react-md-editor';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import '@/components/GlobalHeader/style.less';

const CompareCode = ({ location, dispatch }) => {
  const [list, setList] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (location.query.userName && location.query.reportID) {
      dispatch({
        type: 'report/getUserCodeCompare',
        payload: {
          reportID: location.query.reportID,
          username: decodeURIComponent(location.query.userName),
          onSuccess: (response) => {
            setList(response);
          },
        },
      });
    }
  }, []);
  const columns = [
    {
      title: 'UserName',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      title: 'Code',
      width: '70%',
      dataIndex: 'DescriptionCode',
      key: 'DescriptionCode',
      render: (code) => {
        return (
          <MDEditor.Markdown
            className="problem"
            source={`\`\`\` \n${code}\n\`\`\`` || 'Empty'}
          ></MDEditor.Markdown>
        );
      },
    },
    {
      title: 'Similarity Percent',
      dataIndex: 'SimilarityPercent',
      key: 'SimilarityPercent',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.SimilarityPercent - b.SimilarityPercent,
      render: (percent) => {
        return <p>{Math.round(percent * 100)} %</p>;
      },
    },
  ];
  return (
    <PageHeaderWrapper
      onBack={() => {
        history.goBack();
      }}
      title={`Code Compare With ${decodeURIComponent(location.query.userName)}`}
      className={`${styles.container} custom`}
    >
      <Table
        dataSource={list}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              history.push({
                pathname: '/creator/report/user',
                query: {
                  userName: encodeURIComponent(record.UserName),
                  reportID: location.query.reportID,
                },
              });
            }, // double click row
          };
        }}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ report: { summaryUser } }) => ({ summaryUser }))(CompareCode);
