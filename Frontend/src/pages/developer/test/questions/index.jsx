import React, { useEffect, useState } from 'react'
import './style.less'
import {
  PageHeader,
  Tabs,
  Row,
  Col
} from 'antd'
import {history, Link, withRouter} from 'umi'
import { connect } from 'dva'
const { TabPane } = Tabs;

const Questions = ({location, testDev, dispatch, loading}) => {
  console.log("quesions",location)
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title={location.state.TestName}
        subTitle={location.state.BriefDescription}
        onBack= {()=>history.goBack()}
      />
      <Row>
      <Col className="tabs" span={19}>
        <Tabs className="custom" type="card" size="large" >
          <TabPane tab="Problem" key="1">
            {/* <Problem data = {location.state}></Problem> */}
          </TabPane>
          <TabPane tab="Submission" key="2">

          </TabPane>
          <TabPane tab="Discussion" key="3">

          </TabPane>
        </Tabs>
      </Col>
      <Col className="info" flex='auto' span={4}>
        <Row justify="space-between">
          <Col >Author<br/>Difficulty<br/>Max Score</Col>
          <Col style={{textAlign:'right'}}>Admin<br/>{""}<br/>{""}</Col>
        </Row>
      </Col>
      </Row>
      
    </div>
  );
}
const QuestionsWrapper = withRouter(Questions)
export default connect(({testDev, loading, judge})=>({
  judge:judge.state,

  testDev: testDev,
}))(QuestionsWrapper);