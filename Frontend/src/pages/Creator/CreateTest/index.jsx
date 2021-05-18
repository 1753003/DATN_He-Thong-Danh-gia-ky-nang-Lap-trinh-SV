import React, { useEffect, useState } from 'react';
import styles from './index.less';
import moment from 'moment';
import AceEditor from 'react-ace';
import { PageLoading } from '@ant-design/pro-layout';
import {
  Button,
  Drawer,
  Select,
  Input,
  Row,
  Col,
  Form,
  Divider,
  InputNumber,
  Alert,
  Card,
  DatePicker,
  ConfigProvider,
  message,
  TimePicker,
} from 'antd';
import {
  PlusOutlined,
  QuestionOutlined,
  FileTextOutlined,
  DollarCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { connect } from 'umi';
import ReactMarkdown from 'react-markdown';
import _ from 'lodash';

const { Option } = Select;
const CreateTest = ({ dispatch, location }) => {
  const [option, setOption] = useState('quiz');
  const [quiz, setQuiz] = useState([]);
  const [information, setInformation] = useState({});
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [action, setAction] = useState('CREATE');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const updateEditInformation = (response) => {
    const { generalInformation, listQuestion } = response;
    generalInformation.LanguageAllowed = JSON.parse(generalInformation.LanguageAllowed);
    if (generalInformation.StartTime) {
      generalInformation.StartTime = moment(generalInformation.StartTime);
    }
    if (generalInformation.EndTime) {
      generalInformation.EndTime = moment(generalInformation.EndTime);
    }
    generalInformation.TestTime = moment(generalInformation.TestTime, 'hh:mm:ss');
    setInformation(generalInformation);
    listQuestion.forEach((item, index) => {
      item.key = index;
      if (item.QuestionType === 'MultipleChoice') {
        item.QuestionType = 'quiz';
        item.MCDescription = item.Description;
        delete item.Description;
      }
      if (item.QuestionType === 'Code') {
        item.QuestionType = 'code';
        item.CodeDescription = item.Description;
        delete item.Description;
      }
    });
    setQuiz(listQuestion);
    setSelectedQuiz(listQuestion[0]);

    form.setFieldsValue(generalInformation);
    setLoading(false);
  };

  useEffect(() => {
    if (location.query.id) {
      setLoading(true);
      setAction('UPDATE');
      dispatch({
        type: 'test/getTestByIdModel',
        payload: { id: location.query.id, callback: updateEditInformation },
      });
    }
  }, [location.query.id]);

  const handleChangeQuiz = (item) => {
    setSelectedQuiz(item);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

  const createSuccess = () => {
    message.success('Create test successfully !!!');
    history.back();
  };

  const createFail = () => {
    message.error('Fail to create test !!!');
  };

  const updateSuccess = () => {
    message.success('Update test successfully !!!');
  };

  const updateFail = () => {
    message.error('Fail to update test !!!');
  };

  const handleSubmitTest = () => {
    if (quiz.length > 0 && information.TestName) {
      const refactorQuestions = [];
      quiz.forEach((element) => {
        const newQuiz = { ...element };
        if (action === 'CREATE') {
          delete newQuiz.ID;
        }
        delete newQuiz.key;
        if (newQuiz.QuestionType === 'quiz') {
          newQuiz.QuestionType = 'MultipleChoice';
        }
        if (newQuiz.QuestionType === 'code') {
          newQuiz.QuestionType = 'Code';
        }
        refactorQuestions.push(newQuiz);
      });

      const payload = {
        generalInformation: { ...information },
        listQuestion: [...refactorQuestions],
      };

      payload.generalInformation.TestTime = information.TestTime.locale('en').format('hh:mm:ss');

      if (information.EndTime || information.StartTime) {
        payload.generalInformation.EndTime = information.EndTime.locale('en').format(
          'yy-MM-DD hh:mm:ss',
        );
        payload.generalInformation.StartTime = information.StartTime.locale('en').format(
          'yy-MM-DD hh:mm:ss',
        );
      }

      payload.generalInformation.LanguageAllowed = JSON.stringify(
        payload.generalInformation.LanguageAllowed,
      );
      if (action === 'CREATE') {
        payload.onSuccess = createSuccess;
        payload.onFailure = createFail;
        dispatch({
          type: 'test/createTest',
          payload,
        });
      } else {
        payload.onSuccess = updateSuccess;
        payload.onFailure = updateFail;
        payload.id = location.query.id;
        delete payload.generalInformation.TestID;
        payload.listQuestion.forEach((question) => {
          if (typeof question.ID === 'string' && question.ID.startsWith('_')) {
            question.ID = undefined;
          }
        });
        dispatch({
          type: 'test/updateTest',
          payload,
        });
      }
    }
  };

  const commuteID = () => {};

  return loading ? (
    <PageLoading />
  ) : (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          type="primary"
          onClick={() => {
            setVisibleDrawer(true);
          }}
        >
          Test Infomation <PlusOutlined />
        </Button>
        <Button onClick={handleSubmitTest} className={styles.submitBtn}>
          {action === 'CREATE' ? 'CREATE' : 'UPDATE'}
        </Button>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.left}>
          {quiz?.map((item, index) => {
            return (
              <Button
                className={styles.quizContainer}
                onClick={() => handleChangeQuiz(item)}
                key={index}
                type={item.ID === selectedQuiz.ID ? 'primary' : 'default'}
              >
                {index + 1} - {item.QuestionType}
              </Button>
            );
          })}
          <Button
            onClick={() => {
              const newQuiz = [...quiz];
              const payload = {
                key: newQuiz.length,
                QuestionType: 'quiz',
                ID: (newQuiz.length + 1).toString(),
                MCDescription: '',
                Answer: [],
                CorrectAnswer: [],
                Score: 0,
              };
              if (action === 'UPDATE') {
                payload.ID = '_' + Math.random().toString(36).substr(2, 9);
              }
              newQuiz.push(payload);
              setQuiz(newQuiz);
            }}
            type="primary"
            style={{ marginTop: 20 }}
          >
            Create New Quiz
          </Button>
        </div>
        <div className={styles.mid}>
          <RenderMiddle
            option={option}
            selectedQuiz={selectedQuiz}
            setQuiz={setQuiz}
            quiz={quiz}
            action={action}
          />
        </div>
        {selectedQuiz.ID && (
          <div className={styles.right}>
            <div className={styles.option}>
              <div className={styles.optionTitle}>
                <QuestionOutlined />
                Question Type
              </div>
              <Select
                style={{ width: '100%' }}
                value={selectedQuiz.QuestionType}
                onChange={(value) => {
                  const newQuiz = [...quiz];
                  newQuiz.forEach((item) => {
                    if (item.ID === selectedQuiz.ID) {
                      if (value === 'quiz') {
                        item.QuestionType = 'quiz';
                        item.Score = 0;
                        item.MCDescription = '';
                        item.Answer = [];
                        item.CorrectAnswer = [];
                        delete item.TestCase;
                        delete item.CodeDescription;
                        delete item.RunningTime;
                        delete item.MemoryUsage;
                      }
                      if (value === 'code') {
                        item.QuestionType = 'code';
                        item.Score = 0;
                        item.CodeDescription = '';
                        item.TestCase = [];
                        item.RunningTime = '';
                        item.MemoryUsage = '';
                        delete item.CorrectAnswer;
                        delete item.Answer;
                        delete item.MCDescription;
                      }
                    }
                  });
                  setQuiz(newQuiz);
                }}
              >
                <Option value="quiz">Quiz</Option>
                <Option value="code">Code</Option>
              </Select>
            </div>
            <div className={styles.option}>
              <div className={styles.optionTitle}>
                <DollarCircleOutlined />
                Points
              </div>
              <InputNumber
                onChange={(value) => {
                  const newQuiz = [...quiz];
                  newQuiz.forEach((item) => {
                    if (item.ID === selectedQuiz.ID) item.Score = value;
                  });
                  setQuiz(newQuiz);
                }}
                value={selectedQuiz.Score}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        )}
      </div>

      <DrawerForm
        visible={visibleDrawer}
        onClose={onClose}
        form={form}
        setInformation={setInformation}
      />
    </div>
  );
};

const RenderMiddle = ({ option, selectedQuiz, setQuiz, quiz, action }) => {
  const onChangeAnswer = (index, selectedQuizID) => {
    if (checkCorrectAnswer(index, selectedQuizID)) {
      const newArray = _.remove(quiz[selectedQuizID].CorrectAnswer, function (n) {
        return n !== index;
      });
      const newQuiz = [...quiz];
      newQuiz[selectedQuizID].CorrectAnswer = newArray;
      setQuiz(newQuiz);
    } else {
      const newQuiz = [...quiz];
      newQuiz[selectedQuizID].CorrectAnswer.push(index);
      setQuiz(newQuiz);
    }
  };

  const handleMCDescriptionChange = (event) => {
    console.log(event.target.value);
    const newQuiz = [...quiz];
    newQuiz.forEach((item) => {
      if (item.ID === selectedQuiz.ID) item.MCDescription = event.target.value;
    });
    setQuiz(newQuiz);
  };

  const checkCorrectAnswer = (id, selectedQuizID) => {
    return quiz[selectedQuizID].CorrectAnswer?.includes(id);
  };

  const onChangeCodeDescription = (e) => {
    const newQuiz = [...quiz];
    newQuiz.forEach((item) => {
      if (item.ID === selectedQuiz.ID) item.CodeDescription = e.target.value;
    });
    setQuiz(newQuiz);
  };
  switch (selectedQuiz.QuestionType) {
    case 'quiz':
      return (
        <div className={styles.quizInfoContainer}>
          <Input.TextArea
            placeholder="Typing your question here ..."
            autoSize={{ minRows: 6, maxRows: 6 }}
            value={selectedQuiz.MCDescription}
            onChange={handleMCDescriptionChange}
          />
          {selectedQuiz.Answer?.map((item, index) => {
            return (
              <div className={styles.choices} key={index}>
                <div>Answer {index + 1}</div>
                <Input
                  style={{ height: '40px', width: '70%' }}
                  value={item}
                  id={index}
                  onChange={(e) => {
                    const newQuiz = [...quiz];
                    newQuiz.forEach((quiz) => {
                      if (quiz.ID === selectedQuiz.ID) {
                        for (let i = 0; i < quiz.Answer.length; i++) {
                          if (i === parseInt(e.target.id)) {
                            quiz.Answer[i] = e.target.value;
                          }
                        }
                      }
                    });
                    setQuiz(newQuiz);
                  }}
                />
                <div>Answer: </div>
                <div>
                  <Button
                    type="primary"
                    icon={
                      checkCorrectAnswer(index, selectedQuiz.key) ? (
                        <CheckOutlined />
                      ) : (
                        <CloseOutlined />
                      )
                    }
                    style={{
                      backgroundColor: checkCorrectAnswer(index, selectedQuiz.key)
                        ? '#a0d911'
                        : 'red',
                      border: 'none',
                    }}
                    onClick={() => onChangeAnswer(index, selectedQuiz.key)}
                  />
                </div>
              </div>
            );
          })}
          <Button
            style={{ width: '100%' }}
            type="primary"
            onClick={() => {
              const newQuiz = [...quiz];
              newQuiz.forEach((item) => {
                if (item.ID === selectedQuiz.ID) {
                  // item.Answer.push({
                  //   id: (item.Answer.length + 1).toString(),
                  //   choice: '',
                  //   answer: false,
                  // });
                  item.Answer.push('');
                }
              });
              setQuiz(newQuiz);
            }}
          >
            + Add more answer
          </Button>
        </div>
      );
    case 'code':
      return (
        <div className={styles.codeContainer}>
          <Card title="Preview" style={{ marginBottom: '20px' }}>
            <ReactMarkdown>{selectedQuiz?.CodeDescription}</ReactMarkdown>
          </Card>
          <h3>Code Description</h3>
          <Input.TextArea
            onChange={onChangeCodeDescription}
            value={selectedQuiz?.CodeDescription}
          />
          <h3>Test Case</h3>
          {selectedQuiz.TestCase?.map((item, index) => {
            return (
              <div className={styles.TC}>
                <h4>Test Case {index}</h4>
                <div className={styles.TCConatiner}>
                  <div style={{ width: '50%' }}>
                    <p>Input: </p>
                    <Input.TextArea
                      style={{ height: '40px', width: '98%' }}
                      id={index}
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      value={item.Input}
                      onChange={(e) => {
                        const newQuiz = [...quiz];
                        newQuiz.forEach((quiz) => {
                          if (quiz.ID === selectedQuiz.ID) {
                            for (let i = 0; i < quiz.TestCase.length; i++) {
                              if (i === parseInt(e.target.id)) {
                                quiz.TestCase[i].Input = e.target.value;
                              }
                            }
                          }
                        });
                        setQuiz(newQuiz);
                      }}
                    />
                  </div>

                  <div style={{ width: '50%' }}>
                    <p>Output : </p>
                    <Input.TextArea
                      style={{ height: '40px', width: '100%' }}
                      value={item.Output}
                      id={index}
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      onChange={(e) => {
                        const newQuiz = [...quiz];
                        newQuiz.forEach((quiz) => {
                          if (quiz.ID === selectedQuiz.ID) {
                            for (let i = 0; i < quiz.TestCase.length; i++) {
                              if (i === parseInt(e.target.id)) {
                                quiz.TestCase[i].Output = e.target.value;
                              }
                            }
                          }
                        });
                        setQuiz(newQuiz);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <Button
            style={{ width: '100%' }}
            type="primary"
            onClick={() => {
              const newQuiz = [...quiz];
              newQuiz.forEach((item) => {
                if (item.ID === selectedQuiz.ID) {
                  item.TestCase.push({
                    Input: '',
                    Output: '',
                  });
                }
              });
              setQuiz(newQuiz);
            }}
          >
            + Add more Test Case
          </Button>
          <h3>Other Infomation</h3>
          <div>
            <div>
              <h3>Running Time</h3>
              <InputNumber
                style={{ width: '100%' }}
                value={selectedQuiz.RunningTime}
                onChange={(value) => {
                  const newQuiz = [...quiz];

                  newQuiz.forEach((quiz) => {
                    if (quiz.ID === selectedQuiz.ID) {
                      quiz.RunningTime = value;
                    }
                  });
                  setQuiz(newQuiz);
                }}
              />
            </div>
            <div>
              <h3>Memory Usage</h3>
              <InputNumber
                style={{ width: '100%' }}
                value={selectedQuiz.MemoryUsage}
                onChange={(value) => {
                  const newQuiz = [...quiz];
                  newQuiz.forEach((quiz) => {
                    if (quiz.ID === selectedQuiz.ID) {
                      quiz.MemoryUsage = value;
                    }
                  });
                  setQuiz(newQuiz);
                }}
              />
            </div>
            <div>
              <h3>CodeSample</h3>
              <AceEditor
                // ref ={this.editorRef}
                // tabSize= {this.state.tabSize}
                style={{ whiteSpace: 'pre-wrap', border: 'solid #dcdcdc 1px' }}
                width="100%"
                height="400px"
                showPrintMargin={false}
                showGutter
                value={selectedQuiz.CodeSample}
                mode={'c_cpp'}
                fontSize={16}
                editorProps={{ $blockScrolling: true, $blockSelectEnabled: false }}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                }}
                onChange={(value) => {
                  console.log(value);
                  const newQuiz = [...quiz];
                  newQuiz.forEach((quiz) => {
                    if (quiz.ID === selectedQuiz.ID) {
                      console.log(value);
                      quiz.CodeSample = value;
                    }
                  });
                  setQuiz(newQuiz);
                }}
              />
            </div>
          </div>
        </div>
      );
    default:
      return action === 'CREATE' ? (
        <Alert
          message="Note"
          description="Please add more quiz to show Quiz Infomation"
          type="info"
          style={{ margin: '0px 20px' }}
        />
      ) : (
        <div />
      );
  }
};

const DrawerForm = ({ visible, onClose, form, setInformation }) => {
  const handleFinish = (values) => {
    setInformation(values);
    onClose();
  };
  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };
  return (
    <Drawer
      title="TEST INFORMATION"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      placement="left"
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Form layout="vertical" hideRequiredMark form={form} onFinish={handleFinish}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="TestName"
              label="Test Name(*)"
              rules={[{ required: true, message: 'Please enter test name' }]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item
              name="TestCode"
              label="Test Code(*)"
              rules={[{ required: true, message: 'Please enter test code' }]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col> */}
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="BriefDescription"
              label="Brief Description(*)"
              rules={[{ required: true, message: 'Please enter brief description' }]}
            >
              <Input placeholder="Please enter brief description" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="LanguageAllowed"
              label="Programming language (*)"
              rules={[{ required: true, message: 'Please select an owner' }]}
            >
              <Select placeholder="Please select language" mode="multiple">
                <Option value="C++">C++</Option>
                <Option value="C">C</Option>
                <Option value="Java">Java</Option>
                <Option value="Javascript">Javascript</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="TestTime"
              label="Time(*)"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              {/* <InputNumber
                placeholder="Enter maximum time to do this test..."
                style={{ width: '100%' }}
                min={0}
              /> */}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="MaxScore"
              label="Max score (*)"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="PassScore"
              label="Pass score"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="DifficultLevel"
              label="Level"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Select placeholder="Please select language">
                <Option value="Easy">Easy</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Hard">Hard</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>OPTIONAL INFORMATION</div>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="StartTime"
              label="Start Time"
              rules={[{ required: false, message: 'Please enter user name' }]}
            >
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                locale="en"
                // disabledDate={disabledDate}
                // disabledTime={disabledDateTime}
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="EndTime"
              label="End Time"
              rules={[{ required: false, message: 'Please enter user name' }]}
            >
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                // disabledDate={disabledDate}
                // disabledTime={disabledDateTime}
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              />
              {/* <Input placeholder="" /> */}
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>PERMISSION</div>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="Permissions"
              label="Permissons"
              rules={[{ required: false, message: 'Please select permission' }]}
            >
              <Select placeholder="Please select permission">
                <Option value="public">Public</Option>
                <Option value="private">Private</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Again"
              label="Again"
              rules={[{ required: false, message: 'Again or not' }]}
            >
              <Select placeholder="Please select permission">
                <Option value={true}>True</Option>
                <Option value={false}>False</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default connect(({ test: { testList } }) => ({
  testList,
}))(CreateTest);
