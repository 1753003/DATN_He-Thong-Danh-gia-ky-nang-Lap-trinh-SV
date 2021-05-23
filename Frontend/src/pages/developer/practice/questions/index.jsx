import React, { useEffect, useState } from 'react'
import './style.less'
import {
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
import DisscustionTab from '@/components/Discussions/DiscusstionTab';
import QuizWrapper from './components/QuizWrapper';
import Language from '@/locales/index';

const { TabPane } = Tabs;

const questionList = ({location, practice, dispatch, loading}) => {

  const [tabChange, onTabChange] = useState(false)
  useEffect(()=>{
    dispatch({
      type:'practice/setCurrentSubmission',
      payload:null
    })
  },[tabChange]);
  useEffect(()=>{
    dispatch({
      type:'practice/saveMultipleChoiceResponse',
      payload: null
    })
    dispatch({
      type:'practice/setCurrentSubmission',
      payload:null
    })
  },[]);
  const routes = [
    {
      key:'Developer',
      path: '/developer',
      breadcrumbName: 'Developer',
    },
    {
      key:'Practice',
      path: '/developer/practice',
      breadcrumbName: 'Practice',
    },
    {
      key:'List',
      path: `/developer/practice/list?listName=${encodeURIComponent(decodeURIComponent(location.query.listName))}`,
      breadcrumbName: decodeURIComponent(location.query.listName),
    },
    {
      key:'Practice',
      path: '',
      breadcrumbName: practice.listDetail?.generalInformation?.PracticeName,
    },
  ];
  useEffect(()=>{
    dispatch({
      type:'practice/getPracticeListDetail',
      payload: {'id':location.state.PracticeID}
    })
  }, [])
  
  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span key = {route.breadcrumbName}>{route.breadcrumbName}</span>
    ) : (
      <Link key={route.breadcrumbName} to={route.path}>{route.breadcrumbName}</Link>
    );
  }
  // console.log('pt',practice.listDetail)
  return (loading?<PageLoading></PageLoading>:
    <div>
      <PageHeader
        className="site-page-header"
        breadcrumb={{ routes, itemRender }}
        title={practice.listDetail?.generalInformation?.PracticeName}
        subTitle={practice.listDetail?.generalInformation?.BriefDescription}
      />
      <Row className="container">
      <Col className="tabs" span={19}>
        <Tabs className="custom" type="card" size="large" onChange={(key)=>{
          onTabChange(!tabChange)
          // console.log(tabChange)
          dispatch({
            type:'practice/getSubmissionList',
            payload: practice.listDetail.generalInformation.PracticeID
          })
        }}>
          <TabPane tab={Language.pages_practice_questions_problem} key="1">
            {practice.listDetail?.generalInformation.QuestionID.length<2?<Coding></Coding>:<QuizWrapper data={practice.listDetail}></QuizWrapper>}
          </TabPane>
          <TabPane tab={Language.pages_practice_questions_submission} key="2">
            <Submission></Submission>
          </TabPane>
          <TabPane tab={Language.pages_practice_questions_discussion} key="3">
            <DisscustionTab location = {location}></DisscustionTab>
          </TabPane>
        </Tabs>
      </Col>
      <Col className="info" flex='auto' span={4}>
        <Row justify="space-between">
          <Col >{Language.pages_practice_questions_author}<br/>{Language.pages_practice_questions_difficulty}<br/>{Language.pages_practice_questions_maxScore}</Col>
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