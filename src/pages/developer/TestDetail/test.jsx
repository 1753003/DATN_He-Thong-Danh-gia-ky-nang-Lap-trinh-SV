import React from 'react';
import styles from './index.less';
import { Row, Col, Breadcrumb, Button, List, Checkbox } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import Coding from '@/components/Coding';
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

  componentDidMount() {
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
    this.setState({ answer: checkedValues });
  };

  next() {
    this.props.dispatch({
      type: 'test/updateAnswer',
      payload: {
        id: this.getQuestion()?.ID,
        data: this.state.answer,
      },
    });
    this.props.dispatch({
      type: 'test/changeQuestion',
      payload: 'next',
    });
  }
  back() {
    this.props.dispatch({
      type: 'test/updateAnswer',
      payload: {
        id: this.getQuestion()?.ID,
        data: this.state.answer,
      },
    });
    this.props.dispatch({
      type: 'test/changeQuestion',
      payload: 'back',
    });
  }
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
                  <Coding></Coding>
                </>
              ) : (
                <>
                  <div className={styles.answer}>
                    <CheckboxGroup
                      options={this.getQuestion()?.Answer}
                      onChange={this.onChangeAnswer}
                    ></CheckboxGroup>
                  </div>
                </>
              )}
              <Row>
                <Button
                  type="primary"
                  disabled={this.props.question === 0 ? true : false}
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
            </Col>
            <Col span={6}></Col>
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
