import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { PageHeader, List } from 'antd';
import PageLoading from '@/components/PageLoading';
import moment from 'moment';
import MDEditor from '@uiw/react-md-editor';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import '@/components/GlobalHeader/style.less';
import Language from '@/locales/index';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
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
          className="custom"
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
                    {item.CodeSample != null && item.CodeSample != '' ? (
                      <SyntaxHighlighter language="javascript" style={docco}>
                        {item.CodeSample}
                      </SyntaxHighlighter>
                    ) : (
                      ''
                    )}
                    <p>
                      {Language.pages_profile_yougot} {item.Point} / {item.Score}{' '}
                      {Language.pages_profile_point}
                    </p>
                    {item.QuestionType == 'MultipleChoice' ? (
                      <List
                        dataSource={item.Answer}
                        renderItem={(e) => {
                          let color = '';
                          console.log(item.Choice, item.Answer, item.CorrectAnswer, e);
                          if (item.Choice.includes(item.Answer.indexOf(e))) {
                            if (item.CorrectAnswer.includes(item.Answer.indexOf(e)))
                              color = 'green';
                            else color = 'red';
                          }
                          if (color == 'green')
                            return (
                              <List.Item
                                style={{
                                  paddingLeft: '25px',
                                  paddingRight: '25px'
                                }}
                              >
                                <p>
                                  Answer {item.Answer.indexOf(e) + 1}: {e}
                                </p>
                                <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '30px'}}/>
                              </List.Item>
                            );
                          if (color == 'red')
                            return (
                              <List.Item
                                style={{
                                  paddingLeft: '25px',
                                  paddingRight: '25px'
                                }}
                              >
                                <p>
                                  Answer {item.Answer.indexOf(e) + 1}: {e}
                                </p>
                                <CloseCircleTwoTone twoToneColor="#eb2f96" style={{fontSize: '30px'}}/>
                              </List.Item>
                            );
                          return (
                            <List.Item style={{ backgroundColor: '', paddingLeft: '25px' }}>
                              <p>
                                {Language.pages_profile_answer} {item.Answer.indexOf(e) + 1}: {e}
                              </p>
                            </List.Item>
                          );
                        }}
                      />
                    ) : (
                      <>
                      <SyntaxHighlighter language="javascript" style={docco}>
                        {Buffer.from(item.DescriptionCode, 'base64').toString()}
                      </SyntaxHighlighter>
                      {Language.pages_profile_youpass} {item.TestCasePassed.length} / {item.OutputTestcase.length} testcase(s)
                      </>
                    )}
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
