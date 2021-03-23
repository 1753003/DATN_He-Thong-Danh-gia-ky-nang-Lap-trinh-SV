import React, { Component } from 'react'
import styles from './style.less'
import {
  Typography,
  Card,
  List,
  PageHeader,
  Divider,
  Button,
  Checkbox,
  Input,
  Tabs,
  Alert
} from 'antd'
import {history, Link} from 'umi'
import { connect } from 'dva'
import CodeEditor from '../CodeEditor'
import PageLoading from '@/pages/dashboard/analysis/components/PageLoading'

const {TabPane} = Tabs;
const TestCase = (name, key, m, i, e, o) => (
  <TabPane className={styles.testCase} tab={name} key={key} >
    <h3>Compiler Message</h3>
    <p>{m}</p>
    <h3>Input</h3>
    <p>{i}</p>
    <h3>Expected Output</h3>
    <p>{e}</p>
    <h3>Your Ourput</h3>
    <p>{o}</p>
  </TabPane>
)

class Coding extends Component{
  state = {
    alertType: "error",
    alertMessage:"",
    alertDescription:"",
  }
  render(){
    return (
      <>
        <div className="problem" >
          {this.props.description}
        </div>
        <Divider></Divider>
        <div className="code-editor">
          <CodeEditor></CodeEditor>
            {this.props.loading!=false?((this.props.practice.isRun||this.props.practice.isSubmit)&&<PageLoading></PageLoading>):<div>
            <Alert 
            style={{ whiteSpace: 'pre-wrap' }}
            message={this.props.judge.result?.status.description}
            description={atob(this.props.judge.result?.compile_output)+'\n'+atob(this.props.judge.result?.message)+atob(this.props.judge.result?.stdout) +atob(this.props.judge.result?.stderr) }
            type={this.props.judge.result?.status.id==3?'success':'error'}
            showIcon></Alert>
            <Divider orientation='left'>Test Case</Divider>
            <Tabs tabPosition="left">
            {
              this.props.testCases.map((tc,i) => {
                let title = 'Test Case '+ (i+1);
                if(this.props.practice.isRun){
                  title = "Example Test Case";
                  if(i > 0)
                    {
                      return null;
                    }
                    return TestCase(title, i+1, tc.Output == atob(this.props.judge.result?.stdout)?"Success":"Failed",tc.Input,tc.Output.toString(),atob(this.props.judge.result?.stdout))
                }
                
              })}
            </Tabs>
          </div>}
        </div>
      </>
    );
  }
}


export default connect(({practice, judge, loading})=>({
  judge,
  practice,
  loading: loading.effects['judge/getResult'],
  description: practice.listDetail?.listQuestion[0]?.Description,
  testCases: practice.listDetail?.listQuestion[0].TestCase
}))(Coding);