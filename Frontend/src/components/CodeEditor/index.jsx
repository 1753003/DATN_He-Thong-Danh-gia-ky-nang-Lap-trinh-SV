import React, { Component } from 'react'
import AceEditor from 'react-ace';
import brace from  'brace'
import 'brace/mode/javascript'
import 'brace/mode/c_cpp'
import 'brace/mode/java'
import 'brace/theme/monokai'
import "brace/ext/language_tools"
import StatusBar from  "brace/ext/statusbar"
import  { Button, Checkbox, Input, notification } from 'antd'
import {connect} from 'dva'
import { u_atob, u_btoa } from '@/utils/string';
import "../Coding/style.less"
const { TextArea } = Input;


class CodeEditor extends Component{
  state ={
    customInput: false,
    codeVal: "",
    customVal: "",
    isSubmitBatch: false,
    showCustom: false
  }
  handleCheckBoxChange = () => {
    this.setState({
      customInput: !this.state.customInput,
      showCustom:!this.state.showCustom
    })
  }
  handleCodeEditorChange = (val) => {
    this.setState({
      codeVal: val
    })
  }
  handleCustomValChange = (e) => {
    this.setState({
      customVal: e.target.value
    })
  }
  handleSendCode = (input, expected_output) => new Promise((resolve, reject) => {
    let code = this.state.codeVal
    let lang_id = 54 //54 C++ 71 python
    if(this.state.customInput == false)
      input = input
    else if(this.state.customVal == "")
      input = input
    else
      input = this.state.customVal
    // code = JSON.stringify(this.state.codeVal);
    code = code.replace(/(^")|("$)/g, '');
    code = u_btoa(code)

    const data = {
      "source_code":code,
      "language_id": lang_id,
      "stdin": u_btoa(input),
      "expected_output": u_btoa(expected_output)
    }
    
    this.props.dispatch({
      type:'judge/sendCode',
      payload: data
    })
    resolve()
  })
  handleRun = () => {
    if (this.state.codeVal==""){
        notification.error({
          message: 'Hey Listen!',
          description:
            'Dont leave your code blank',
          className:"code-notification",
          type:'error'
        });
        return;
      }
    this.handleSendCode(this.props.testCases[0].Input[0],this.props.testCases[0].Output[0])
  }
  handleSubmit = () => {
    if (this.state.codeVal==""){
      notification.open({
        message: 'Hey Listen!',
        description:
          'Dont leave your code blank',
        className:"code-notification",
        type:'error'
      });
      return;
    }
    this.setState
    ({
      isSubmitBatch: true
    })
    let batch_Submission = []
    
    let code = this.state.codeVal;
    let lang_id = 54 //54 C++ 71 python
    code = code.replace(/(^")|("$)/g, '');
    code = u_btoa(code)
    for (var tc of this.props.testCases){
      // console.log(tc.Input[0])
      var input = tc.Input[0]
      var expected_output = tc.Output[0]
      let data = {
        "source_code":code,
        "language_id": lang_id,
        "stdin": u_btoa(input),
        "expected_output": u_btoa(expected_output)
      }
        batch_Submission.push(data)
      }
      const batch = {
        "submissions": batch_Submission
      }

    this.props.dispatch({
      type:'judge/sendCodeBatch',
      payload: batch
    })
    
  }
  
  render(){
    console.log(StatusBar)
    return(<>
      <div>
        <AceEditor
        
        style={{ whiteSpace: 'pre-wrap' }}
        width="100%"
        height="400px"
        showPrintMargin = {false}
        showGutter
        value={this.state.codeVal}
        highlightActiveLine
        mode="c_cpp"
        theme="monokai"
        fontSize={18}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true
        }}
        onChange={this.handleCodeEditorChange.bind(this)}
        />
        <div>{StatusBar.StatusBar}</div>
      </div>
      <Button type="primary" onClick={this.handleRun.bind(this)}>Run</Button>
      <Button type="primary" onClick={this.handleSubmit.bind(this)}>Submit</Button>
      <Checkbox 
      onChange={this.handleCheckBoxChange.bind(this)}
      >Custom Input
      </Checkbox>
      {this.state.showCustom&&<TextArea
      allowClear
      disabled={!this.state.customInput}
      onChange={this.handleCustomValChange.bind(this)}
      placeholder="Put your custom input here."
      autoSize={{ minRows: 3, maxRows: 5 }}
      />}
      </>
    )
  }
}

export default connect(({practice, judge})=>({
  practice,
  judge,
  testCases: practice.listDetail?.listQuestion[0].TestCase
}))(CodeEditor);