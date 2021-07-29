import React, { Component } from 'react';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import styles from './style.less';
import { Divider, Tabs, Alert } from 'antd';
import { connect } from 'dva';
import CodeEditor from '../CodeEditorQuiz';
import PageLoading from '@/components/PageLoading';
import { u_atob } from '@/utils/string';
import AceEditor from 'react-ace';
import Expand from 'react-expand-animated';
import 'brace/theme/tomorrow';
import SyntaxHighlighter from 'react-syntax-highlighter';
import MDEditor from '@uiw/react-md-editor';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
const { TabPane } = Tabs;
const AlertComponent = (alertMessage, alertDescription, alertType) => (
  <Alert
    style={{ whiteSpace: 'pre-wrap' }}
    message={alertMessage}
    description={alertDescription}
    type={alertType}
    showIcon
  ></Alert>
);

const editor = (value) => {
  return (
    <AceEditor
      className={styles.editor}
      readOnly={true}
      theme="tomorrow"
      value={value}
      minLines={1}
      maxLines={8}
      highlightActiveLine={false}
      showPrintMargin={false}
    />
  );
};
const Testcases = (result, custom) => {
  return (
    <Tabs tabPosition="left">
      {' '}
      {result.map((res, i) => {
        let title = result.length > 1 ? 'Test Case ' + (i + 1) : 'Example Test Case';
        if (custom == false) title = 'Custom check';
        return (
          <TabPane
            className={styles.testCase}
            tab={
              <span>
                {res.expected_output == res.stdout ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <CloseCircleTwoTone twoToneColor="#eb2f96" />
                )}
                {title}
              </span>
            }
            key={i + 1}
          >
            {res.compile_output != '' && (
              <>
                <h3>Compiler Message</h3>
                {editor(u_atob(res.compile_output))}
              </>
            )}
            {res.stdin != '' && (
              <>
                <h3>Input</h3>
                {editor(u_atob(res.stdin))}
              </>
            )}
            {res.expected_output != '' && custom != false && (
              <>
                <h3>Expected Output</h3>
                {editor(u_atob(res.expected_output))}
              </>
            )}
            {res.stdout != '' && (
              <>
                <h3>Your Output</h3>
                {editor(u_atob(res.stdout))}
              </>
            )}
          </TabPane>
        );
      })}
    </Tabs>
  );
};
class Coding extends Component {
  state = {
    alertType: 'error',
    alertMessage: '',
    alertDescription: '',
    custom: false,
  };
  getDescription = (text) => {
    var temp = text;
    return temp.split('\\n').map((str) => <p>{str}</p>);
  };

  setCustom = (value) => {
    this.setState({ custom: value });
  };
  render() {
    let alertMessage = '';
    let alertDescription = '';
    let alertType = 'error';
    let finalResult = [];
    // console.log(this.props.practice)
    if (this.props.judge.result)
      if (this.props.practice.isRun) {
        //if isRun
        finalResult = [
          {
            compile_output: this.props.judge.result?.compile_output,
            stdin: this.props.judge.result?.stdin,
            expected_output: this.props.judge.result?.expected_output,
            stdout: this.props.judge.result?.stdout,
          },
        ];

        switch (this.props.judge.result?.status_id) {
          case 3:
            alertType = 'success';
            alertMessage = 'Congratulation';
            // alertDescription = this.props.judge.result?u_atob(this.props.judge.result?.compile_output):"";
            alertDescription =
              'You have passed the sample test cases. Click the submit button to run your code against all the test cases.';
            // tcMessage = this.props.judge.result?.compile_output;
            // tcInput = u_atob(this.props.judge.result?.stdin)
            break;
          default:
            alertType = 'error';
            alertMessage = this.props.judge.result?.status.description;
            alertDescription = `Tip: Check the Compiler Output or Ask your Friends for help.`;
            break;
        }
      }

    //if isSubmit

    return (
      <>
       
          <MDEditor.Markdown source={this.props.description.replaceAll('\\n', '\n')} />
        
        {this.props.codeSample == null ? (
          ''
        ) : (
          <SyntaxHighlighter language="c" style={docco}>
            {this.props.codeSample.replaceAll('\\n', '\n')}
          </SyntaxHighlighter>
        )}
        <Divider></Divider>
        <div className="code-editor">
          <CodeEditor
            testCases={this.props.testCases}
            getCode={(value) => this.props.getCode(value)}
            codeDefault={this.props.codeDefault}
            codeSample= {this.props.codeSample}
            language={this.props.language}
            checkCustom={(value) => this.setCustom(value)}
          ></CodeEditor>
          {this.props.loading && (
            <PageLoading></PageLoading>
          )} 
          <Expand
          
          open={
            this.props.judge.result!==null
          }
          duration={600}
          transitions={['height', 'opacity', 'background']}
        >
              <div style={{paddingLeft:"5px",paddingRight:"5px", minHeight:"300px"}}>
                {this.state.custom != false
                  ? AlertComponent(alertMessage, alertDescription, alertType)
                  : ''}
                {this.state.custom != false ? (
                  <Divider orientation="left">Test Case</Divider>
                ) : (
                  <Divider orientation="left">Your output</Divider>
                )}
                {Testcases(finalResult, this.state.custom)}
              </div>
            )
          </Expand>
        </div>
      </>
    );
  }
}

export default connect(({ test, practice, judge, loading }) => ({
  judge,
  practice,
  test,
  loading: loading.effects['judge/sendCode'] || loading.effects['judge/sendCodeBatch'],
}))(Coding);
