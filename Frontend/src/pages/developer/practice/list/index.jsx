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
import "./style.less";
import Language from '@/locales/index';
import { createLanguageServiceSourceFile } from 'typescript'

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
  return (loading?<PageLoading></PageLoading>:
    <div className="body">
      <PageHeader
        className="site-page-header"
        breadcrumb={{ routes, itemRender }}
        title={decodeURIComponent(location.query.listName)}
        subTitle=""
      />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={18}>
          <List
            className="custom"
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
              history.push({
                pathname: '/developer/practice/questions',
                search: `?listName=${encodeURIComponent(decodeURIComponent(location.query.listName))}`,
                state: item,
              }
                
              )
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
        <Title level={4}>{Language.pages_practice_list_status}</Title>
        <Checkbox onChange={onChange}>{Language.pages_practice_list_solved}</Checkbox>
        <br></br>
        <Checkbox onChange={onChange}>{Language.pages_practice_list_unsolved}</Checkbox>
        <Divider />
        <Title level={4}>{Language.pages_practice_list_difficulty}</Title>
        <Checkbox onChange={onChange}>{Language.pages_practice_list_easy}</Checkbox>
        <br></br>
        <Checkbox onChange={onChange}>{Language.pages_practice_list_medium}</Checkbox>
        <br></br>
        <Checkbox onChange={onChange}>{Language.pages_practice_list_hard}</Checkbox>
        <Divider />
        <Title level={4}>{Language.pages_practice_list_type}</Title>
        <Checkbox onChange={onChange}>{Language.pages_practice_list_multipleChoice}</Checkbox>
        <br></br>
        <Checkbox onChange={onChange}>{Language.pages_practice_list_coding}</Checkbox>
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