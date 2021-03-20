import React from 'react'
import styles from './style.less'
import {
  Typography,
  Card,
  List,
  PageHeader
} from 'antd'
import {history, Link} from 'umi'
import { connect } from 'dva'

const data = [
  {
    title: 'C Programming Set',
  },
  {
    title: 'C++ Programming Set',
  },
  {
    title: 'Java Programming Set',
  },
  {
    title: 'JavaScript Programming Set',
  },
];

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
      path: '',
      breadcrumbName: decodeURIComponent(location.query.name),
    },
  ];
  function itemRender(route, params, routes, paths) {
    console.log(route.path)
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
        title={decodeURIComponent(location.query.name)}
        subTitle=""
      />
      <Link to={"/developer/practice/questions?name="+ decodeURIComponent(location.query.name) + "&set=array"}>example</Link>
    </div>
  );
}

export default connect(({})=>({

}))(practiceList);