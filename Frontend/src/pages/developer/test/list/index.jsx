import React, { useEffect, useState } from 'react';
import { Typography, List, PageHeader, Row, Col, Divider, Checkbox, Button, Card } from 'antd';
import { history, Link } from 'umi';
import { connect } from 'dva';
import './style.less';
import Language from '@/locales/index';

const { Title } = Typography;

const TestSetList = ({ location, dispatch, testDev, loading }) => {
  // let history = useHistory()

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
      type: 'testDev/fetchTestListBySet',
      payload: {
        listname: decodeURIComponent(location.query.listName),
        Callback: setList,
        Callback1: setList1,
        Callback2: setList2,
        Callback3: setList3,
      },
    });
  }, []);

  const routes = [
    {
      path: '/developer',
      breadcrumbName: 'Developer',
    },
    {
      path: '/developer/test',
      breadcrumbName: 'Test',
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
      <Link key={route.breadcrumbName} to={route.path}>
        {route.breadcrumbName}
      </Link>
    );
  }
  function onChange(e) {
    const val = e.target.value;
    const temp = testDev.setList;
    console.log(list1, list2, list3, temp);
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
      if (!multiple && !coding) {
        list3 = temp.filter((e) => e.Type == 'MultipleChoice');
        setMultiple(true);
      } else if (multiple && coding) {
        list3 = temp.filter((e) => e.Type != 'MultipleChoice');
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
        list3 = temp.filter((e) => e.Type != 'MultipleChoice');
        setCoding(true);
      } else if (coding && multiple) {
        list3 = temp.filter((e) => e.Type == 'MultipleChoice');
        setCoding(false);
      } else if (coding) {
        list3 = temp;
        setCoding(false);
      } else {
        list3 = temp;
        setCoding(true);
      }
    }
    const temp1 = list1.map((e) => e.ID);
    const temp2 = list2.map((e) => e.ID);
    const temp3 = list3.map((e) => e.ID);

    const filter = temp1.filter((value) => -1 !== temp2.indexOf(value));

    const filter2 = filter.filter((value) => -1 !== temp3.indexOf(value));

    setList(temp.filter((e) => -1 != filter2.indexOf(e.ID)));
    setList1(list1);
    setList2(list2);
    setList3(list3);
  }

  return (
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
            loading={loading}
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
              <Card bordered size="small" hoverable style={{ marginBottom: '12px' }}>
                <List.Item
                  
                  style={{
                    // backgroundColor: 'white',
                    // margin: '10px 5px 10px 20px',
                    padding: '5px 20px 5px 10px',
                    // borderRadius: '5px',
                  }}
                >
                  <List.Item.Meta
                    title={item.Name}
                    description={
                      <div>
                        {' '}
                        <Typography.Text
                          strong
                          style={
                            item.DifficultLevel === 'Easy'
                              ? { color: 'green' }
                              : item.DifficultLevel === 'Medium'
                              ? { color: '#ed7e0c' }
                              : { color: 'red' }
                          }
                        >
                          {item.DifficultLevel}
                        </Typography.Text>
                        {',' + item.Type + ',' + item.Score} <br></br> {item.BriefDescription}
                      </div>
                    }
                  />
                  <Button size="large" style={{ width: '100px', marginRight: '10px' }} onClick = {() => {
                    history.push({
                      pathname: `/developer/test/rank`,
                      state: item.ID
                    });
                  }}>
                      Ranking
                    </Button>
                  {item.SubmissionID != null && (
                    <Button size="large" style={{ width: '100px' }}onClick={() => {
                      history.push({
                        pathname: '/developer/test/questions',
                        state: {id:item.ID,type:"test"},
                      });
                    }}>
                      {Language.pages_practice_list_solved}
                    </Button>
                  )}
                  {item.SubmissionID == null && (
                    <Button
                      size="large"
                      style={{ background: '#3ebae0', border: '2px solid #3ebae0', width: '100px' }}
                      type="primary"
                      onClick={() => {
                        history.push({
                          pathname: '/developer/test/questions',
                          state: item,
                        });
                      }}
                    >
                      {' '}
                      {Language.pages_search_start}{' '}
                    </Button>
                  )}
                </List.Item>
              </Card>
            )}
          />
        </Col>
        <Col className="gutter-row" span={6} style={{ margin: '30px 0px 10px 0px' }}>
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
    </div>
  );
};

export default connect(({ testDev, loading }) => ({
  testDev,
  loading: loading.effects['testDev/fetchTestListBySet'],
}))(TestSetList);
