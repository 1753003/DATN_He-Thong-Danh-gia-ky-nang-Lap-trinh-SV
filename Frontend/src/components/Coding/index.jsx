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

const problem = `
Task
Complete the code in the editor below. The variables , , and  are already declared and initialized for you. You must:

Declare  variables: one of type int, one of type double, and one of type String.
Read  lines of input from stdin (according to the sequence given in the Input Format section below) and initialize your  variables.
Use the  operator to perform the following operations:
Print the sum of  plus your int variable on a new line.
Print the sum of  plus your double variable to a scale of one decimal place on a new line.
Concatenate  with the string you read as input and print the result on a new line.
`

class Coding extends Component{
  render(){
    return (
      <>
        <div className="problem">
          {problem}
        </div>
        <Divider></Divider>
        <div className="code-editor">
          <CodeEditor></CodeEditor>
          
          <Alert 
            message="Error"
            description="This is an error message about copywriting."
            type="error"
            showIcon></Alert>
          <div>
            <Divider orientation='left'>Test Case</Divider>
            <Tabs tabPosition="left">
              {TestCase('Test Case 1', 1, "Success","asd","asd","asd")}
            </Tabs>
          </div>
        </div>
      </>
    );
  }
}


export default connect(({})=>({

}))(Coding);