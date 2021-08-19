import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { PageHeader, List } from 'antd';
import PageLoading from '@/components/PageLoading';
import moment from 'moment';
import MDEditor from '@uiw/react-md-editor';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import "@/components/GlobalHeader/style.less";
import Language from '@/locales/index';
class TestAnswer extends React.Component {
  constructor(props) {
    super(props);
    let id = props.location.state.id;

    this.props.dispatch({
      type: 'accountAndcenter/fetchAnswer',
      payload: id,
    });
  }

  getData = () => {
    let { answerSheet } = this.props.accountAndcenter;
    var count = 1;
    answerSheet.map((e) => {
      e.key = count++;
      return e;
    });
    return answerSheet;
  };

  render() {
    console.log(this.getData());
    return (
      <>
        <PageHeader
          className="ranking-page-header"
          title={Language.pages_profile_reviewTitle}
          subTitle={this.props.location.state.name}
          onBack={() => history.goBack()}
        />
        <List
          dataSource={this.getData()}
          className = "custom"
          style={{
            backgroundColor: 'white',
            marginLeft: '25px',
            marginRight: '25px',
            paddingLeft: '10px',
          }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={Language.pages_profile_question.concat(item.key).concat(': ')}
                description={
                  <>
                    <MDEditor.Markdown source={item.Description} />
                    {item.CodeSample != null && item.CodeSample != "" ? (
                      <SyntaxHighlighter language="javascript" style={docco}>
                        {item.CodeSample}
                      </SyntaxHighlighter>
                    ) : (
                      ''
                    )}
                    <p>
                      {Language.pages_profile_yougot} {item.Point} / {item.Score} {Language.pages_profile_point}
                    </p>
                  </>
                }
              ></List.Item.Meta>
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default connect(({ accountAndcenter, loading }) => ({
  accountAndcenter,
  loading: loading.effects['accountAndcenter/fetchAnswer'],
}))(TestAnswer);
