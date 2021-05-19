import React, { Component, useEffect, useState } from 'react'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
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
    style={{width:'100%'}}
    highlightActiveLine = {false}
    showPrintMargin = {false}
    />)}

    const Testcases =(result)=>  {return(
      <Tabs tabPosition="left" > {
        result.map((res,i) => {
          let title = (result.length>1)? 'Test Case '+ (i+1):'Example Test Case';
          return (
            <TabPane  tab={<span>{res.expected_output==res.stdout?<CheckCircleTwoTone twoToneColor="#52c41a" />:<CloseCircleTwoTone twoToneColor="#eb2f96"/>}{title}</span>} key={i+1} >
            {res.compile_output!=''&&<>{<h3>Compiler Message</h3>}
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

const current = JSON.parse(practice.currentSubmission.Answer);
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
  {practice.currentSubmission.SubmissionType === "Coding"?<div>
  <p>date: {practice.currentSubmission.CreatedAt}</p>
      <p> score: {practice.currentSubmission.Score}</p>
      <p>correctPercent: {practice.currentSubmission.CorrectPercent}</p>
      <Divider orientation='left'>Submitted Answer</Divider>
      {editor(u_atob(current[0].source_code))}
      <Divider orientation='left'>Test Cases</Divider>
    {Testcases(current)}
  </div>:<div>
  <p>date: {practice.currentSubmission.CreatedAt}</p>
      <p> score: {practice.currentSubmission.Score}</p>
      <p>correctPercent: {practice.currentSubmission.CorrectPercent}</p>
      <Divider orientation='left'>Submitted Answer</Divider>
    </div>}
      </div>}
    </>
  );

}

export default connect(({practice, loading})=>({
  practice
}))(SubmissionDetail);