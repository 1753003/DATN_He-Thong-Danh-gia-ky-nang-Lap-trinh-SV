import React from 'react'
import styles from './style.less'
import {
  Typography,
  Card,
  List,
  PageHeader,
  Tabs,
} from 'antd'
import {history, Link} from 'umi'
import coding from '@/components/coding';

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
        title={decodeURIComponent(location.query.set)}
        subTitle=""
      />
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Tab 1" key="1">
            <coding></coding>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default practiceList;