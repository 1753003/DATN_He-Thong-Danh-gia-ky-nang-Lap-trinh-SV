import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import _, { random, set } from 'lodash';
import 'brace/mode/javascript';
import 'brace/mode/c_cpp';
import 'brace/mode/java';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow';
import 'brace/snippets/c_cpp';
import 'brace/snippets/java';
import 'brace/snippets/javascript';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import MDEditor from '@uiw/react-md-editor';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Input, InputNumber, Alert, Collapse, Divider, Table, Image, ConfigProvider } from 'antd';
const { Panel } = Collapse;
import styles from './styles.less';

export const InputCreateTest = ({ option, selectedQuiz, setQuiz, quiz, action }) => {
  const [description, setDescription] = useState(selectedQuiz?.Description);
  useEffect(() => {
    const newQuiz = [...quiz];
    newQuiz.forEach((item) => {
      if (item.ID === selectedQuiz.ID) {
        item.Description = description;
      }
    });
    setQuiz(newQuiz);
  }, [description]);

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

  const checkCorrectAnswer = (id, selectedQuizID) => {
    return quiz[selectedQuizID].CorrectAnswer?.includes(id);
  };

  const dataSourceDescriptionTable = [
    {
      key: '1',
      obj: 'Task',
      des: 'Describe the problem to be solved',
    },
    {
      key: '2',
      obj: 'Input format',
      des: 'Describe how the input structure corresponds to the provided test case.',
    },
    {
      key: '3',
      obj: 'Output format',
      des: 'Describe the problem to be solveDescribe the output structure to be able to run the test case correctly',
    },
    {
      key: '4',
      obj: 'How to write program',
      des: 'Describe the task as writing a complete program or completing a certain function. If testers need to complete a certain function, you need to provide them with a sample code script of how the main function works, the structure of the function needs to complete.',
    },
  ];

  const column = [
    {
      title: 'Object',
      dataIndex: 'obj',
      key: 'obj',
    },
    {
      title: 'Description',
      dataIndex: 'des',
      key: 'des',
    },
  ];

  switch (selectedQuiz.QuestionType) {
    case 'quiz':
      return (
        <div className={styles.quizInfoContainer}>
          
          <h3>Description</h3>
          <MDEditor
            style={{ width: '100%' }}
            value={selectedQuiz?.Description}
            onChange={setDescription}
            highlightEnable={true}
            id={random(1000)}
          />
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
              theme="tomorrow"
              value={selectedQuiz.CodeSample || ''}
              mode={'c_cpp'}
              fontSize={16}
              editorProps={{ $blockScrolling: true, $blockSelectEnabled: false }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
              }}
              onChange={(value) => {
                const newQuiz = [...quiz];
                newQuiz.forEach((quiz) => {
                  if (quiz.ID === selectedQuiz.ID) {
                    quiz.CodeSample = value;
                  }
                });
                setQuiz(newQuiz);
              }}
            />
          </div>
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
          <ConfigProvider locale="en">
          <Alert
            message="View the sample code question here"
            type="info"
            showIcon
          />
          <Image
            width={50}
            src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/DESCRIPTION-1.jpg?alt=media&token=7d0964bc-c1b7-4091-85d4-2670a491585a"
          ></Image>
          </ConfigProvider>
          <h3>Description</h3>
          <Alert
            message="You should create the question description according to the following structure 
          to ensure that the test-takers have enough information to complete the question."
            type="info"
            showIcon
          />
          <Table dataSource={dataSourceDescriptionTable} columns={column} />
          <MDEditor
            style={{ width: '100%' }}
            value={selectedQuiz?.Description}
            onChange={setDescription}
            highlightEnable={true}
          />
          <Divider />
          <h3>Test Case</h3>
          <Alert
            message="Testcase is the part that helps you compare the results that the test-taker's code does with the results you want from the input you give. This is the part that helps the system compare and grade the work for candidates."
            type="info"
            showIcon
          />
          {selectedQuiz.TestCase?.map((item, index) => {
            return (
              <div className={styles.TC}>
                <h4>Test Case {index + 1}</h4>
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
          <Divider />
          <h3>Other Infomation (Optional)</h3>
          <div>
            <div>
              <h3>Code Sample</h3>
              <Alert
                message="This is the place to write a sample program if you have some requirements such as needing candidates to complete a function in this program, correct errors in the program, ...."
                type="info"
                showIcon
              />
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
                theme="tomorrow"
                editorProps={{ $blockScrolling: true, $blockSelectEnabled: false }}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                }}
                onChange={(value) => {
                  const newQuiz = [...quiz];
                  newQuiz.forEach((quiz) => {
                    if (quiz.ID === selectedQuiz.ID) {
                      quiz.CodeSample = value;
                    }
                  });
                  setQuiz(newQuiz);
                }}
              />
            </div>
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
