import React, { Component } from 'react'
import AceEditor from 'react-ace';
import brace from  'brace'
import 'brace/mode/javascript'
import 'brace/mode/java'
import 'brace/mode/javascript'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import  { Button, Checkbox, Input } from 'antd'
const { TextArea } = Input;
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
  render(){
    return(<>
      <div>
        <AceEditor
        width="100%"
        height="400px"
        showPrintMargin
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
      <Button type="primary">Run</Button>
      <Button type="primary">Submit</Button>
      <Checkbox 
      onChange={this.handleCheckBoxChange}
      >Custom Input
      </Checkbox>
      <TextArea
      allowClear
      disabled={!this.state.customInput}
      // value={value}
      // onChange={this.onChange}
      placeholder="Put your custom input here."
      autoSize={{ minRows: 3, maxRows: 5 }}
      />
      </>
    )
  }
}

export default CodeEditor;