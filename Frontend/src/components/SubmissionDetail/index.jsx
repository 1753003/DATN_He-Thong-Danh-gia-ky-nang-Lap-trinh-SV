import React, { Component, useEffect, useState } from 'react'
import { CheckCircleTwoTone, CloseCircleTwoTone, ConsoleSqlOutlined } from '@ant-design/icons';
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
const CheckboxGroup = Checkbox.Group
const SubmissionDetail = ({dispatch, data, listQuestion, loading}) =>{
  const [result, setResult] = useState([])
  useEffect(()=>{
    const tempResult = []
    if(listQuestion[0].TestCase)
    testCase.forEach((tc,i)=>{
      let temp = {}
      temp.expected_output = JSON.stringify(tc.Output[0]);
      temp.stdin = JSON.parse(JSON.stringify(tc.Input[0]));
      temp.stdout = data.data[0].OutputTestcase[i]
      if(typeof(temp.stdout)!=="string"){
        temp.compile_output = data.data[0].OutputTestcase[i].compile_output
        temp.stdout = ""
      }
      else
        temp.compile_output =""
      tempResult.push(temp)
    })
    setResult(tempResult)
  },[]);
  
  const editor = (value) =>{
    return(
    <AceEditor className={styles.editor}
    mode='c_cpp'
    fontSize={16}
    readOnly={true} theme="kuroir" value={value}
    minLines={1}
    maxLines={8}
    style={{width:'100%'}}
    highlightGutterLine = {false}
    highlightActiveLine = {false}
    showPrintMargin = {false}
    />)}

    const Testcases =(result)=>  {
      return(
      <Tabs tabPosition="left" > {
        result.map((res,i) => {
          let title = 'Test Case '+ (i+1);
          return (
            <TabPane tab={<span>{res.expected_output===u_atob(res.stdout)?<CheckCircleTwoTone twoToneColor="#52c41a" />:<CloseCircleTwoTone twoToneColor="#eb2f96"/>}{title}</span>} key={i+1} >
            {res.compile_output!=''&&<>{<h3>Compiler Message</h3>}
            {editor(u_atob(res.compile_output))}</>}
            {res.stdin!=''&&<><h3>Input</h3>
            {editor(res.stdin)}</>}
            {res.expected_output!=''&&<><h3>Expected Output</h3>
            {editor(res.expected_output)}</>}
            {res.stdout!=''&&<><h3>Your Ourput</h3>
            {editor(u_atob(res.stdout))}</>}
          </TabPane>);
        })}
        </Tabs>)};

  return (
    <>{loading?<PageLoading></PageLoading>:<div>
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
  {data.info.SubmissionType === "Coding"?<div>
  <p>date: {data.info.CreatedAt}</p>
      <p> score: {data.info.Score}</p>
      <p>correctPercent: {data.info.CorrectPercent}</p>
      <Divider orientation='left'>Submitted Answer</Divider>
      {editor(u_atob(data.data[0].DescriptionCode))}
      <Divider orientation='left'>Test Cases</Divider>
      {Testcases(result)}
  </div>:<div>
  <p>date: {data.info.CreatedAt}</p>
      <p> score: {data.info.Score}</p>
      <p>correctPercent: {data.info.CorrectPercent}</p>
      <h2>Submitted Answer</h2>
      {data.data.map((item,i)=>{
        let temp = []
        for (var choice in item.Choice){
          temp.push(listQuestion[i].Answer[choice])
        }
        return <div>
          <Divider></Divider>
          <h3>Question {i+1}. {listQuestion[i].Description}</h3>
          <h4>Your answer: <CheckboxGroup 
          disabled
        value={temp}
        options={listQuestion[i].Answer}
        ></CheckboxGroup></h4>
        </div>
      })}
    </div>}
      </div>}
    </>
  );

}

export default connect(({practice, loading})=>({
  data:practice.currentSubmission,
  loading: loading.effects['practice/getSubmissionDetail'],
  listQuestion: practice.listDetail.listQuestion
}))(SubmissionDetail);