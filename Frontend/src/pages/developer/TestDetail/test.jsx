import React from 'react';
import styles from './index.less';
import {
  Row,
  Col,
  Button,
  List,
  Tabs,
  PageHeader,
  Result,
  Popconfirm,
  notification,
  Tooltip,
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import Coding from '@/components/Coding quiz';
import Quiz from './components/quiz';
import { history } from 'umi';
import Language from '@/locales/index';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CryptoJS from 'crypto-js';
import DiscusstionTab from '@/components/Discussions/DiscusstionTab';
import MDEditor from '@uiw/react-md-editor';
import PageLoading from '@/components/PageLoading';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

class TestDetail extends React.Component {
  state = {
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
    then: '',
    check: false,
    error: false,
    start: false,
    fullScreen: false,
    showQuestion: false,
  };

  constructor(props) {
    super(props);
    this.handleUnload = this.handleUnload.bind(this);
    this.handleBack = this.handleBack.bind(this);
    let id = props.location.state?.id;

    const key = props.location.query.key;

    if (key == 'Avx') {
      const temp = props.location.query.x;
      if (temp != undefined) {
        var bytes = CryptoJS.AES.decrypt(temp, 'secret key 12345');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);

        id = originalText;
      }
    }
    this.state = { id: id };
    console.log('ID:', id);
    this.props.dispatch({ type: 'test/getTestInformation', payload: id });
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.reset();
    window.removeEventListener('beforeunload', this.handleUnload);
    window.removeEventListener('popstate', this.handleBack);
    this.props.dispatch({
      type: 'judge/clearState',
    });
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleUnload);

    window.addEventListener('popstate', (event) => {});

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
        if (parseInt(hours) > parseInt(max[0])) check2 = true;
        else if (parseInt(minutes) > parseInt(max[1]) && parseInt(hours) == parseInt(max[0]))
          check2 = true;
        else if (parseInt(seconds) > parseInt(max[2]) && parseInt(minutes) == parseInt(max[1]))
          check2 = true;
        if (check2) {
          hours = '00';
          minutes = '00';
          seconds = '00';
        }
        this.setState({ hours, minutes, seconds });

        if (hours == '00' && minutes == '00' && seconds == '00') this.setState({ check: true });
      }
    }, 1000);
  }

  handleStart() {
    this.setState({
      start: true,
    });
    let id = this.props.location.state?.id;

    const key = this.props.location.query.key;

    if (key == 'Avx') {
      const temp = this.props.location.query.x;
      if (temp != undefined) {
        var ciphertext = CryptoJS.AES.encrypt('34', 'secret key 12345').toString();
        console.log(ciphertext);

        var bytes = CryptoJS.AES.decrypt(temp, 'secret key 12345');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);

        console.log(originalText);
        id = originalText;
      }
    }

    if (id != null) {
      this.props.dispatch({ type: 'test/getTestByID', payload: { id } });
      this.setState({ answer: [] });
    } else {
      this.setState({ error: true });
    }
  }
  handleUnload(e) {
    var message =
      `${Language.pages_test_testDetail_testWillBeSubmit}`;

    (e || window.event).returnValue = message; //Gecko + IE
    return message;
  }

  handleBack() {
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

  getCodeAnswer = (code) => {
    const { answer, question } = this.props.test;
    try {
      if (answer[question].data === [] || answer[question].data === undefined) {
        return '';
      }
      return answer[question].data;
    } catch (e) {
      return '';
    }
  };

  getCodeSampleMC = (i) => {
    const e = i;
    return e?.replaceAll('\\n', '\n');
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
      payload: this.props.location.state.id,
    });
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
            {Language.pages_test_testDetail_back}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.next();
            }}
            className={styles.nextBtn}
          >
            {Language.pages_test_testDetail_next}
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
            {Language.pages_test_testDetail_back}
          </Button>
          <Button
            type="primary"
            disabled
            onClick={() => {
              this.next();
            }}
            className={styles.nextBtn}
          >
            {Language.pages_test_testDetail_next}
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
            {Language.pages_test_testDetail_back}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.next();
            }}
            className={styles.nextBtn}
          >
            {Language.pages_test_testDetail_next}
          </Button>
        </Row>
      );
  };

  handleFullscreen = () => {
    if (!this.state.fullScreen)
      this.setState({
        fullScreen: true,
      });
    else
      this.setState({
        fullScreen: false,
      });
  };
  returnCodeQuestion = () => (
    <Coding
      key={this.getQuestion()?.ID}
      description={this.getQuestion()?.Description}
      testCases={this.getQuestion()?.TestCase}
      language={this.getQuestion()?.Language_allowed}
      codeSample={this.getQuestion()?.CodeSample}
      codeDefault={this.getCodeAnswer(this.getQuestion()?.CodeSample)}
      handleFullscreen={() => {
        this.handleFullscreen();
      }}
      isFullScreen={this.state.fullScreen}
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
    const { hours, minutes, seconds, check, error, start } = this.state;

    if (!start) {
      if (this.state.id == '  ')
        return (
          <Result
            title={Language.wrongLink}
            extra={
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  this.reset();
                  history.push('/developer/test');
                }}
              >
                {Language.pages_test_testDetail_backHome}
              </Button>
            }
          />
        );
      if (this.props.test.testInfo.error != undefined) {
        if (this.props.test.testInfo.error == 'none') {
          const test = this.props.test.testInfo.generalInformation;
          return (
            <Tabs className="custom" type="card" size="large">
              <TabPane tab={Language.test_info} key="1" className={styles.tabInfo}>
                <>
                  <PageHeader
                    className="site-page-header"
                    title={test.TestName}
                    subTitle={test.Description}
                    onBack={() => history.goBack()}
                  />
                  <div className={styles.tabInfoContent}>
                    <p>
                      <b>{Language.test_time}</b>
                      {test.TestTime}
                    </p>
                    <p>
                      <b>{Language.test_maxScore}</b>
                      {test.MaxScore}
                    </p>
                    <p>
                      <b>{Language.test_passScore}</b>
                      {test.PassScore}
                    </p>
                    <hr />
                    <p>
                      <b>{Language.test_note}</b> {Language.test_ifU}{' '}
                    </p>
                    <Button
                      type="primary"
                      onClick={() => {
                        this.handleStart();
                      }}
                    >
                      {Language.test_start}
                    </Button>
                  </div>
                </>
              </TabPane>
              {this.props.location.state.type !== 'undefined' && (
                <TabPane tab={Language.test_diss} key="2">
                  <DiscusstionTab location={this.props.location}></DiscusstionTab>
                </TabPane>
              )}
            </Tabs>
          );
        }
        return (
          <Result
            title={Language.test_noPermission}
            extra={
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  this.reset();
                  history.push('/developer/test');
                }}
              >
                {Language.pages_test_testDetail_backHome}
              </Button>
            }
          />
        );
      } else return <PageLoading tip={Language.pages_test_testDetail_waitingThisTest} />;
    } else {
      if (error)
        return (
          <Result
            title={Language.test_error}
            extra={
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  this.reset();
                  history.push('/developer/test');
                }}
              >
                {Language.pages_test_testDetail_backHome}
              </Button>
            }
          />
        );

      if (this.props.test.loading) {
        return <PageLoading tip={Language.pages_test_testDetail_waitingThisTest}></PageLoading>;
      }
      if (!this.props.test.isValid) {
        return (
          <Result
            title={Language.test_wrongLink}
            extra={
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  this.reset();
                  history.push('/developer/test');
                }}
              >
                {Language.pages_test_testDetail_backHome}
              </Button>
            }
          />
        );
      }
      if (!this.props.test.permission) {
        return (
          <Result
            title={Language.test_noPermission}
            extra={
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  this.reset();
                  history.push('/developer/test');
                }}
              >
                {Language.pages_test_testDetail_backHome}
              </Button>
            }
          />
        );
      }
      if (this.props.test.isDid) {
        return (
          <Result
            title={Language.pages_test_testDetail_submittedThisTest}
            extra={
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  this.reset();
                  history.push('/developer/test');
                }}
              >
                {Language.pages_test_testDetail_backHome}
              </Button>
            }
          />
        );
      }

      if (check && this.props.test.isOut) {
        this.submit();
        return (
          <Result
            title={Language.pages_test_testDetail_timeOut_notSubmit}
            extra={
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  this.reset();
                  history.push('/developer/test');
                }}
              >
                {Language.pages_test_testDetail_backHome}
              </Button>
            }
          />
        );
      }
      if (check) {
        this.submit();
        return (
          <Result
            title={Language.pages_test_testDetail_timeOut_submit}
            extra={
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  this.reset();
                  history.push('/developer/test');
                }}
              >
                {Language.pages_test_testDetail_backHome}
              </Button>
            }
          />
        );
      }

      return (
        <div className={styles.body}>
          <div>
            <div className={styles.countdownWrapper}>
              {hours && (
                <div className={styles.countdownItem}>
                  {hours}
                  <span>{Language.pages_test_testDetail_hours}</span>
                </div>
              )}
              {minutes && (
                <div className={styles.countdownItem}>
                  {minutes}
                  <span>{Language.pages_test_testDetail_minutes}</span>
                </div>
              )}
              {seconds && (
                <div className={styles.countdownItem}>
                  {seconds}
                  <span>{Language.pages_test_testDetail_seconds}</span>
                </div>
              )}
            </div>
            {!this.state.fullScreen ? (
              <Row className={styles.container}>
                <Col span={1}></Col>
                <Col span={15} className={styles.answer}>
                  {this.getData().generalInformation == undefined ? (
                    <div className={styles.spin}>
                      <PageLoading tip={Language.pages_test_testDetail_waitingATest} />
                    </div>
                  ) : (
                    <>
                      <p>
                        <b>
                          <i>
                            {Language.pages_test_testDetail_question}
                            {this.props.test.question + 1}
                          </i>
                        </b>
                      </p>
                      <p>
                        <b>{Language.pages_test_testDetail_score}</b> {this.getQuestion()?.Score}
                      </p>
                      <MDEditor.Markdown source={this.getQuestion()?.Description} />
                      {this.getQuestion()?.CodeSample != null ? (
                        <SyntaxHighlighter language="javascript" style={docco}>
                          {this.getCodeSampleMC(this.getQuestion()?.CodeSample)}
                        </SyntaxHighlighter>
                      ) : (
                        ''
                      )}
                      {this.getQuestion()?.QuestionType === 'Code' ? (
                        <>{this.returnCodeQuestion()}</>
                      ) : (
                        <>{this.returnQuizQuestion()}</>
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
                        <b>{Language.pages_test_testDetail_listQuestion}</b>
                      </p>
                    }
                    footer={
                      <Popconfirm
                        title={Language.test_sure}
                        onConfirm={() => {
                          this.submit();
                          const args = {
                            message: `${Language.test_success}`,
                            description: `${Language.test_record}`,
                            duration: 0,
                          };
                          notification.open(args);
                          history.push('/developer/test');
                        }}
                        okText={Language.test_yes}
                        cancelText={Language.test_no}
                      >
                        <Button type="primary">{Language.pages_test_testDetail_submit}</Button>
                      </Popconfirm>
                    }
                    bordered
                    dataSource={this.returnGridQuestion()}
                    grid={{ column: 4 }}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                  />
                </Col>
              </Row>
            ) : (
              <>
                <div>
                  {this.getData().generalInformation == undefined ? (
                    <div className={styles.spin}>
                      <PageLoading tip={Language.pages_test_testDetail_waitingATest} />
                    </div>
                  ) : (
                    <>
                      <Tooltip
                        title={
                          !this.state.showQuestion
                            ? Language.pages_test_showQuestion
                            : Language.pages_test_hideQuestion
                        }
                      >
                        <Button
                          type="primary"
                          icon={
                            !this.state.showQuestion ? <CaretDownOutlined /> : <CaretUpOutlined />
                          }
                          style = {{marginLeft: '10px'}}
                          onClick={() => {
                            this.setState({
                              showQuestion: !this.state.showQuestion,
                            });
                          }}
                        >
                          {Language.pages_test_testDetail_question}
                          {this.props.test.question + 1}
                        </Button>
                      </Tooltip>
                      {!this.state.showQuestion ? (
                        ''
                      ) : (
                        <div className={styles.collapseQuestion}>
                          <p>
                            <b>{Language.pages_test_testDetail_score}</b>{' '}
                            {this.getQuestion()?.Score}
                          </p>
                          <MDEditor.Markdown source={this.getQuestion()?.Description} />
                          {this.getQuestion()?.CodeSample != null ? (
                            <SyntaxHighlighter language="javascript" style={docco}>
                              {this.getCodeSampleMC(this.getQuestion()?.CodeSample)}
                            </SyntaxHighlighter>
                          ) : (
                            ''
                          )}
                        </div>
                      )}
                      {this.getQuestion()?.QuestionType === 'Code' ? (
                        <>{this.returnCodeQuestion()}</>
                      ) : (
                        <>{this.returnQuizQuestion()}</>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          <div></div>
        </div>
      );
    }
  }
}
export default connect(({ test, judge, loading }) => ({
  test,
  judge,
  loading: loading.effects['test/getTestByIdModel'],
}))(TestDetail);
