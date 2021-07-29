import React, { useEffect, useState } from 'react';
import { Typography, List, PageHeader, Row, Col, Divider, Checkbox, Button, Card } from 'antd';
import { history, Link } from 'umi';
import { connect } from 'dva';
import PageLoading from '@/components/PageLoading';
import './style.less';
import Language from '@/locales/index';
import Expand from 'react-expand-animated';

const { Title } = Typography;

const practiceList = ({ location, dispatch, practice, loading }) => {
  const [solved, setSolved] = useState(false);
  const [unsolved, setUnsolved] = useState(false);
  const [easy, setEasy] = useState(false);
  const [medium, setMedium] = useState(false);
  const [hard, setHard] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [coding, setCoding] = useState(false);
  const [list, setList] = useState([]);
  let [list1, setList1] = useState([]);
  let [list2, setList2] = useState([]);
  let [list3, setList3] = useState([]);

  useEffect(() => {
    dispatch({
      type: 'practice/getPracticeSetList',
      payload: {
        listName: encodeURIComponent(location.query.listName),
        callback: setList,
        callback1: setList1,
        callback2: setList2,
        callback3: setList3,
      },
    });
  }, []);
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
      <span key={route.breadcrumbName}>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path} key={route.breadcrumbName}>{route.breadcrumbName}</Link>
    );
  }
  function onChange(e) {
    const val = e.target.value;
    const temp = practice.list;
   
    if (val == 'Solved') {
      if (!solved && !unsolved) {
        list1 = temp.filter((e) => e.SubmissionID != null);
        setSolved(true);
      } else if (solved && unsolved) {
        list1 = temp.filter((e) => e.SubmissionID == null);
        setSolved(false);
      } else if (solved) {
        list1 = temp;
        setSolved(false);
      } else {
        list1 = temp;
        setSolved(true);
      }
    } else if (val == 'Unsolved') {
      if (!unsolved && !solved) {
        list1 = temp.filter((e) => e.SubmissionID == null);
        setUnsolved(true);
      } else if (unsolved && solved) {
        list1 = temp.filter((e) => e.SubmissionID != null);
        setUnsolved(false);
      } else if (unsolved) {
        list1 = temp;
        setUnsolved(false);
      } else {
        list1 = temp;
        setUnsolved(true);
      }
    } else if (val == 'Easy') {
      if (!easy && !medium && !hard) {
        list2 = temp.filter((e) => e.DifficultLevel == 'Easy');
        setEasy(true);
      } else if (!easy && medium && hard) {
        list2 = temp;
        setEasy(true);
      } else if (!easy && !medium && hard) {
        list2 = temp.filter((e) => e.DifficultLevel != 'Medium');
        setEasy(true);
      } else if (!easy && medium && !hard) {
        list2 = temp.filter((e) => e.DifficultLevel != 'Hard');
        setEasy(true);
      } else if (easy && medium && hard) {
        list2 = temp.filter((e) => e.DifficultLevel != 'Easy');
        setEasy(false);
      } else if (easy && !medium && !hard) {
        list2 = temp;
        setEasy(false);
      } else if (easy && !medium && hard) {
        list2 = temp.filter((e) => e.DifficultLevel == 'Hard');
        setEasy(false);
      } else if (easy && medium && !hard) {
        list2 = temp.filter((e) => e.DifficultLevel == 'Medium');
        setEasy(false);
      }
    } else if (val == 'Medium') {
      if (!easy && !medium && !hard) {
        list2 = temp.filter((e) => e.DifficultLevel == 'Medium');
        setMedium(true);
      } else if (easy && !medium && hard) {
        list2 = temp;
        setMedium(true);
      } else if (easy && !medium && !hard) {
        list2 = temp.filter((e) => e.DifficultLevel != 'Hard');
        setMedium(true);
      } else if (!easy && !medium && hard) {
        list2 = temp.filter((e) => e.DifficultLevel != 'Easy');
        setMedium(true);
      } else if (easy && medium && hard) {
        list2 = temp.filter((e) => e.DifficultLevel != 'Medium');
        setMedium(false);
      } else if (!easy && medium && !hard) {
        list2 = temp;
        setMedium(false);
      } else if (easy && medium && !hard) {
        list2 = temp.filter((e) => e.DifficultLevel == 'Easy');
        setMedium(false);
      } else if (!easy && medium && hard) {
        list2 = temp.filter((e) => e.DifficultLevel == 'Hard');
        setMedium(false);
      }
    } else if (val == 'Hard') {
      if (!easy && !medium && !hard) {
        list2 = temp.filter((e) => e.DifficultLevel == 'Hard');
        setHard(true);
      } else if (easy && medium && !hard) {
        list2 = temp;
        setHard(true);
      } else if (easy && !medium && !hard) {
        list2 = temp.filter((e) => e.DifficultLevel != 'Medium');
        setHard(true);
      } else if (!easy && medium && !hard) {
        list2 = temp.filter((e) => e.DifficultLevel != 'Easy');
        setHard(true);
      } else if (easy && medium && hard) {
        list2 = temp.filter((e) => e.DifficultLevel != 'Hard');
        setHard(false);
      } else if (!easy && !medium && hard) {
        list2 = temp;
        setHard(false);
      } else if (easy && !medium && hard) {
        list2 = temp.filter((e) => e.DifficultLevel == 'Easy');
        setHard(false);
      } else if (!easy && medium && hard) {
        list2 = temp.filter((e) => e.DifficultLevel == 'Medium');
        setHard(false);
      }
    } else if (val == 'Multiple') {
      console.log(temp)
      if (!multiple && !coding) {
        list3 = temp.filter((e) => e.PracticeType == 'MultipleChoice');
        setMultiple(true);
      } else if (multiple && coding) {
        list3 = temp.filter((e) => e.PracticeType != 'MultipleChoice');
        setMultiple(false);
      } else if (multiple) {
        list3 = temp;
        setMultiple(false);
      } else {
        list3 = temp;
        setMultiple(true);
      }
    } else if (val == 'Coding') {
      if (!coding && !multiple) {
        list3 = temp.filter((e) => e.PracticeType != 'MultipleChoice');
        setCoding(true);
      } else if (coding && multiple) {
        list3 = temp.filter((e) => e.PracticeType == 'MultipleChoice');
        setCoding(false);
      } else if (coding) {
        list3 = temp;
        setCoding(false);
      } else {
        list3 = temp;
        setCoding(true);
      }
    }
    
    const temp1 = list1.map((e) => e.PracticeID);
    const temp2 = list2.map((e) => e.PracticeID);
    const temp3 = list3.map((e) => e.PracticeID);
    let filter = [];
    let filter2 = [];
    filter = temp1.filter((value) => -1 !== temp2.indexOf(value));
    filter2 = filter.filter((value) => -1 !== temp3.indexOf(value));
    setList(
      temp.filter((e) => {
        return -1 != filter2.indexOf(e.PracticeID);
      }),
    );
    setList1(list1);
    setList2(list2);
    setList3(list3);
  }
  return <>
    {<div className="body">
      <PageHeader
        className="practice-list-page-header"
        breadcrumb={{ routes, itemRender }}
        title={decodeURIComponent(location.query.listName)}
        subTitle=""
      />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

        <Col className="list-col" span={18}>
        {<Expand
        open={!loading}
          duration={500}
          transitions={['opacity', 'background']}
        >
          <List
          loading={{spinning:loading,indicator:<PageLoading/>}}
            className="custom"
            style={{ margin: '30px 0px 10px 10px' }}
            itemLayout="horizontal"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 6,
            }}

            dataSource={list}
            renderItem={(item) => (
              <Card bordered size="small" hoverable style={{ marginBottom:"12px"}}>
              <List.Item
                onClick={() => {
                  history.push({
                    pathname: '/developer/practice/questions',
                    search: `?listName=${encodeURIComponent(
                      decodeURIComponent(location.query.listName),
                    )}`,
                    state: {id:item.PracticeID,type:"practice"},
                  });
                }}
                style={{
                  // backgroundColor: 'white',
                  // margin: '10px 5px 10px 20px',
                  padding: '5px 20px 5px 10px',
                  // borderRadius: '5px',
                }}
              >
                <List.Item.Meta
                  title={item.PracticeName}
                  description={
                    <div>
                      {' '}
                      <Typography.Text strong style={item.DifficultLevel==="Easy"?{color:"green"}:item.DifficultLevel==="Medium"?{color:"#ed7e0c"}:{color:"red"}}>{item.DifficultLevel}</Typography.Text> {
                        ', ' +
                        item.PracticeType +
                        ', ' +
                        item.Score} <br></br> {item.BriefDescription}
                    </div>
                  }
                />
                {item.SubmissionID != null && (
                  <Button size="large" style={{ width: '100px' }}>
                    {Language.pages_practice_list_solved}
                  </Button>
                )}
                {item.SubmissionID == null && (
                  <Button size="large" style={{ width: '100px' }} type="primary">
                    {' '}
                    {Language.pages_search_start}{' '}
                  </Button>
                )}
              </List.Item></Card>
            )}
          />
        </Expand>
        }</Col>
        <Col className="filter-col" span={6} style={{ margin: '30px 0px 10px 0px' }}>
          <Title level={4}>{Language.pages_practice_list_status}</Title>
          <Checkbox onChange={onChange} value="Solved">
            {Language.pages_practice_list_solved}
          </Checkbox>
          <br></br>
          <Checkbox onChange={onChange} value="Unsolved">
            {Language.pages_practice_list_unsolved}
          </Checkbox>
          <Divider />
          <Title level={4}>{Language.pages_practice_list_difficulty}</Title>
          <Checkbox onChange={onChange} value="Easy">
            {Language.pages_practice_list_easy}
          </Checkbox>
          <br></br>
          <Checkbox onChange={onChange} value="Medium">
            {Language.pages_practice_list_medium}
          </Checkbox>
          <br></br>
          <Checkbox onChange={onChange} value="Hard">
            {Language.pages_practice_list_hard}
          </Checkbox>
          <Divider />
          <Title level={4}>{Language.pages_practice_list_type}</Title>
          <Checkbox onChange={onChange} value="Multiple">
            {Language.pages_practice_list_multipleChoice}
          </Checkbox>
          <br></br>
          <Checkbox onChange={onChange} value="Coding">
            {Language.pages_practice_list_coding}
          </Checkbox>
          <Divider />
        </Col>
      </Row>
    </div>}
</>
};

export default connect(({ practice, loading }) => ({
  practice,
  loading: loading.effects['practice/getPracticeSetList'],
}))(practiceList);
