import React, {
  Component
} from 'react'
import styles from './style.less'
import AceEditor from 'react-ace';
import Animate from 'rc-animate';
import "brace/ext/searchbox"
// import 'ace-builds/src-min-noconflict/ext-options';
// import 'ace-builds/src-min-noconflict/ext-keybinding_menu';
// import 'ace-builds/src-min-noconflict/ext-prompt';
// import 'ace-builds/src-min-noconflict/ext-statusbar';
// import 'ace-builds/src-min-noconflict/ext-settings_menu';

import 'brace/mode/javascript'
import 'brace/mode/c_cpp'
import 'brace/mode/java'
import 'brace/theme/monokai'
import 'brace/theme/tomorrow'
import 'brace/snippets/c_cpp'
import 'brace/snippets/java'
import 'brace/snippets/javascript'
import 'brace/ext/language_tools';
// import "ace-builds/src-noconflict/snippets/c_cpp"
// import "ace-builds/src-noconflict/snippets/java"
// import "ace-builds/src-noconflict/snippets/javascript"
// import 'ace-builds/src-min-noconflict/ext-language_tools';

import {
  Button,
  Checkbox,
  Input,
  notification,
  Switch,
  Select,
  Space,
  Row
} from 'antd'
import {
  connect
} from 'dva'
import {
  u_atob,
  u_btoa
} from '@/utils/string';
import "../Coding/style.less"
import {
  QuestionCircleOutlined,
  CaretRightOutlined,
  SearchOutlined 
} from '@ant-design/icons';

// const IconFont = createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_2449607_3tn2o8mjobx.js',
// });
const { TextArea, Search } = Input;


class CodeEditor extends Component{
  constructor(props) {
    super(props)
    this.state ={
      codeVal: "",
      customVal: "",
      isSubmitBatch: false,
      showCustom: false,
      mode:"c_cpp",
      theme:"tomorrow",
      tabSize:2,
      fontSize: 16,
      
    }
    this.editorRef = React.createRef()
  }
  handleCheckBoxChange = () => {
    this.setState({
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
        "submissions": batch_Submission,
        "pid": this.props.practice.listDetail.generalInformation.PracticeID
      }

    this.props.dispatch({
      type:'judge/sendCodeBatch',
      payload: batch
    })
    
  }
  handleThemeChange = (value) => {
    this.setState({
      theme: value
    })
  }
  handleTabSizeChange = (value) => {
    this.setState({
      tabSize: value
    })
  }
  handleFontSizeChange = (value) => {
    this.setState({
      fontSize: value
    })
  }
  handleSearch = (value) =>{
    // console.log(value)
    // console.log(this.editorRef.current)
    const editor = this.editorRef.current.editor;
    // editor.find(value, {
    //   backwards: false,
    //   wrap: true,
    //   caseSensitive: false,
    //   wholeWord: false,
    //   regExp: true
    // });
    editor.execCommand("find")
  }

  render(){
    // 
    return(<div className={styles.container} >
        <Space className={styles.header}>
        
    <Select defaultValue="tomorrow" style={{ width: 120 }} onChange={(value)=>this.handleThemeChange(value)}>
      <Select.Option value="monokai">Dark</Select.Option>
      <Option value="tomorrow">Light</Option>
    </Select>
    <Select defaultValue={2} style={{ width: 120 }} onChange={(value)=>this.handleTabSizeChange(value)}>
      <Option value={2}>Tab size: 2</Option>
      <Option value={4}>Tab size: 4</Option>
    </Select>
    <Select defaultValue={16} style={{ width: 120 }} onChange={(value)=>this.handleFontSizeChange(value)} >
      <Option value={12}>12</Option>
      <Option value={14}>14</Option>
      <Option value={16}>16</Option>
      <Option value={18}>18</Option>
    </Select>
    <Button icon={<SearchOutlined />} onClick={()=>this.handleSearch()}>Find</Button>
    <Button icon={<QuestionCircleOutlined />} href="https://github.com/securingsincity/react-ace">Help</Button>
        </Space>
        <AceEditor
        ref ={this.editorRef}
        tabSize= {this.state.tabSize}
        style={{ whiteSpace: 'pre-wrap', border:'solid #dcdcdc 1px' }}
        width="100%"
        height="400px"
        showPrintMargin = {false}
        showGutter
        value={this.state.codeVal}
        mode={this.state.mode}
        theme={this.state.theme}
        fontSize={this.state.fontSize}
        editorProps={{ $blockScrolling: true,
          $blockSelectEnabled:false
        }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true
        }}
        onChange={this.handleCodeEditorChange.bind(this)}
        />

      <div className={styles.footer}>
      <Space className={styles.footer}>
        <Button size='large' className={styles.runBtn} type="primary" onClick={this.handleRun.bind(this)}><CaretRightOutlined style={{fontSize:'18px'}}/>Run Code</Button>
        <Button size='large' className={styles.submitBtn} type="primary" onClick={this.handleSubmit.bind(this)}>Submit</Button>
        <Checkbox 
        onChange={this.handleCheckBoxChange.bind(this)}
        >Custom Input
        </Checkbox>
        
      </Space>
        <Animate
          component=""
          showProp="showCustom"
          transitionName="fade"
          transitionAppear
          transitionEnter
          transitionLeave
        >
          {
            this.state.showCustom ? 
            <TextArea
            className={styles.customInput}
            allowClear
            onChange={this.handleCustomValChange.bind(this)}
            placeholder="Put your custom input here."
            autoSize={{ minRows: 3, maxRows: 5 }}
            /> : null}
        </Animate>
        </div>
      </div>
    )
  }
}

export default connect(({practice, judge})=>({
  practice,
  judge,
  testCases: practice.listDetail?.listQuestion[0].TestCase
}))(CodeEditor);