import React from 'react';
import { connect } from 'dva';
import { Col, Row, Card } from 'antd';
class Home extends React.Component {
  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="New accounts" bordered={false}>
              4 new accounts this week
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Visits" bordered={false}>
              23 visits to the site this week
            </Card>
          </Col>
          <Col span={8}>
            <Card title="New requests" bordered={false}>
              4 new public test requests
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(({ loading }) => ({}))(Home);
