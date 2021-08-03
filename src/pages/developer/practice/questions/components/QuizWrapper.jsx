import React, { useEffect, useState } from 'react';

import {
  Modal,
  Row,
  Col,
  Divider,
  Checkbox,
  Button,
  Space,
  Select,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import PageLoading from '@/components/PageLoading';
import styles from './style.less';
import MDEditor from '@uiw/react-md-editor';
import Language from '@/locales/index';

const { confirm, warning } = Modal;
const CheckboxGroup = Checkbox.Group;
const QuestionGrid = ({ list, onSelectedGrid, handleSubmit }) => {
  return (<div className={styles.gridContainer}>
    <div className={styles.grid}>
      {list?.map((item, i) => {
        return (
          <Button
            key={i}
            type={item.type}
            size="large"
            className={styles.square}
            onClick={() => onSelectedGrid(i)}
          >
            <p className={styles.content}>{i + 1}</p>
          </Button>
        );
      })}
    </div>
      <Button type="primary" block onClick={() => handleSubmit()}>
        {Language.pages_test_testDetail_submit}
      </Button>
      </div>
  );
};
const QuizWrapper = ({ pLength, pid, submitResponse, dispatch, data, loading }) => {
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
    if (Object.keys(userChoice).length===0)
    warning({
      title: `${Language.pages_practice_blank}`,
    });
    else if (data && data.listQuestion.length > Object.keys(userChoice).length)
      Modal.confirm({
        title: `${Language.pages_practice_notFinish}`,
        icon: <ExclamationCircleOutlined />,
        content: `${Language.pages_test_testDetail_submitSure}`,
        okText: `${Language.pages_test_testDetail_submit}`,
        onOk() {
          dispatch({
            type: 'practice/submitAnswerMultipleChoice',
            payload: {pLength,pid, userChoice},
          });
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    else {
      dispatch({
        type: 'practice/submitAnswerMultipleChoice',
        payload: {pLength, pid, userChoice},
      });
    }
  };
  return loading ? (
    <PageLoading style={{minHeight:"320px"}}/>
  ) : submitResponse == null ? (
    <Row gutter={32}>
      <Col span={18} className={styles.question}>
        <Divider orientation="left">{`Question ${currentQuestionID + 1}.`}</Divider>
        <MDEditor.Markdown source={data?.listQuestion[currentQuestionID].Description} />
        <Divider></Divider>
        <CheckboxGroup
          className={styles.checkboxGroup}
          value={currentChoices}
          options={data?.listQuestion[currentQuestionID].Answer}
          onChange={(list) => handleChange(list)}
        ></CheckboxGroup>
        <Divider></Divider>
        <Space>
          <Button disabled={backState} type="primary" onClick={() => onBack()}>
            {Language.pages_test_testDetail_back}
          </Button>
          <Select className={styles.list} onChange={onSelectedGrid} value={currentQuestionID}>
            {data?.listQuestion.map((item, i) => {
              return <Select.Option key={i} value={i}>{i + 1}</Select.Option>;
            })}
          </Select>
          <Button disabled={nextState} type="primary" onClick={() => onNext()}>
            {Language.pages_test_testDetail_next}
          </Button>
        </Space>
      </Col>
      <Col span={6} className={styles.questionGrid}>
        <QuestionGrid
          list={data?.listQuestion}
          onSelectedGrid={onSelectedGrid}
          handleSubmit={handleSubmit}
        ></QuestionGrid>
      </Col>
    </Row>
  ) : (
    <div>
      <h2>{Language.pages_practice_submitted}</h2>
      <h3
        style={
          submitResponse.filter(function(e) {
            return e > 0}).length === data.listQuestion.length ? { color: 'darkgreen' } : { color: 'red' }
        }
      >{`Your result: ${submitResponse.filter(function(e) {
        return e > 0}).length} / ${data.listQuestion.length} correct questions`}</h3>
      <Divider></Divider>
      <p>
        {Language.pages_practice_receive}
      </p>
      <p>{Language.pages_practice_contact}</p>
    </div>
  );
};

export default connect(({ practice, loading }) => ({
  pLength: practice.listDetail?.listQuestion.length,
  pid : practice.listDetail?.generalInformation.PracticeID,
  submitResponse: practice.mulitpleChoiceResponse,
  loading: loading.models['practice'],
}))(QuizWrapper);
