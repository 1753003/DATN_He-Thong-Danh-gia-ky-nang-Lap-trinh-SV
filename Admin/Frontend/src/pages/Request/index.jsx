import React from 'react';
import { connect } from 'dva';
import { Table, Space, Button, message, Popconfirm } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
class Request extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch({ type: 'test/fetchRequest' });
  }

  column = [
    {
      title: 'Test name',
      dataIndex: 'TestName',
    },
    {
      title: 'Creator',
      dataIndex: 'CreatorName',
    },
    {
      title: 'Date',
      dataIndex: 'CreatedAt',
    },
    {
      title: 'View Details',
      render: (item) => <a href="">Details</a>,
    },
    {
      title: 'Operation',
      render: (item) => (
        <Space size="large">
          <Popconfirm
            title="Are you sure to accept this test to public?"
            onConfirm={() => {
              this.props.dispatch({
                type: 'test/acceptRequest',
                payload: { testID: item.TestID, userID: item.CreatedBy },
              });
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
            placement="topLeft"
          >
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          </Popconfirm>
          <Popconfirm
            title="Are you sure to deny this test to public?"
            onConfirm={() => {
              this.props.dispatch({
                type: 'test/denyRequest',
                payload: { testID: item.TestID, userID: item.CreatedBy },
              });
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
            placement="topLeft"
          >
            <CloseCircleTwoTone twoToneColor="red" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  getDataSource() {
    var data = this.props.test.request;
    console.log(data);
    var count = 0;
    data.map((item) => {
      item.key = count++;
    });
    return data;
  }

  render() {
    return (
      <div>
        <Table dataSource={this.getDataSource()} columns={this.column}></Table>
      </div>
    );
  }
}

export default connect(({ test }) => ({
  test,
}))(Request);
