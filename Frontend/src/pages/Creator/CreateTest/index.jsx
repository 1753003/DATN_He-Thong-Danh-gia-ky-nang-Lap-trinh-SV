import React, { useState } from 'react';
import styles from './index.less';
import { Button, Drawer, Select, Input, Row, Col, Form } from 'antd';
import {
  PlusOutlined,
  QuestionOutlined,
  FileTextOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';

const { Option } = Select;
const CreateTest = () => {
  const [option, setOption] = useState('quiz');
  const [quiz, setQuiz] = useState([
    {
      ID: '1',
      QuestionType: 'Quiz',
      Score: 20,
      // Choices: {}
    },
    {
      ID: '2',
      QuestionType: 'Quiz',
      Score: 20,
      // Choices: {}
    },
    {
      ID: '3',
      QuestionType: 'Quiz',
      Score: 20,
      // Choices: {}
    },
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button type="primary">
          Test Infomation <PlusOutlined />
        </Button>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.left}>
          {quiz?.map((item) => {
            return (
              <div className={styles.quizContainer}>
                {item.ID} - {item.QuestionType}
              </div>
            );
          })}
        </div>
        <div className={styles.mid}>
          <RenderMiddle option={option} />
        </div>
        <div className={styles.right}>
          <div className={styles.option}>
            <div className={styles.optionTitle}>
              <QuestionOutlined />
              Question Type
            </div>
            <Select
              defaultValue="quiz"
              style={{ width: '100%' }}
              onChange={(value) => {
                setOption(value);
                console.log(value);
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
            <Input />
          </div>
          <div className={styles.option}>
            <div className={styles.optionTitle}>
              <FileTextOutlined />
              Answer Options
            </div>
            <Select defaultValue="single" style={{ width: '100%' }}>
              <Option value="single">Single Option</Option>
              <Option value="multiple">Multiple Option</Option>
            </Select>
          </div>
        </div>
      </div>
      <DrawerForm />
    </div>
  );
};

const RenderMiddle = ({ option }) => {
  const [listChoices, setListChoices] = useState([
    {
      id: 1,
      choice: '',
      answer: true,
    },
    {
      id: 2,
      choice: '',
      answer: true,
    },
    {
      id: 3,
      choice: '',
      answer: true,
    },
    {
      id: 4,
      choice: '',
      answer: true,
    },
  ]);
  switch (option) {
    case 'quiz':
      return (
        <div className={styles.quizInfoContainer}>
          <Input.TextArea
            placeholder="Typing your question here ..."
            autoSize={{ minRows: 6, maxRows: 6 }}
          />
          {listChoices.map((item) => {
            return (
              <div className={styles.choices}>
                <div>Answer {item.id}</div>
                <Input style={{ height: '40px', width: '80%' }} />
              </div>
            );
          })}
          <Button
            style={{ width: '100%' }}
            type="primary"
            onClick={() => {
              setListChoices([
                ...listChoices,
                {
                  id: 4,
                  choice: '',
                  answer: true,
                },
              ]);
            }}
          >
            + Add more answer
          </Button>
        </div>
      );
    case 'code':
      return <div>Nothing</div>;
  }
};

class DrawerForm extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          <PlusOutlined /> New account
        </Button>
        <Drawer
          title="Create a new account"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          placement="left"
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.onClose} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="url"
                  label="Url"
                  rules={[{ required: true, message: 'Please enter url' }]}
                >
                  <Input
                    style={{ width: '100%' }}
                    addonBefore="http://"
                    addonAfter=".com"
                    placeholder="Please enter url"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="owner"
                  label="Owner"
                  rules={[{ required: true, message: 'Please select an owner' }]}
                >
                  <Select placeholder="Please select an owner">
                    <Option value="xiao">Xiaoxiao Fu</Option>
                    <Option value="mao">Maomao Zhou</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[{ required: true, message: 'Please choose the type' }]}
                >
                  <Select placeholder="Please choose the type">
                    <Option value="private">Private</Option>
                    <Option value="public">Public</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="approver"
                  label="Approver"
                  rules={[{ required: true, message: 'Please choose the approver' }]}
                >
                  <Select placeholder="Please choose the approver">
                    <Option value="jack">Jack Ma</Option>
                    <Option value="tom">Tom Liu</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                {/* <Form.Item
                  name="dateTime"
                  label="DateTime"
                  rules={[{ required: true, message: 'Please choose the dateTime' }]}
                >
                  <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    getPopupContainer={(trigger) => trigger.parentElement}
                  />
                </Form.Item> */}
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter url description" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default CreateTest;
