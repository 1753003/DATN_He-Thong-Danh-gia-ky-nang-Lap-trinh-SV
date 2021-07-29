import React, { useEffect, useState } from 'react';
import styles from './index.less';
import moment from 'moment';
import PageLoading from '@/components/PageLoading';
import { Button, Select, Form, InputNumber, message } from 'antd';
import { PlusOutlined, QuestionOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import NotFound from '@/pages/404';
import { DrawerForm } from '@/components/DrawerForm';
import { InputCreateTest } from '@/components/InputCreateTest';
import { ModalCreateNewTest } from '@/components/ModalCreateNewTest';

const { Option } = Select;
const CreateTest = ({ dispatch, location, testBankList }) => {
  const [option, setOption] = useState('quiz');
  const [quiz, setQuiz] = useState([]);
  const [information, setInformation] = useState({});
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [action, setAction] = useState('CREATE');
  const [loading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [form] = Form.useForm();

  const updateEditInformation = (response) => {
    if (response) {
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
        }
        if (item.QuestionType === 'Code') {
          item.QuestionType = 'code';
        }
      });
      setQuiz(listQuestion);
      setSelectedQuiz(listQuestion[0]);

      form.setFieldsValue(generalInformation);
    } else {
      setInformation(undefined);
    }
    setLoading(false);
  };

  useEffect(() => {
    dispatch({ type: 'test/fetchTestBankList' });
  }, []);

  useEffect(() => {
    if (location.query.id) {
      setLoading(true);
      setAction('UPDATE');
      dispatch({
        type: 'test/getTestByIdModel',
        payload: { id: location.query.id, callback: updateEditInformation },
      });
    }
  }, [location]);

  const handleChangeQuiz = (item) => {
    setSelectedQuiz(item);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

  const createSuccess = (testCode) => {
    message.success(`Create test successfully with TestCode: ${testCode} !!!`);
    setLoading(false);
    history.back();
  };

  const createFail = () => {
    message.error('Fail to create test !!!');
    setLoading(false);
  };

  const updateSuccess = () => {
    message.success('Update test successfully !!!');
    history.back();
  };

  const updateFail = () => {
    message.error('Fail to update test !!!');
  };

  const handleSubmitTest = () => {
    if (quiz.length > 0 && information.TestName) {
      setLoading(true);
      const refactorQuestions = [];
      quiz.forEach((item) => {
        const newQuiz = { ...item };
        delete newQuiz.key;
        if (newQuiz.QuestionType === 'quiz') {
          newQuiz.QuestionType = 'MultipleChoice';
          newQuiz.MCDescription = newQuiz.Description;
        }
        if (newQuiz.QuestionType === 'code') {
          newQuiz.QuestionType = 'Code';
          newQuiz.CodeDescription = newQuiz.Description;
        }

        if (typeof newQuiz.ID === 'string' && newQuiz.ID.startsWith('_')) {
          newQuiz.ID = undefined;
        }

        delete newQuiz.Description;
        refactorQuestions.push(newQuiz);
      });

      const payload = {
        generalInformation: { ...information },
        listQuestion: [...refactorQuestions],
      };

      payload.generalInformation.TestTime = information.TestTime.locale('en').format('hh:mm:ss');

      if (information.StartTime) {
        payload.generalInformation.StartTime = information.StartTime.locale('en').format(
          'yy-MM-DD hh:mm:ss',
        );
      }

      if (information.EndTime) {
        payload.generalInformation.EndTime = information.EndTime.locale('en').format(
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
        // payload.listQuestion.forEach((question) => {
        //   if (typeof question.ID === 'string' && question.ID.startsWith('_')) {
        //     question.ID = undefined;
        //   }
        // });
        dispatch({
          type: 'test/updateTest',
          payload,
        });
      }
    } else {
      message.error('Please fill in all off the information !!!');
    }
  };

  const createNewEmptyTest = () => {
    const newQuiz = [...quiz];
    const payload = {
      key: newQuiz.length,
      QuestionType: 'quiz',
      ID: '_' + Math.random().toString(36).substr(2, 9),
      Description: '',
      Answer: [],
      CorrectAnswer: [],
      CodeSample: '',
      Score: 0,
    };

    newQuiz.push(payload);
    setQuiz(newQuiz);
    setVisibleModal(false);
    setSelectedQuiz(payload);
  };

  const onPressBankTest = (test) => {
    const newQuiz = [...quiz];
    const newTest = { ...test };
    newTest.key = newQuiz.length;

    if (test.QuestionType === 'MultipleChoice') {
      newTest.QuestionType = 'quiz';
    }
    if (test.QuestionType === 'Code') {
      newTest.QuestionType = 'code';
    }
    newQuiz.push(newTest);
    setQuiz(newQuiz);
    setVisibleModal(false);
    setSelectedQuiz(newTest);
  };

  const createNewTestClick = () => {
    setVisibleModal(true);
  };

  const handleTestBankOnClick = (record) => {
    const payload = {
      id: record.ID,
      callback: (response) => onPressBankTest(response),
    };
    dispatch({ type: 'test/getTestBankByIdModel', payload });
  };

  if (loading) {
    return <PageLoading />;
  }

  if (information) {
    return (
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
            <Button onClick={createNewTestClick} type="primary" style={{ marginTop: 20 }}>
              Create New Quiz
            </Button>
          </div>
          <div className={styles.mid}>
            <InputCreateTest
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
                          item.Description = '';
                          item.Answer = [];
                          item.CorrectAnswer = [];
                          item.CodeSample = '';
                          delete item.TestCase;
                          delete item.Description;
                          delete item.RunningTime;
                          delete item.MemoryUsage;
                        }
                        if (value === 'code') {
                          item.QuestionType = 'code';
                          item.Score = 0;
                          item.Description = '';
                          item.TestCase = [];
                          item.RunningTime = '';
                          item.MemoryUsage = '';
                          item.CodeSample = '';
                          delete item.CorrectAnswer;
                          delete item.Answer;
                          delete item.Description;
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
          action={action}
        />

        <ModalCreateNewTest
          visible={visibleModal}
          onCancel={() => setVisibleModal(false)}
          createNewEmptyTest={createNewEmptyTest}
          onPressBankTest={handleTestBankOnClick}
          testBankList={testBankList}
        />
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default connect(({ test: { testList, testBankList } }) => ({
  testList,
  testBankList,
}))(CreateTest);
