import React from 'react';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';

import Banner from './Banner';
import './static/style';
import '@/locales/index'
import Language from '@/locales/index';

let isMobile;

enquireScreen((b) => {
  isMobile = b;
});

class Home extends React.PureComponent {
  state = {
    isMobile,
  }
  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }
  render() {
    return (
      <DocumentTitle title={Language.config_welcome}>
          <div className="home-wrapper">
            <Banner isMobile={this.state.isMobile} />
          </div>
      </DocumentTitle>
    );
  }
}

export default Home;
