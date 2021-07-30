import React, { useEffect, useState } from 'react';
import './style.less';
import { PageHeader, Tabs, Row, Col, Typography } from 'antd';
import { Link } from 'umi';
import { connect } from 'dva';
import PageLoading from '@/components/PageLoading';
import Language from '@/locales/index';
import AsyncQuizWrapper from './components/AsyncQuizWrapper';
import AsyncSubmission from './components/AsyncSubmission';
import AsyncCoding from '@/components/AsyncCoding/AsyncCoding';
import AsyncDiscussionTab from './components/AsyncDiscussionTab';

const { TabPane } = Tabs;

const questionList = ({ location, practice, dispatch, loading }) => {
  const [tabChange, onTabChange] = useState(false);
  useEffect(() => {
    dispatch({
      type: 'practice/saveSubmissionList',
      payload: null,
    });
    dispatch({
      type: 'practice/setCurrentSubmission',
      payload: null,
    });
  }, [tabChange]);
  useEffect(() => {
    dispatch({
      type: 'practice/saveMultipleChoiceResponse',
      payload: null,
    });
    dispatch({
      type: 'practice/setCurrentSubmission',
      payload: null,
    });
  }, []);
  // console.log(practice)
  const routes = [
    {
      key: 'Developer',
      path: '/developer',
      breadcrumbName: 'Developer',
    },
    {
      key: 'Practice',
      path: '/developer/practice',
      breadcrumbName: 'Practice',
    },
    {
      key: 'List',
      path: `/developer/practice/list?listName=${encodeURIComponent(
        decodeURIComponent(location.query.listName),
      )}`,
      breadcrumbName: decodeURIComponent(location.query.listName),
    },
    {
      key: 'Practice',
      path: '',
      breadcrumbName: practice.listDetail?.generalInformation?.PracticeName,
    },
  ];
  useEffect(() => {
    dispatch({
      type: 'practice/getPracticeListDetail',
      payload: { id: location.state.id },
    });
  }, []);

  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span key={route.breadcrumbName}>{route.breadcrumbName}</span>
    ) : (
      <Link key={route.breadcrumbName} to={route.path}>
        {route.breadcrumbName}
      </Link>
    );
  }
  // console.log('pt',practice.listDetail)
  return loading ? (
    <PageLoading></PageLoading>
  ) : (
    <div>
      <PageHeader
        className="site-page-header"
        breadcrumb={{ routes, itemRender }}
        title={practice.listDetail?.generalInformation?.PracticeName}
        subTitle={practice.listDetail?.generalInformation?.BriefDescription}
      />
      <Row className="container" justify="space-around">
        <Col className="tabs" span={19}>
          <Tabs
            className="custom"
            type="card"
            size="large"
            onChange={(key) => {
              onTabChange(!tabChange);
              // console.log(tabChange)
              dispatch({
                type: 'practice/getSubmissionList',
                payload: practice.listDetail.generalInformation.PracticeID,
              });
            }}
          >
            <TabPane tab={Language.pages_practice_questions_problem} key="1" style={{minHeight:"320px"}}>
              {practice.listDetail?.generalInformation.QuestionID.length < 2 ? (
                <AsyncCoding></AsyncCoding>
              ) : (
                <AsyncQuizWrapper data={practice.listDetail}></AsyncQuizWrapper>
              )}
            </TabPane>
            <TabPane tab={Language.pages_practice_questions_submission} key="2" style={{minHeight:"320px"}}>
              <AsyncSubmission></AsyncSubmission>
            </TabPane>
            <TabPane tab={Language.pages_practice_questions_discussion} key="3">
              <AsyncDiscussionTab location={location}></AsyncDiscussionTab>
            </TabPane>
          </Tabs>
        </Col>
        <Col className="info" flex span={5}>
          <Row gutter={12} justify="space-between">
            <Col>
              {Language.pages_practice_questions_author}
              <br />
              {Language.pages_practice_questions_difficulty}
              <br />
              {Language.pages_practice_questions_maxScore}
            </Col>
            <Col style={{ textAlign: 'right' }}>
              Codejoy
              <br />
              <Typography.Text
                strong
                style={
                  practice.listDetail?.generalInformation?.DifficultLevel === 'Easy'
                    ? { color: 'green' }
                    : practice.listDetail?.generalInformation?.DifficultLevel === 'Medium'
                    ? { color: '#ed7e0c' }
                    : { color: 'red' }
                }
              >
                {practice.listDetail?.generalInformation?.DifficultLevel}
              </Typography.Text>
              <br />
              {practice.listDetail?.generalInformation?.Score}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ practice, loading, judge }) => ({
  judge: judge.state,
  loading: loading.effects['practice/getPracticeListDetail'],
  practice: practice,
}))(questionList);
