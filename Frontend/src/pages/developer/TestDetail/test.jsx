import React from 'react';
import styles from './index.less';
import { Row, Col, Breadcrumb, Button, List, Checkbox } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import Coding from '@/components/Coding quiz';
const CheckboxGroup = Checkbox.Group;

class TestDetail extends React.Component {
  state = {
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
    then: '',
  };

  constructor(props) {
    super(props);
    this.props.dispatch({ type: 'test/getTestByID', payload: { id: 19 } });

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

  polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  describeArc = (x, y, radius, startAngle, endAngle) => {
    var start = this.polarToCartesian(x, y, radius, endAngle);
    var end = this.polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(
      ' ',
    );

    return d;
  };

  mapNumber = (number, in_min, in_max, out_min, out_max) => {
    return ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };

  SVGCircle = ({ radius }) => (
    <svg className={styles.countdownSvg}>
      <path
        fill="none"
        stroke="#333"
        stroke-width="4"
        d={this.describeArc(50, 50, 48, 0, radius)}
      />
    </svg>
  );

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleUnload);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleUnload);
    this.interval = setInterval(() => {
      const then = this.state.then;
      const now = moment();
      const countdown = moment(then.diff(now)).utc();

      const hours = countdown.format('HH');
      const minutes = countdown.format('mm');
      const seconds = countdown.format('ss');
      this.setState({ hours, minutes, seconds });
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
      payload: 'abc'
    })
  }
  returnQuizQuestion = () => {
    return (
      <CheckboxGroup
        options={this.getQuestion()?.Answer}
        onChange={this.onChangeAnswer}
        value={this.props.test.answer[this.props.test.question]?.data}
      ></CheckboxGroup>
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

    for (let i = 0; i < num / 4 + 1; i++) {
      if (i != num / 4 || num % 4 == 0)
        return (
          <Row>
            <Col span={6}>
              <Button type={type[i * 4]} onClick={() => {this.navigateQuestionHandle(i * 4)}}>
                {i * 4 + 1}
              </Button>
            </Col>
            <Col span={6}>
              <Button type={type[i * 4 + 1]} onClick={() => {this.navigateQuestionHandle(i * 4 + 1)}}>
                {i * 4 + 2}
              </Button>
            </Col>
            <Col span={6}>
              <Button type={type[i * 4 + 2]} onClick={() => {this.navigateQuestionHandle(i * 4 + 2)}}>
                {i * 4 + 3}
              </Button>
            </Col>
            <Col span={6}>
              <Button type={type[i * 4 + 3]} onClick={() => {this.navigateQuestionHandle(i * 4 + 3)}}>
                {i * 4 + 4}
              </Button>
            </Col>
          </Row>
        );
      else {
        if (num % 4 === 1)
          return (
            <Row>
              <Col span={6}>
                <Button type={type[num - 1]} onClick={() => {this.navigateQuestionHandle(num - 1)}}>
                  {num}
                </Button>
              </Col>
            </Row>
          );
        else if (num % 4 === 2)
          return (
            <Row>
              <Col span={6}>
                <Button type={type[num - 2]} onClick={() => {this.navigateQuestionHandle(num - 2)}}>
                  {num - 1}
                </Button>
              </Col>
              <Col span={6}>
                <Button type={type[num - 1]} onClick={() => {this.navigateQuestionHandle(num - 1)}}>
                  {num}
                </Button>
              </Col>
            </Row>
          );
        else if (num % 4 === 3)
          return (
            <Row>
              <Col span={6}>
                <Button type={type[num - 3]} onClick={() => {this.navigateQuestionHandle(num - 3)}}>
                  {num - 2}
                </Button>
              </Col>
              <Col span={6}>
                <Button type={type[num - 2]} onClick={() => {this.navigateQuestionHandle(num - 2)}}>
                  {num - 1}
                </Button>
              </Col>
              <Col span={6}>
                <Button type={type[num - 1]} onClick={() => {this.navigateQuestionHandle(num - 1)}}>
                  {num}
                </Button>
              </Col>
            </Row>
          );
      }
    }
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
          >
            Next
          </Button>
        </Row>
      );
  };
  render() {
    const { hours, minutes, seconds } = this.state;
    const hoursRadius = this.mapNumber(hours, 24, 0, 0, 360);
    const minutesRadius = this.mapNumber(minutes, 60, 0, 0, 360);
    const secondsRadius = this.mapNumber(seconds, 60, 0, 0, 360);

    if (!seconds) {
      return null;
    }

    return (
      <div>
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
                {this.SVGCircle(hoursRadius)}
                {hours}
                <span>hours</span>
              </div>
            )}
            {minutes && (
              <div className={styles.countdownItem}>
                {this.SVGCircle(minutesRadius)}
                {minutes}
                <span>minutes</span>
              </div>
            )}
            {seconds && (
              <div className={styles.countdownItem}>
                {this.SVGCircle(secondsRadius)}
                {seconds}
                <span>seconds</span>
              </div>
            )}
          </div>
          <h2>{this.getData()?.generalInformation?.TestName}</h2>
          <Row className={styles.container}>
            <Col span={18}>
              <p>{this.getQuestion()?.Description}</p>
              <p>Score: {this.getQuestion()?.Score}</p>
              {this.getQuestion()?.QuestionType === 'Code' ? (
                <>
                  <Coding
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
                </>
              ) : (
                <>
                  <div className={styles.answer}>{this.returnQuizQuestion()}</div>
                </>
              )}
              {this.returnNavigateQuestion()}
            </Col>
            <Col span={6}>{this.returnGridQuestion()}
            <Button type="primary" onClick={()=>{this.submit()}}>Submit</Button>
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
