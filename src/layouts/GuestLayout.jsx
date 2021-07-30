import React from 'react';
import { Inspector } from 'react-dev-inspector';
import { connect } from 'dva';

const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const Layout = ({ children, user, dispatch }) => {
  // console.log(user.currentUser);
  return <InspectorWrapper>{children}</InspectorWrapper>;
};

export default connect (({ user }) => ({
    user
}))(Layout)
