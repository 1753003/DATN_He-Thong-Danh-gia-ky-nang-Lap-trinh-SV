import React, { Component, useEffect, useState } from 'react'
import styles from './style.less'
import 'brace/mode/javascript'
import 'brace/mode/c_cpp'
import 'brace/mode/java'
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
  Alert,
  Table,
  Space,
  Tag
} from 'antd'
import 'brace/theme/kuroir'
import {history, Link} from 'umi'
import { connect } from 'dva'
import CodeEditor from '../CodeEditor'
import PageLoading from '@/pages/dashboard/analysis/components/PageLoading'
import { u_atob, u_btoa } from '@/utils/string'
import AceEditor from 'react-ace';
const { Column, ColumnGroup } = Table;
const {TabPane} = Tabs;
const data =[
  {
      "source_code": "I2luY2x1ZGUgPGlvc3RyZWFtPgojaW5jbHVkZSA8c3RyaW5nPgoKaW50IG1h\naW4odm9pZCkgewogICAgc3RkOjpzdHJpbmcgYTsKICAgIHN0ZDo6Y2luPj5h\nOwogIHN0ZDo6Y291dDw8KGE9PWE/InRydWUiOiJmYWxzZSIpOwogIHJldHVy\nbiAwOwp9\n",
      "language_id": 54,
      "stdin": "bGV2ZWw=\n",
      "expected_output": "dHJ1ZQ==\n",
      "stdout": "dHJ1ZQ==\n",
      "status_id": 3,
      "created_at": "2021-03-25T14:12:56.157Z",
      "finished_at": "2021-03-25T14:12:58.734Z",
      "time": "0.007",
      "memory": 27284,
      "stderr": "",
      "token": "56fa319c-2293-4134-8221-5bcd58d99932",
      "number_of_runs": 1,
      "cpu_time_limit": "5.0",
      "cpu_extra_time": "1.0",
      "wall_time_limit": "10.0",
      "memory_limit": 128000,
      "stack_limit": 64000,
      "max_processes_and_or_threads": 60,
      "enable_per_process_and_thread_time_limit": false,
      "enable_per_process_and_thread_memory_limit": false,
      "max_file_size": 1024,
      "compile_output": "",
      "exit_code": 0,
      "exit_signal": "",
      "message": "",
      "wall_time": "0.036",
      "compiler_options": "",
      "command_line_arguments": "",
      "redirect_stderr_to_stdout": false,
      "callback_url": "",
      "additional_files": "",
      "enable_network": true,
      "status": {
          "id": 3,
          "description": "Accepted"
      },
      "language": {
          "id": 54,
          "name": "C++ (GCC 9.2.0)"
      }
  },
  {
      "source_code": "I2luY2x1ZGUgPGlvc3RyZWFtPgojaW5jbHVkZSA8c3RyaW5nPgoKaW50IG1h\naW4odm9pZCkgewogICAgc3RkOjpzdHJpbmcgYTsKICAgIHN0ZDo6Y2luPj5h\nOwogIHN0ZDo6Y291dDw8KGE9PWE/InRydWUiOiJmYWxzZSIpOwogIHJldHVy\nbiAwOwp9\n",
      "language_id": 54,
      "stdin": "bGV2ZWxz\n",
      "expected_output": "ZmFsc2U=\n",
      "stdout": "dHJ1ZQ==\n",
      "status_id": 4,
      "created_at": "2021-03-25T14:12:56.177Z",
      "finished_at": "2021-03-25T14:14:12.869Z",
      "time": "0.003",
      "memory": 7668,
      "stderr": "",
      "token": "76f78ab1-1093-4a6f-8b60-e972d53a06de",
      "number_of_runs": 1,
      "cpu_time_limit": "5.0",
      "cpu_extra_time": "1.0",
      "wall_time_limit": "10.0",
      "memory_limit": 128000,
      "stack_limit": 64000,
      "max_processes_and_or_threads": 60,
      "enable_per_process_and_thread_time_limit": false,
      "enable_per_process_and_thread_memory_limit": false,
      "max_file_size": 1024,
      "compile_output": "",
      "exit_code": 0,
      "exit_signal": "",
      "message": "",
      "wall_time": "0.014",
      "compiler_options": "",
      "command_line_arguments": "",
      "redirect_stderr_to_stdout": false,
      "callback_url": "",
      "additional_files": "",
      "enable_network": true,
      "status": {
          "id": 4,
          "description": "Wrong Answer"
      },
      "language": {
          "id": 54,
          "name": "C++ (GCC 9.2.0)"
      }
  },
  {
      "source_code": "I2luY2x1ZGUgPGlvc3RyZWFtPgojaW5jbHVkZSA8c3RyaW5nPgoKaW50IG1h\naW4odm9pZCkgewogICAgc3RkOjpzdHJpbmcgYTsKICAgIHN0ZDo6Y2luPj5h\nOwogIHN0ZDo6Y291dDw8KGE9PWE/InRydWUiOiJmYWxzZSIpOwogIHJldHVy\nbiAwOwp9\n",
      "language_id": 54,
      "stdin": "QSBjYXIsIGEgbWFuLCBhIG1hcmFjYQ==\n",
      "expected_output": "dHJ1ZQ==\n",
      "stdout": "dHJ1ZQ==\n",
      "status_id": 3,
      "created_at": "2021-03-25T14:12:56.196Z",
      "finished_at": "2021-03-25T14:12:59.548Z",
      "time": "0.013",
      "memory": 34296,
      "stderr": "",
      "token": "5c43a2f4-ba1c-4ba6-956e-4187ab05c858",
      "number_of_runs": 1,
      "cpu_time_limit": "5.0",
      "cpu_extra_time": "1.0",
      "wall_time_limit": "10.0",
      "memory_limit": 128000,
      "stack_limit": 64000,
      "max_processes_and_or_threads": 60,
      "enable_per_process_and_thread_time_limit": false,
      "enable_per_process_and_thread_memory_limit": false,
      "max_file_size": 1024,
      "compile_output": "",
      "exit_code": 0,
      "exit_signal": "",
      "message": "",
      "wall_time": "0.055",
      "compiler_options": "",
      "command_line_arguments": "",
      "redirect_stderr_to_stdout": false,
      "callback_url": "",
      "additional_files": "",
      "enable_network": true,
      "status": {
          "id": 3,
          "description": "Accepted"
      },
      "language": {
          "id": 54,
          "name": "C++ (GCC 9.2.0)"
      }
  }
]
const SubmissionDetail = ({dispatch, practice, loading}) =>{
  useEffect(()=>{
    // console.log(practice)
  },[]);
  
  const editor = (value) =>{return(
    <AceEditor className={styles.editor}
    mode='c_cpp'
    fontSize={16}
    readOnly={true} theme="kuroir" value={value}
    minLines='1'
    maxLines='8'
    highlightActiveLine = {false}
    showPrintMargin = {false}
    />)}

    const Testcases =(result)=>  {return(
      <Tabs tabPosition="left"> {
        result.map((res,i) => {
          let title = (result.length>1)? 'Test Case '+ (i+1):'Example Test Case';
          return (
            <TabPane className={styles.testCase} tab={title} key={i+1} >
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
  return (
    <>{!practice.currentSubmission?<PageLoading></PageLoading>:<div>
    <PageHeader
    className="submission-page-header"
    onBack={() => {
      dispatch({
        type:'practice/setCurrentSubmission',
        payload:null
      })
    }}
    title="Back to Your Submmission List"
  />
      <p>date: {practice.currentSubmission.createAt}</p>
      <p> score: {practice.currentSubmission.Score}</p>
      <p>correctPercent: {practice.currentSubmission.correctPercent}</p>
      <Divider orientation='left'>Submitted Answer</Divider>
      {editor(`#include <iostream>
#include <string>

int main(void) {
    std::string a;
    std::cin>>a;
  std::cout<<(a==a?"true":"false");
  return 0;
}`)}
      <Divider orientation='left'>Test Cases</Divider>
    {Testcases(data)}
      </div>}
    </>
  );

}

export default connect(({practice, loading})=>({
  practice
}))(SubmissionDetail);