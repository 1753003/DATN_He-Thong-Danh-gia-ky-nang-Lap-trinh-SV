import React, { Component } from 'react'
import AceEditor from 'react-ace';
import brace from  'brace'
import 'brace/mode/javascript'
import 'brace/mode/c_cpp'
import 'brace/mode/java'
import 'brace/theme/monokai'
import  { Button, Checkbox, Input } from 'antd'
import {connect} from 'dva'
import { template } from 'lodash-es';
const { TextArea } = Input;
const defaultInput = "default";

class CodeEditor extends Component{
  state ={
    customInput: false,
    codeVal: "",
    customVal: ""
  }
  handleCheckBoxChange = () => {
    this.setState({
      customInput: !this.state.customInput
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
  handleSendCode = (input) => new Promise((resolve, reject) => {
    let code = this.state.codeVal;
    let lang_id = 54 //54 C++ 71 python
    if(this.state.customInput == false)
      input = input
    else if(this.state.customVal == "")
      input = input
    else
      input = this.state.customVal
    // code = JSON.stringify(this.state.codeVal);
    code = code.replace(/(^")|("$)/g, '');
    code = btoa(code)
    const data = {
      "source_code":code,
      "language_id": lang_id,
      "stdin": btoa(input)
    }
    this.props.dispatch({
      type:'judge/sendCode',
      payload: data
    })
    resolve()
  })
  handleRun = () => {

    this.handleSendCode(this.props.testCases[0].Input[0])
    this.props.dispatch({
      type:'practice/changeStatusRun',
    })
  }
  handleSubmit = () => {
    let batch_Submission = []
    
    let code = this.state.codeVal;
    let lang_id = 54 //54 C++ 71 python
    code = code.replace(/(^")|("$)/g, '');
    code = btoa(code)
    for (var tc of this.props.testCases){
      console.log(tc.Input[0])
      var input = tc.Input[0]
      let data = {
        "source_code":code,
        "language_id": lang_id,
        "stdin": btoa(input)
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
    this.props.dispatch({
      type:'practice/changeStatusSubmit',
    })
  }
  componentDidUpdate(){
    console.log(this.props.practice)
    console.log(this.props.testCases)
    if (this.props.judge.isDone&&(this.props.practice.isSubmit||this.props.practice.isRun))
      {
        let isSubmit = false
        if(this.props.practice.isSubmit)
            isSubmit = true;
        this.props.dispatch({
        type:'judge/getResult',
        payload: isSubmit})
        
    }
  }
  render(){
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
      </div>
      <Button type="primary" onClick={this.handleRun.bind(this)}>Run</Button>
      <Button type="primary" onClick={this.handleSubmit.bind(this)}>Submit</Button>
      <Checkbox 
      onChange={this.handleCheckBoxChange.bind(this)}
      >Custom Input
      </Checkbox>
      <TextArea
      allowClear
      disabled={!this.state.customInput}
      onChange={this.handleCustomValChange.bind(this)}
      placeholder="Put your custom input here."
      autoSize={{ minRows: 3, maxRows: 5 }}
      />
      </>
    )
  }
}

export default connect(({practice, judge})=>({
  practice,
  judge,
  testCases: practice.listDetail?.listQuestion[0].TestCase
}))(CodeEditor);