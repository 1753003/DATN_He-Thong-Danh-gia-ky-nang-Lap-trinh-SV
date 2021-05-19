import React, { useEffect, useState } from 'react';

import { Typography, Card, List, Modal, Row, Col, Divider, Checkbox, Button, Space } from 'antd';
import { ExclamationCircleOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { history, Link } from 'umi';
import { connect } from 'dva';
import PageLoading from '@/components/PageLoading';
import styles from './style.less';

const { confirm } = Modal;
const CheckboxGroup = Checkbox.Group;
const QuestionGrid = ({ list, onSelectedGrid, handleSubmit }) => {
  return (
    <div className={styles.grid}>
      {list?.map((item, i) => {
        return (
          <Button
            type={item.type}
            size="large"
            className={styles.square}
            onClick={() => onSelectedGrid(i)}
          >
            <p className={styles.content}>{i + 1}</p>
          </Button>
        );
      })}
      <Button  type="primary" block onClick={() => handleSubmit()}>
        Submit
      </Button>
    </div>
  );
};
const QuizWrapper = ({ submitResponse, dispatch, data, loading }) => {
  const [userChoice, setUserChoice] = useState({});
  const [currentQuestionID, setCurrentQuestionID] = useState(0);
  const [backState, setBackState] = useState(true);
  const [nextState, setNextState] = useState(false);
  const [currentChoices, setCurrentChoice] = useState(['empty']);

  useEffect(() => {
    data?.listQuestion.forEach((q) => {
      q.type = 'secondary';
    });
  }, []);
  useEffect(() => {
    if (currentQuestionID === 0) {
      setBackState(true);
    } else {
      setBackState(false);
    }
    if (currentQuestionID === data?.listQuestion.length - 1) {
      setNextState(true);
    } else {
      setNextState(false);
    }
    setCurrentChoice(
      userChoice[currentQuestionID] ? userChoice[currentQuestionID].list : ['empty'],
    );
  }, [currentQuestionID]);
  const onBack = () => {
    setCurrentQuestionID(currentQuestionID - 1);
  };
  const onNext = () => {
    setCurrentQuestionID(currentQuestionID + 1);
  };
  const onSelectedGrid = (id) => {
    setCurrentQuestionID(id);
  };
  const handleChange = (list) => {
    if (data && list.length > 0) data.listQuestion[currentQuestionID].type = 'primary';
    else data.listQuestion[currentQuestionID].type = 'secondary';
    let tmp = {
      id: currentQuestionID,
      list: list,
      qid: data?.listQuestion[currentQuestionID].ID,
    };
    let tempList = userChoice;
    tempList[currentQuestionID] = tmp;
    setUserChoice(() => tempList);
    setCurrentChoice(userChoice[currentQuestionID] ? userChoice[currentQuestionID].list : []);
  };

  const handleSubmit = () => {
    if (data && data.listQuestion.length > Object.keys(userChoice).length)
      confirm({
        title: 'You have not finished all question.',
        icon: <ExclamationCircleOutlined />,
        content: 'Do you want to Submit?',
        okText: 'Submit',
        onOk() {
          dispatch({
            type: 'practice/submitAnswerMultipleChoice',
            payload: userChoice,
          });
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    else
      {
        dispatch({
          type: 'practice/submitAnswerMultipleChoice',
          payload: userChoice,
        });
      }
  };
  return loading?<PageLoading/>:(submitResponse==null?
    <Row gutter={32}>
      <Col span={18}>
        <Divider orientation="left">{`Question ${currentQuestionID+1}.`}</Divider>
        <p>{data?.listQuestion[currentQuestionID].Description}</p>
        <Divider></Divider>
        <CheckboxGroup
          value={currentChoices}
          options={data?.listQuestion[currentQuestionID].Answer}
          onChange={(list) => handleChange(list)}
        ></CheckboxGroup>
        <Divider></Divider>
        <Space>
            <Button disabled={backState} type="primary" onClick={() => onBack()}>
              Back
            </Button>
            <Button disabled={nextState} type="primary" onClick={() => onNext()}>
              Next
            </Button>
          </Space>
      </Col>
      <Col span={6}>
        <QuestionGrid
          list={data?.listQuestion}
          onSelectedGrid={onSelectedGrid}
          handleSubmit={handleSubmit}
        ></QuestionGrid>
      </Col>
    </Row>
  :<div>
    <h2>Practice submitted successfully. </h2>
    <h3 style={submitResponse === data.listQuestion.length?{color:"darkgreen"}:{color:"red"}}>{`Your result: ${submitResponse} / ${data.listQuestion.length} correct questions`}</h3>
    <Divider></Divider>
    <p>We have received and processed your submission. You can view your detail submission in "Submission Tab"</p>
    <p>If you have anything to tell us, you can feel free to contact at codejoy@codejoy.com</p>
    </div>
  );
};

export default connect(({ practice, loading }) => ({
  submitResponse: practice.mulitpleChoiceResponse,
  // loadingSubmit: loading.effects['practice/submitAnswerMultipleChoice']
  loading: loading.models['practice']
}))(QuizWrapper);
