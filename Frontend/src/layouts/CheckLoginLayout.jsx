import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';

class CheckLoginLayout extends React.Component {
  state = {
    isReady: false,
  };
 
  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props; 
    console.log(this.props);
    const isLogin = localStorage.getItem('currentUser');
    if (isLogin) {
      return <Redirect to={`/`} />;
    }

    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,

}))(CheckLoginLayout);
