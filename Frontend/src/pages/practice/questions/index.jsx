import React, { useEffect, useState } from 'react'
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
import { connect } from 'dva'
import { result } from 'lodash-es';
import PageLoading from '@/components/PageLoading';
import Submission from '@/components/Submission';
const { TabPane } = Tabs;

const questionList = ({location, practice, dispatch, loading}) => {
  const [tabChange, onTabChange] = useState(false)
  useEffect(()=>{
    dispatch({
      type:'practice/',
      payload: tabChange
    })
  },[tabChange]);
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
      path: `/developer/practice/list?listName=${encodeURIComponent(decodeURIComponent(location.query.listName))}`,
      breadcrumbName: decodeURIComponent(location.query.listName),
    },
    {
      path: '',
      breadcrumbName: decodeURIComponent(location.query.name),
    },
  ];
  useEffect(()=>{
    dispatch({
      type:'practice/getPracticeListDetail',
      payload: {'id':1}
    })
  }, [])
  
  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    );
  }

  return (loading?<PageLoading></PageLoading>:
    <div>
      <PageHeader
        className="site-page-header"
        breadcrumb={{ routes, itemRender }}
        title={practice.listDetail?.generalInformation?.PracticeName}
        subTitle={practice.listDetail?.generalInformation?.BriefDescription}
      />
      <Row>
      <Col className="tabs" span={19}>
        <Tabs animated={{ inkBar: true, tabPane: true }} className="custom" type="card" size="large" onChange={(key)=>{
          onTabChange(!tabChange)
          console.log(tabChange)
          dispatch({
            type:'practice/getSubmissionList',
            payload: practice.listDetail.generalInformation.PracticeID
          })
        }}>
          <TabPane tab="Problem" key="1">
            <Coding></Coding>
          </TabPane>
          <TabPane tab="Submission" key="2">
            <Submission></Submission>
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
          <Col style={{textAlign:'right'}}>Admin<br/>{practice.listDetail?.generalInformation?.DifficultLevel}<br/>{practice.listDetail?.generalInformation?.Score}</Col>
        </Row>
      </Col>
      </Row>
      
    </div>
  );
}

export default connect(({practice, loading, judge})=>({
  judge:judge.state,
  loading: loading.effects['practice/getPracticeListDetail'],
  practice: practice,
}))(questionList);