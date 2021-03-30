import React, { useEffect } from 'react'
import styles from './style.less'
import {
  Typography,
  Card,
  List,
  PageHeader
} from 'antd'
import {history, Link} from 'umi'
import { connect } from 'dva'
import PageLoading from '@/components/PageLoading'

const practiceList = ({location,dispatch,practice, loading}) => {
  useEffect(()=>{
    dispatch({
      type:'practice/getPracticeSetList',
      payload: encodeURIComponent(location.query.listName)
    })
  },[]);
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
      path: '',
      breadcrumbName: decodeURIComponent(location.query.listName),
    },
  ];
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
        title={decodeURIComponent(location.query.listName)}
        subTitle=""
      />
      {practice.list?.map((item,i) => {
        return (<Link key={i} to={"/developer/practice/questions?listName="+ encodeURIComponent(decodeURIComponent(location.query.listName)) + `&id=${item.PracticeID}`}>{item.BriefDescription}</Link>)}
      )}
      
    </div>
  );
}

export default connect(({practice, loading})=>({
  practice,
  loading : loading.effects['practice/getPracticeSetList']
}))(practiceList);