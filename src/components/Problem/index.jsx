import React, { useEffect, useState } from 'react'
import {
  PageHeader,
  Tabs,
  Row,
  Col
} from 'antd'
import {history, Link} from 'umi'
import Coding from '@/components/Coding';
import { connect } from 'dva'

const Problem = ({data, testDev, dispatch, loading}) => {
  useEffect(()=>{
    // if(data.QuestionType==="Code")
    //   dispatch({
        
    //   })
    // else
    //   dispatch({})
  },[])
  return (
    // data.QuestionType==="Code"?
    true?
    <div>
      <Coding></Coding>
    </div>
    :
    <div>
      trac nghiem
    </div>
  );
}

export default connect(({testDev, loading, judge})=>({
  judge:judge.state,
  loading: loading.effects['practice/getPracticeListDetail'],
  testDev: testDev,
}))(Problem);