import React, { useEffect } from 'react'
import styles from './style.less'
import {
  Typography,
  Card,
  List,
  PageHeader, Row, Col,
  Divider,
  Checkbox
} from 'antd'
import {history, Link} from 'umi'
import { connect } from 'dva'
import PageLoading from '@/components/PageLoading'
const { Title, Text } = Typography;
const practiceList = ({location,dispatch,practice, loading}) => {
  useEffect(()=>{
    dispatch({
      type:'practice/getPracticeSetList',
      payload: encodeURIComponent(location.query.listName)
    })
  },[]);
  const routes = [
    {
      path: '/developer',
      breadcrumbName: 'Developer',
    },
    {
      path: '/developer/practice',
      breadcrumbName: 'Practice',
    },
    {
      path: '',
      breadcrumbName: decodeURIComponent(location.query.listName),
    },
  ];
  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    );
  }
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  console.log(practice.list)
  return (loading?<PageLoading></PageLoading>:
    <div>
      <PageHeader
        className="site-page-header"
        breadcrumb={{ routes, itemRender }}
        title={decodeURIComponent(location.query.listName)}
        subTitle=""
      />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={18}>
          <List
            style={{margin: '30px 0px 10px 10px'}}
            itemLayout="horizontal"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 6,
            }}
            dataSource={practice.list}
            renderItem={item => (
            <List.Item onClick={()=>{
              history.push("/developer/practice/questions?listName="+ encodeURIComponent(decodeURIComponent(location.query.listName)) + `&id=${item.PracticeID}`)
            }}
            style={{backgroundColor: 'white', margin: '10px 5px 10px 20px', padding:'5px 20px 5px 10px', borderRadius:'5px'}}>             
              <List.Item.Meta
                title={item.PracticeName}
                description={<div> {item.DifficultLevel +','+ item.PracticeType +','+ item.Score} <br></br>  {item.BriefDescription}</div>}
              />
              {/* {item.status == 'Solved' && <Button size='large' style={{width:'100px'}}>Solved</Button>}
              {item.status != 'Solved' && <Button size='large' style={{width:'100px'}} type="primary">  Start  </Button>} */}
            </List.Item>
            )}
          />
        </Col>
        <Col className="gutter-row" span={6} style={{margin: '30px 0px 10px 0px'}}>
        <Title level={4}>STATUS</Title>
        <Checkbox onChange={onChange}>Solved</Checkbox>
        <br></br>
        <Checkbox onChange={onChange}>Unsolved</Checkbox>
        <Divider />
        <Title level={4}>DIFICULTY</Title>
        <Checkbox onChange={onChange}>Easy</Checkbox>
        <br></br>
        <Checkbox onChange={onChange}>Medium</Checkbox>
        <br></br>
        <Checkbox onChange={onChange}>Hard</Checkbox>
        <Divider />
        <Title level={4}>TYPE</Title>
        <Checkbox onChange={onChange}>Multiple-choice</Checkbox>
        <br></br>
        <Checkbox onChange={onChange}>Coding</Checkbox>
        <Divider />
        </Col>
      </Row>
    </div>
  );
}

export default connect(({practice, loading})=>({
  practice,
  loading : loading.effects['practice/getPracticeSetList']
}))(practiceList);