import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';
import { Result } from 'antd';
class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }
 
  render() {
    const { isReady } = this.state;
    const { children, loading } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const currentUser = localStorage.getItem('currentUser');
    const isLogin = currentUser;
    const queryString = stringify({
      redirect: window.location.href,
    });
    console.log(isLogin, loading);
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    var type = localStorage.getItem('antd-pro-authority');
    if (type.includes("creator"))
      type = "creator"
    else if (type.includes("developer"))
      type = "developer";
    console.log(children.props.location.pathname);
    console.log(type)
    if (!children.props.location.pathname.includes(type))
      return (<Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
    />)
    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
