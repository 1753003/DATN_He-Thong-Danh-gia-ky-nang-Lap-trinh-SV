import React, { Component } from 'react'
import AceEditor from 'react-ace';
import brace from  'brace'
import 'brace/mode/javascript'
import 'brace/mode/java'
import 'brace/mode/javascript'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import  { Button, Checkbox, Input } from 'antd'
import {connect} from 'dva'
const { TextArea } = Input;
const defaultInput = "default input";
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
    // console.log(val)
  }
  handleCustomValChange = (e) => {
    this.setState({
      customVal: e.target.value
    })
  }
  handleRun = () => {
    let input= "";
    let code = "";
    if(this.state.customInput == false)
      input = defaultInput
    else if(this.state.customVal == "")
      input = defaultInput
    else
      input = this.state.customVal
    code = this.state.codeVal;
    const data = {
      input,
      code
    }
    console.log(this.state.customInput, data)
  }
  render(){
    return(<>
      <div>
        <AceEditor
        
        width="100%"
        height="400px"
        showPrintMargin = {false}
        showGutter
        highlightActiveLine
        mode="javascript"
        theme="monokai"
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
      <Button type="primary">Submit</Button>
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

export default connect(({})=>({

}))(CodeEditor);