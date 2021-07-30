import React, { Component } from 'react';
import './custom.less';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import styles from './style.less';
import { Divider, Tabs, Alert, Row, Col, Button, Typography } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import { connect } from 'dva';
import CodeEditor from '../CodeEditor';
import PageLoading from '@/components/PageLoading';
import { u_atob } from '@/utils/string';
import AceEditor from 'react-ace';
import 'brace/theme/tomorrow';
import Expand from 'react-expand-animated';
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
const Testcases = (result) => {
    if (result === null){
      result = [
        {
          expected_output: ":)",
          stdout:":)",
          compile_output:":)",
          stdin:":)"
        }
      ]
    }
  return (
    <Tabs className={styles.resultTab} tabPosition="top">
      {' '}
      {result.map((res, i) => {
        let title = result.length > 1 ? 'Test Case ' + (i + 1) : 'Example Test Case';
        return (
          <TabPane
          className="result-tabpane"
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
            {res.expected_output != '' && (
              <>
                <h3>Expected Output</h3>
                {editor(u_atob(res.expected_output))}
              </>
            )}
            {res.stdout != '' && (
              <>
                <h3>Your Ourput</h3>
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
  constructor(props){
    super(props);
    this.state = {
      alertType: 'error',
      alertMessage: '',
      alertDescription: '',
      collapse: false,
      colLayout: this.props.fullscreen?{
        description: 6,
        code: 18
      }:{
        description: 24,
        code: 24
      },
      editorValue:this.props.editorValue,
    };
  }
  handleEditorValue = (val) =>{
    this.props.changeEditorValue(val)
  }
  handleCollapse = () =>{
    this.setState({
      collapse:!this.state.collapse
    })
  }
  render() {
    let alertMessage = '';
    let alertDescription = '';
    let alertType = 'error';
    let finalResult = [];
    // console.log(this.props.practice)
    // console.log(this.props.judge);

    if (this.props.judge.result)
      if (this.props.practice.isRun) {
        //if isRun
        // console.log(this.props.judge.result?.expected_output);
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
      } else {
        //alert
        let tcPassed = 0;
        let total = 0;
        if (this.props.judge.result)
          for (var res of this.props.judge.result.submissions) {
            total += 1;
            res.status_id == 3 ? (tcPassed += 1) : (tcPassed = tcPassed);
          }
        alertType = tcPassed < total ? 'error' : 'success';
        alertMessage =
          tcPassed < total
            ? `${tcPassed}/${total} TEST CASES PASS`
            : `${tcPassed}/${total} TEST CASES PASS`;
        alertDescription = tcPassed < total ? 'Try again.' : 'You solved this challenge.';
        //  testcases
        finalResult = this.props.judge.result.submissions;

        // console.log(finalResult);
      }

    //if isSubmit
    return (
      <Row className="coding-wrapper" gutter={48}>
        <Col span = {this.state.colLayout.description}>
          {this.props.fullscreen&&<Typography.Title className="problem-title" level={3}>Problem</Typography.Title>}
        <MDEditor.Markdown className="problem" source={this.props.description}></MDEditor.Markdown>
        <Divider></Divider>
        </Col>
        <Col span={this.state.colLayout.code}>

        <div className="code-editor">
          <CodeEditor editorValue={this.props.editorValue} handleEditorValue={this.handleEditorValue} fullscreen={this.props.fullscreen} handleFullscreen = {this.props.handleFullscreen}></CodeEditor>
          {this.props.loading && <PageLoading tip="Processing... Please wait a moment." />}
          <Expand
          
            open={
              this.props.judge.result!==null && (this.props.practice.isRun || this.props.practice.isSubmit)
            }
            duration={600}
            transitions={['height', 'opacity', 'background']}
          >
            <div style={{paddingLeft:"5px",paddingRight:"5px"}}>
              {this.props.judge.result!==null &&AlertComponent(alertMessage, alertDescription, alertType)}
              <Divider orientation="left">Test Case</Divider>
              {Testcases(finalResult)}
            </div>
          </Expand>
        </div>
        </Col>
      </Row>
    );
  }
}

export default connect(({ practice, judge, loading }) => ({
  judge,
  practice,
  loading: loading.effects['judge/sendCode'] || loading.effects['judge/sendCodeBatch'],
  description: practice.listDetail?.listQuestion[0]?.Description,
  testCases: practice.listDetail?.listQuestion[0].TestCase,
}))(Coding);
