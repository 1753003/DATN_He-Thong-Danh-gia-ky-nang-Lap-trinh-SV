import React, { Component, useEffect, useState } from 'react'
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
  Alert,
  Table,
  Space,
  Tag
} from 'antd'
import {history, Link} from 'umi'
import { connect } from 'dva'
import CodeEditor from '../CodeEditor'
import PageLoading from '@/pages/dashboard/analysis/components/PageLoading'
import { u_atob, u_btoa } from '@/utils/string'
import AceEditor from 'react-ace';
import SubmissionDetail from '../SubmissionDetail'
const { Column, ColumnGroup } = Table;

let data = [];

const Submission = ({dispatch, practice, loading}) =>{
  useEffect(()=>{
    // console.log(practice.listDetail)
    dispatch({
      type:'practice/getSubmissionList',
      payload: practice.listDetail.generalInformation.PracticeID
    })
  },[]);
  useEffect(()=>{
    console.log(practice.submissions)
    data =[];
    let i = 1
    practice.submissions?.forEach(submission => {
      var temp = submission;
      temp.key = i;
      i+=1
      data.push(temp)
    });
  },[practice.submissions])
  const handleOnclick = (submission) => {
    console.log('set', submission)
    dispatch({
      type:'practice/setCurrentSubmission',
      payload:submission
    })
  }
  return (
    <>
      {<div>{practice.currentSubmission!=null?<SubmissionDetail></SubmissionDetail>:
      <Table loading={loading} dataSource={data}>
      <Column title="" dataIndex="key" key="no" />
      <Column title="RESULT" key="result" 
      render={(text, record) => (
        <p>{record.CorrectPercent==100?record.CorrectPercent+'%':record.CorrectPercent+'%'}</p>
      )}/>
      <Column title="SCORE" dataIndex="Score" key="score" />
    <Column title="TYPE" dataIndex="SubmissionType" key="type" />
    <Column title="TIME" dataIndex="DoingTime" key="time" />
    <Column
      title=""
      key="action"
      render={(text, record) => (
        <Space size="middle">
          <a onClick={()=>handleOnclick(record)}>View Details</a>
        </Space>
      )}
    />
  </Table>}
      </div>}
    </>
  );

}

export default connect(({practice, loading})=>({
  practice,
  loading: loading.effects['practice/getSubmissionList']
}))(Submission);