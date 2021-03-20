import React from 'react'
import './style.less'
import {
  Typography,
  Card,
  List,
  PageHeader,
  Tabs,
  Row,
  Col
} from 'antd'
import {history, Link} from 'umi'
import Coding from '@/components/Coding';

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

const practiceList = ({location}) => {
  const routes = [
    {
      path: '/developer',
      breadcrumbName: 'Developer',
    },
    {
      path: '/developer/practice',
      breadcrumbName: 'Practice',
    },
    {
      path: `/developer/practice/list?name=${decodeURIComponent(location.query.name)}`,
      breadcrumbName: decodeURIComponent(location.query.name),
    },
    {
      path: '',
      breadcrumbName: decodeURIComponent(location.query.set),
    },
  ];
  function itemRender(route, params, routes, paths) {
    // console.log(route.path)
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    );
  }
  return (
    <div>
      <PageHeader
        className="site-page-header"
        breadcrumb={{ routes, itemRender }}
        title={decodeURIComponent(location.query.set)}
        subTitle=""
      />
      <Row>
      <Col className="tabs" span={19}>
        <Tabs className="custom" type="card" size="large">
          <TabPane tab="Problem" key="1">
            <Coding></Coding>
          </TabPane>
          <TabPane tab="Submission" key="2">
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
          </TabPane>
          <TabPane tab="Discussion" key="3">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
        </Tabs>
      </Col>
      <Col className="info" flex='auto' span={4}>
        <Row justify="space-between">
          <Col >Author<br/>Difficulty<br/>Max Score</Col>
          <Col style={{textAlign:'right'}}>Nguyen Van A<br/>Medium<br/>100</Col>
        </Row>
      </Col>
      </Row>
      
    </div>
  );
}

export default practiceList;