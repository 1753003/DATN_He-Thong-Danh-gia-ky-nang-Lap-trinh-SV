import React from 'react';
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
  DatePicker,
  TimePicker,
} from 'antd';
import moment from 'moment';

export const DrawerForm = ({ visible, onClose, form, setInformation, action }) => {
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
        {action === 'CREATE' && (
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="listEmail"
                label="Email"
                rules={[
                  { required: false, message: 'Please select which student you want to send mail' },
                ]}
              >
                <Select
                  placeholder="Please select which student you want to send mail"
                  mode="tags"
                ></Select>
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Drawer>
  );
};
