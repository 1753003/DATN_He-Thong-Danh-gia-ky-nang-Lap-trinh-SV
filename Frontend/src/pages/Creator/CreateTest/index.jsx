import React, { useState } from 'react';
import styles from './index.less';
import { Button, Drawer, Select, Input, Row, Col, Form, Divider, InputNumber } from 'antd';
import {
  PlusOutlined,
  QuestionOutlined,
  FileTextOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';

const { Option } = Select;
const CreateTest = () => {
  const [option, setOption] = useState('quiz');
  const [quiz, setQuiz] = useState([]);
  const [information, setInformation] = useState({});
  const [selectedQuiz, setSelectedQuiz] = useState(1);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [form] = Form.useForm();

  const handleChangeQuiz = (item) => {
    setSelectedQuiz(item);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

  console.log(information);

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
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.left}>
          {quiz?.map((item) => {
            return (
              <div className={styles.quizContainer} onClick={() => handleChangeQuiz(item)}>
                {item.ID} - {item.QuestionType}
              </div>
            );
          })}
          <Button
            onClick={() => {
              const newQuiz = [...quiz];
              newQuiz.push({
                key: newQuiz.length,
                ID: (newQuiz.length + 1).toString(),
                QuestionType: 'quiz',
                Question: '',
                Choices: [],
              });
              setQuiz(newQuiz);
            }}
          >
            Create New
          </Button>
        </div>
        <div className={styles.mid}>
          <RenderMiddle option={option} selectedQuiz={selectedQuiz} setQuiz={setQuiz} quiz={quiz} />
        </div>
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
                // setOption(value);
                // console.log(value);
                const newQuiz = [...quiz];
                newQuiz.forEach((item) => {
                  if (item.ID === selectedQuiz.ID) item.QuestionType = value;
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
            <Input
              onChange={(value) => {
                const newQuiz = [...quiz];
                newQuiz.forEach((item) => {
                  if (item.ID === selectedQuiz.ID) item.Score = value.target.value;
                });
                setQuiz(newQuiz);
              }}
              value={selectedQuiz.Score}
            />
          </div>
          {/* <div className={styles.option}>
            <div className={styles.optionTitle}>
              <FileTextOutlined />
              Answer Options
            </div>
            <Select defaultValue="single" style={{ width: '100%' }}>
              <Option value="single">Single Option</Option>
              <Option value="multiple">Multiple Option</Option>
            </Select>
          </div> */}
        </div>
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

const RenderMiddle = ({ option, selectedQuiz, setQuiz, quiz }) => {
  switch (selectedQuiz.QuestionType) {
    case 'quiz':
      return (
        <div className={styles.quizInfoContainer}>
          <Input.TextArea
            placeholder="Typing your question here ..."
            autoSize={{ minRows: 6, maxRows: 6 }}
            value={selectedQuiz.Question}
            onChange={(value) => {
              const newQuiz = [...quiz];
              newQuiz.forEach((item) => {
                if (item.ID === selectedQuiz.ID) item.Question = value.target.value;
              });
              setQuiz(newQuiz);
            }}
          />
          {selectedQuiz.Choices?.map((item) => {
            return (
              <div className={styles.choices}>
                <div>Answer {item.id}</div>
                <Input
                  style={{ height: '40px', width: '80%' }}
                  value={item.choice}
                  id={item.id}
                  onChange={(value) => {
                    const newQuiz = [...quiz];
                    newQuiz.forEach((quiz) => {
                      if (quiz.ID === selectedQuiz.ID) {
                        quiz.Choices.forEach((choice) => {
                          console.log(`${typeof choice.id} + ${typeof value.target.id}`);
                          if (choice.id === value.target.id) choice.choice = value.target.value;
                        });
                      }
                    });
                    setQuiz(newQuiz);
                  }}
                />
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
                  item.Choices.push({
                    id: (item.Choices.length + 1).toString(),
                    choice: '',
                    answer: false,
                  });
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
      return <div>Nothing</div>;
    default:
      return <div>Nothing</div>;
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
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="Description"
              label="Description(*)"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="Language"
              label="Programming language (*)"
              rules={[{ required: true, message: 'Please select an owner' }]}
            >
              <Select placeholder="Please select language">
                <Option value="c++">C++</Option>
                <Option value="c">C</Option>
                <Option value="java">Java</Option>
                <Option value="javascript">Javascript</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="Time"
              label="Time(*)"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input placeholder="Enter maximum time to do this test..." />
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
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="PassScore"
              label="Pass score"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="Level"
              label="Level"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Select placeholder="Please select language">
                <Option value="easy">Easy</Option>
                <Option value="normal">Normal</Option>
                <Option value="difficult">Difficult</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>OPTIONAL INFORMATION</div>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="TimeStart"
              label="Time start"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input placeholder="" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="TimeEnd"
              label="Time end"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input placeholder="" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>PERMISSION</div>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="Permission"
              label="Permisson"
              rules={[{ required: true, message: 'Please select permission' }]}
            >
              <Select placeholder="Please select permission">
                <Option value="public">Public</Option>
                <Option value="private">Private</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default CreateTest;
