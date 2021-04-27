import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, connect, FormattedMessage } from 'umi';
import { notification } from 'antd';
import React from 'react';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';
import { getPageQuery } from '@/utils/utils';
import { SmileOutlined } from '@ant-design/icons';
const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });

  const errCode = getPageQuery().errorCode;
  var msg = '';

  if (errCode == 1 || errCode == 2)
    msg = "There are some problems with your login session, please log in again."
  else if (errCode == 3) 
    msg = "Maybe someone broke into your account, please log in again and change password if you can."
  if (msg !== '')
    notification.open({
      message: 'Login session error',
      description: msg,
      icon: <SmileOutlined rotate={180} style={{ color: '#108ee9' }} />,
    });
  
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>DevCheck</span>
              </Link>
            </div>
            <div className={styles.desc}>
              <FormattedMessage
                id="pages.layouts.userLayout.title"
                defaultMessage="Codejoy is your choice!"
              />
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
