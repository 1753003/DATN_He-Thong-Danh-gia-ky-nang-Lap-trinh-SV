import React, { useState } from 'react';
import styles from './index.less';
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
} from 'antd';
import {
  PlusOutlined,
  QuestionOutlined,
  FileTextOutlined,
  DollarCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';

const { Option } = Select;
const CreateTest = () => {
  const [option, setOption] = useState('quiz');
  const [quiz, setQuiz] = useState([]);
  const [information, setInformation] = useState({});
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [form] = Form.useForm();

  const handleChangeQuiz = (item) => {
    setSelectedQuiz(item);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

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
              <Button
                className={styles.quizContainer}
                onClick={() => handleChangeQuiz(item)}
                type={item.ID === selectedQuiz.ID ? 'primary' : 'default'}
              >
                {item.ID} - {item.QuestionType}
              </Button>
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
            type="primary"
            style={{ marginTop: 20 }}
          >
            Create New Quiz
          </Button>
        </div>
        <div className={styles.mid}>
          <RenderMiddle option={option} selectedQuiz={selectedQuiz} setQuiz={setQuiz} quiz={quiz} />
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
              <InputNumber
                onChange={(value) => {
                  const newQuiz = [...quiz];
                  newQuiz.forEach((item) => {
                    if (item.ID === selectedQuiz.ID) item.Score = value.target.value;
                  });
                  setQuiz(newQuiz);
                }}
                value={selectedQuiz.Score}
                style={{ width: '100%' }}
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

const RenderMiddle = ({ option, selectedQuiz, setQuiz, quiz }) => {
  console.log(selectedQuiz);
  const [code, setCode] = useState('');
  const onChangeAnswer = (answer, id) => {
    const newQuiz = [...quiz];
    newQuiz.forEach((quiz) => {
      if (quiz.ID === selectedQuiz.ID) {
        quiz.Choices.forEach((choice) => {
          // console.log(`${typeof choice.id} + ${typeof e.target.name}`);
          if (choice.id === id) choice.answer = answer;
        });
      }
    });
    setQuiz(newQuiz);
  };

  const onChangeCodeDescription = (e) => {
    setCode(e.target.value);
  };
  switch (selectedQuiz.QuestionType) {
    case 'quiz':
      return (
        <div className={styles.quizInfoContainer}>
          <Input.TextArea
            placeholder="Typing your question here ..."
            autoSize={{ minRows: 6, maxRows: 6 }}
            value={selectedQuiz.MCDescription}
            onChange={(value) => {
              const newQuiz = [...quiz];
              newQuiz.forEach((item) => {
                if (item.ID === selectedQuiz.ID) item.MCDescription = value.target.value;
              });
              setQuiz(newQuiz);
            }}
          />
          {selectedQuiz.Choices?.map((item) => {
            return (
              <div className={styles.choices}>
                <div>Answer {item.id}</div>
                <Input
                  style={{ height: '40px', width: '70%' }}
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
                <div>Answer: </div>
                <div>
                  {item.answer ? (
                    <Button
                      type="primary"
                      icon={<CheckOutlined />}
                      style={{ backgroundColor: '#a0d911', border: 'none' }}
                      onClick={() => onChangeAnswer(false, item.id)}
                    />
                  ) : (
                    <Button
                      type="primary"
                      icon={<CloseOutlined />}
                      style={{ backgroundColor: 'red', border: 'none' }}
                      onClick={() => onChangeAnswer(true, item.id)}
                    />
                  )}
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
      return (
        <div className={styles.codeContainer}>
          <Card title="Preview" style={{ marginBottom: '20px' }}>
            <ReactMarkdown>{code}</ReactMarkdown>
          </Card>
          <Input.TextArea onChange={onChangeCodeDescription} />
        </div>
      );
    default:
      return (
        <Alert
          message="Note"
          description="Please add more quiz to show Quiz Infomation"
          type="info"
          style={{ margin: '0px 20px' }}
        />
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
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="BriefDescription"
              label="Brief Description(*)"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input placeholder="Please enter user name" />
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
              name="TimeTime"
              label="Time(*)"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <InputNumber
                placeholder="Enter maximum time to do this test..."
                style={{ width: '100%' }}
                min={0}
              />
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
              name="StartTime"
              label="Start Time"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input placeholder="" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="EndTime"
              label="End Time"
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
              name="Permissions"
              label="Permissons"
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
