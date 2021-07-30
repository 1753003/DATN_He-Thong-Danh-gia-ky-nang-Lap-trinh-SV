import React from 'react';
import { Redirect, connect } from 'umi';

class CheckLoginLayout extends React.Component {
  state = {
    isReady: false,
  };
 
  render() {
    const { children } = this.props; 
    // console.log(this.props);
    const isLogin = localStorage.getItem('currentUser');
    if (isLogin) {
      return <Redirect to={`/`} />;
    }

    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
}))(CheckLoginLayout);
