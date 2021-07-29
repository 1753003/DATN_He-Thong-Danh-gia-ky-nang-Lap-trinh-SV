// import { PageLoading } from '@ant-design/pro-layout'; // loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
import { Spin } from 'antd';
// import Icon, { LoadingOutlined } from '@ant-design/icons';
import './style.less'

import React from 'react';
import BoxLoading from 'react-loadingg/lib/BoxLoading';

const PageLoading = ({tip}) => {
  return <div className="page-loading-container">
  <BoxLoading size="large" color="#09abb4"/>
  <p className="page-loading-tip">{tip}</p>
  </div>
};
Spin.setDefaultIndicator(PageLoading);

export default PageLoading;
