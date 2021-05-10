import React, {
  Component
} from 'react'
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone
} from '@ant-design/icons';
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
import {
  history,
  Link
} from 'umi'
import {
  connect
} from 'dva'
import CodeEditor from '../CodeEditor'
import PageLoading from '@/components/PageLoading'
import {
  u_atob,
  u_btoa
} from '@/utils/string'
import AceEditor from 'react-ace';
import 'brace/theme/tomorrow'
import ReactMarkdown from 'react-markdown'

const {TabPane} = Tabs;

const AlertComponent =(alertMessage,alertDescription,alertType)=> (<Alert 
  style={{ whiteSpace: 'pre-wrap' }}
  message={alertMessage}
  description={alertDescription}
  type={alertType}
  showIcon></Alert>);

const editor = (value) =>{return(
  <AceEditor className={styles.editor}
  readOnly={true} theme="tomorrow" value={value}
  minLines='1'
  maxLines='8'
  highlightActiveLine = {false}
  showPrintMargin = {false}
  />
)}
const Testcases =(result)=>  {return(
    <Tabs tabPosition="left"> {
      result.map((res,i) => {
        let title = (result.length>1)? 'Test Case '+ (i+1):'Example Test Case';
        return (
          <TabPane className={styles.testCase} tab={<span>{res.expected_output==res.stdout?<CheckCircleTwoTone twoToneColor="#52c41a" />:<CloseCircleTwoTone twoToneColor="#eb2f96"/>}{title}</span>} key={i+1} >
          {res.compile_output!=''&&<><h3>Compiler Message</h3>
          {editor(u_atob(res.compile_output))}</>}
          {res.stdin!=''&&<><h3>Input</h3>
          {editor(u_atob(res.stdin))}</>}
          {res.expected_output!=''&&<><h3>Expected Output</h3>
          {editor(u_atob(res.expected_output))}</>}
          {res.stdout!=''&&<><h3>Your Ourput</h3>
          {editor(u_atob(res.stdout))}</>}
        </TabPane>);
      })}
      </Tabs>)};
class Coding extends Component{
  state = {
    alertType: "error",
    alertMessage:"",
    alertDescription:"",
  }

  render(){
    let alertMessage = "";
    let alertDescription= "";
    let alertType = "error";
    let finalResult = [];
    // console.log(this.props.practice)
    // console.log(this.props.judge)
    
    if(this.props.judge.result)
    if (this.props.practice.isRun ){//if isRun
      console.log(this.props.judge.result?.expected_output)
      finalResult = [{
        "compile_output":this.props.judge.result?.compile_output,
        "stdin":this.props.judge.result?.stdin,
        "expected_output":this.props.judge.result?.expected_output,
        "stdout":this.props.judge.result?.stdout,
      }]
      switch (this.props.judge.result?.status_id) {
        case 3:
          alertType = "success"
          alertMessage = "Congratulation"
      // alertDescription = this.props.judge.result?u_atob(this.props.judge.result?.compile_output):"";
          alertDescription = 'You have passed the sample test cases. Click the submit button to run your code against all the test cases.'
      // tcMessage = this.props.judge.result?.compile_output;
      // tcInput = u_atob(this.props.judge.result?.stdin)
          break;
        default:
          alertType = "error"
          alertMessage = this.props.judge.result?.status.description
          alertDescription = `Tip: Check the Compiler Output or Ask your Friends for help.`
          break;
      }
    } else {
      //alert
      let tcPassed = 0;
      let total = 0
      if(this.props.judge.result)
      for(var res of this.props.judge.result.submissions){
        total +=1;
        res.status_id == 3 ? tcPassed +=1: tcPassed=tcPassed;
      };
      alertType = (tcPassed<total)?'error':'success'
      alertMessage=(tcPassed<total)?`${tcPassed}/${total} TEST CASES PASS`:`${tcPassed}/${total} TEST CASES PASS`
      alertDescription=(tcPassed<total)?'Try again.':'You solved this challenge.'
      //  testcases
      finalResult = this.props.judge.result.submissions

      console.log(finalResult)
    }
    
    //if isSubmit


    return (
      <>
        <ReactMarkdown className="problem" >
          {this.props.description}
        </ReactMarkdown>
        <Divider></Divider>
        <div className="code-editor">
          <CodeEditor></CodeEditor>
            {this.props.loading?(<PageLoading></PageLoading>):(this.props.practice.isRun||this.props.practice.isSubmit)&&<div>
            {AlertComponent(alertMessage, alertDescription, alertType)}
            <Divider orientation='left'>Test Case</Divider>
            {Testcases(finalResult)}
          </div>}
        </div>
      </>
    );
  }
}


export default connect(({practice, judge, loading})=>({
  judge,
  practice,
  loading: loading.effects['judge/sendCode']||loading.effects['judge/sendCodeBatch'],
  description: practice.listDetail?.listQuestion[0]?.Description,
  testCases: practice.listDetail?.listQuestion[0].TestCase
}))(Coding);