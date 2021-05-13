import React from 'react';
import styles from './index.less';
import { Row, Col, Breadcrumb, Button, List, Checkbox, Spin } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import Coding from '@/components/Coding quiz';
import Quiz from './components/quiz'
import { min, result } from 'lodash-es';
const CheckboxGroup = Checkbox.Group;

class TestDetail extends React.Component {
  state = {
    hours: '00',
    minutes: '00',
    seconds: '00',
    then: '',
  };

  constructor(props) {
    super(props);
    this.props.dispatch({ type: 'test/getTestByID', payload: { id: 25 } });

    const time = moment().add('60', 'minutes');

    this.state = { then: time, answer: [] };
    this.handleUnload = this.handleUnload.bind(this);
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

  handleUnload(e) {
    var message = 'o/';

    (e || window.event).returnValue = message; //Gecko + IE
    return message;
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleUnload);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleUnload);

    this.interval = setInterval(() => {
      const then = this.props.test.time;
      if (then != '') {
        const now = moment();
        const countdown = moment(then.diff(now)).utc();

        const hours = countdown.format('HH');
        const minutes = countdown.format('mm');
        const seconds = countdown.format('ss');
        this.setState({ hours, minutes, seconds });
      }
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

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
      payload: 'abc',
    });
  }

  returnQuizQuestion = () => {
    return (
      <Quiz 
        key = {this.getQuestion()?.ID}
        options={this.getQuestion()?.Answer}
        value={this.props.test.answer[this.props.test.question]?.data}
        onChangeAnswer={(value) => {this.onChangeAnswer(value)}}
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
      key = {this.getQuestion()?.ID}
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

  render() {
    const { hours, minutes, seconds } = this.state;

    if (!seconds) {
      return <Spin tip="Waiting seconds to load this test ..."></Spin>;
    }

    return (
      <div className={styles.body}>
        <div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="developer/test">Home</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Test</a>
            </Breadcrumb.Item>
          </Breadcrumb>
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
                    <>
                      {this.returnCodeQuestion()}
                    </>
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
                  <Button
                    type="primary"
                    onClick={() => {
                      this.submit();
                    }}
                  >
                    Submit
                  </Button>
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
