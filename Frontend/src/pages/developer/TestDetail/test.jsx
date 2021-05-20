import React from 'react';
import styles from './index.less';
import { Row, Col, Button, List, Checkbox, Spin, PageHeader, Result, Popconfirm, message } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import Coding from '@/components/Coding quiz';
import Quiz from './components/quiz';
import { history, Link, withRouter } from 'umi';
import { min, result } from 'lodash-es';
const CheckboxGroup = Checkbox.Group;

class TestDetail extends React.Component {
  state = {
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
    then: '',
    check: false,
  };

  constructor(props) {
    super(props);
    const id = props.location.state.TestID
    this.props.dispatch({ type: 'test/getTestByID', payload: { id } });
    this.state = {  answer: [] };
    this.handleUnload = this.handleUnload.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    window.removeEventListener('beforeunload', this.handleUnload);
    window.removeEventListener('popstate', this.handleBack);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleUnload);

    window.addEventListener('popstate', (event) => {
      this.reset();
    });

    this.interval = setInterval(() => {
      const then = this.props.test.time;
      const max = this.props.test.timeINT;
      const { hours, minutes, seconds, check } = this.state;
      if (then != '' && !check) {
        const now = moment();
        const countdown = moment(then.diff(now)).utc();

        let hours = countdown.format('HH');
        let minutes = countdown.format('mm');
        let seconds = countdown.format('ss');
     
        let check2 = false;
        if (parseInt(hours) > parseInt(max[0]))
          check2 = true;
        else if (parseInt(minutes) > parseInt(max[1]) && parseInt(hours) == parseInt(max[0]))
          check2= true;
        else if ((parseInt(seconds) > parseInt(max[2])) && (parseInt(minutes) == parseInt(max[1])))
          check2 = true;
        if (check2)
        {
          hours = "00";
          minutes = "00";
          seconds = "00"
        }
        this.setState({ hours, minutes, seconds });

        if (hours == '00' && minutes == '00' && seconds == '00') this.setState({ check: true });
      }
    }, 1000);
  }
  
  handleUnload(e) {
    this.reset();
    var message =
      'Your test will be submit and you will not have a second chance, are you sure to leave?';

    (e || window.event).returnValue = message; //Gecko + IE
    return message;
  }

  handleBack() {
    console.log("ABC")
    this.reset();
  }

  getData = () => {
    const { testById } = this.props.test;

    return testById;
  };

  getQuestion = () => {
    const { question, testById } = this.props.test;
    try {
      return testById?.listQuestion[question];
    } catch (e) {
      return undefined;
    }
  };

  getCodeAnswer = () => {
    const { answer, question } = this.props.test;
    try {
      if (answer[question].data === [] || answer[question] === undefined) return '';
      return answer[question].data;
    } catch (e) {
      return '';
    }
  };

  onChangeAnswer = (checkedValues) => {
    this.props.dispatch({
      type: 'test/updateAnswer',
      payload: {
        id: this.getQuestion()?.ID,
        data: checkedValues,
      },
    });
  };

  next() {
    this.props.dispatch({
      type: 'test/changeQuestion',
      payload: this.props.test.question + 1,
    });
  }

  back() {
    this.props.dispatch({
      type: 'test/changeQuestion',
      payload: this.props.test.question - 1,
    });
  }

  submit() {
    this.props.dispatch({
      type: 'test/submitTest',
      payload: '',
    });
    this.props.dispatch({
      type: 'test/removeSession',
      payload: this.props.test.testById.generalInformation.TestID
    })
  }

  returnQuizQuestion = () => {
    return (
      <Quiz
        key={this.getQuestion()?.ID}
        options={this.getQuestion()?.Answer}
        value={this.props.test.answer[this.props.test.question]?.data}
        onChangeAnswer={(value) => {
          this.onChangeAnswer(value);
        }}
      ></Quiz>
    );
  };

  navigateQuestionHandle = (question) => {
    this.props.dispatch({
      type: 'test/changeQuestion',
      payload: question,
    });
  };

  returnGridQuestion = () => {
    const num = this.props.test.answer.length;
    let type = [];
    for (let i = 0; i < this.props.test.answer.length; i++) {
      if (this.props.test.answer[i].data == [] || this.props.test.answer[i].data == '')
        type[i] = 'secondary';
      else type[i] = 'primary';
    }
    let res = [];
    for (let i = 0; i < num; i++) {
      var temp = '';
      if (parseInt((i + 1) / 10) == 0) {
        temp = '0'.concat((i + 1).toString());
      } else temp = i + 1;
      res.push(
        <Button
          type={type[i]}
          onClick={() => {
            this.navigateQuestionHandle(i);
          }}
        >
          {temp}
        </Button>,
      );
    }
    return res;
  };

  returnNavigateQuestion = () => {
    if (this.props.test.question === 0)
      return (
        <Row>
          <Button
            type="primary"
            disabled
            onClick={() => {
              this.back();
            }}
          >
            Back
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.next();
            }}
            className={styles.nextBtn}
          >
            Next
          </Button>
        </Row>
      );
    else if (this.props.test.answer?.length === this.props.test.question + 1)
      return (
        <Row>
          <Button
            type="primary"
            onClick={() => {
              this.back();
            }}
          >
            Back
          </Button>
          <Button
            type="primary"
            disabled
            onClick={() => {
              this.next();
            }}
            className={styles.nextBtn}
          >
            Next
          </Button>
        </Row>
      );
    else
      return (
        <Row>
          <Button
            type="primary"
            onClick={() => {
              this.back();
            }}
          >
            Back
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.next();
            }}
            className={styles.nextBtn}
          >
            Next
          </Button>
        </Row>
      );
  };

  returnCodeQuestion = () => (
    <Coding
      key={this.getQuestion()?.ID}
      description={this.getQuestion()?.Description}
      testCases={this.getQuestion()?.TestCase}
      getCode={(value) => {
        this.props.dispatch({
          type: 'test/updateAnswer',
          payload: {
            id: this.getQuestion()?.ID,
            data: value,
          },
        });
      }}
      codeDefault={this.getCodeAnswer()}
    ></Coding>
  );

  reset = () => {
    this.props.dispatch({
      type: 'test/resetModel',
    });
  };
  render() {
    const { hours, minutes, seconds, check } = this.state;
    
    if (!seconds) {
      return <Spin tip="Waiting seconds to load this test ..."></Spin>;
    }

    if (this.props.test.isDid) {
      return (
        <Result
          title="You have submited this test, you can not do twice."
          extra={
            <Button
              type="primary"
              key="console"
              onClick={() => {
                this.reset();
              }}
            >
              Back home
            </Button>
          }
        />
      );
    }
    if (check) {
      this.submit();
      return (
        <Result
          title="This test was time out, your submission has been recorded."
          extra={
            <Button
              type="primary"
              key="console"
              onClick={() => {
                this.reset();
              }}
            >
              Back home
            </Button>
          }
        />
      );
    }

    return (
      <div className={styles.body}>
        <div>
          <PageHeader
            className="site-page-header"
            title={this.getData()?.generalInformation.TestName}
            subTitle={this.getData()?.generalInformation.BriefDescription}
            onBack={() => history.goBack()}
          />
          <div className={styles.countdownWrapper}>
            {hours && (
              <div className={styles.countdownItem}>
                {hours}
                <span>hours</span>
              </div>
            )}
            {minutes && (
              <div className={styles.countdownItem}>
                {minutes}
                <span>minutes</span>
              </div>
            )}
            {seconds && (
              <div className={styles.countdownItem}>
                {seconds}
                <span>seconds</span>
              </div>
            )}
          </div>
          <Row>
            <Col span={1}></Col>
            <h2>{this.getData()?.generalInformation?.TestName}</h2>
          </Row>
          <Row className={styles.container}>
            <Col span={1}></Col>
            <Col span={15} className={styles.answer}>
              {this.getData().generalInformation == undefined ? (
                <div className={styles.spin}>
                  <Spin tip="Waiting seconds to load a test ..." />
                </div>
              ) : (
                <>
                  <p>
                    <b>
                      <i>Question {this.props.test.question + 1}</i>
                    </b>
                  </p>
                  <p>
                    <b>Score:</b> {this.getQuestion()?.Score}
                  </p>
                  {this.getQuestion()?.QuestionType === 'Code' ? (
                    <>{this.returnCodeQuestion()}</>
                  ) : (
                    <>
                      <p>{this.getQuestion()?.Description}</p>
                      {this.returnQuizQuestion()}
                    </>
                  )}
                </>
              )}
              <div className={styles.navigation}>{this.returnNavigateQuestion()}</div>
            </Col>
            <Col span={1}></Col>
            <Col span={6}>
              <List
                header={
                  <p>
                    <b>List Question</b>
                  </p>
                }
                footer={
                  <Popconfirm
                    title="Are you sure to submit this test"
                    onConfirm={()=>{this.submit()}}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="primary"
                    >
                      Submit
                    </Button>
                  </Popconfirm>
                }
                bordered
                dataSource={this.returnGridQuestion()}
                grid={{ column: 4 }}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Col>
          </Row>
        </div>
        <div></div>
      </div>
    );
  }
}
export default connect(({ test, loading }) => ({
  test,
  loading: loading.effects['test/getTestByIdModel'],
}))(TestDetail);
