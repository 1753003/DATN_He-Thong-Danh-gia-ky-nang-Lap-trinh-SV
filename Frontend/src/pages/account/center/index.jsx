import { PlusOutlined, HomeOutlined, ContactsOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import {
  Avatar,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Tag,
  Form,
  DatePicker,
  Button,
  Drawer,
  Select,
  message
} from 'antd';
import React, { Component, useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, connect, useIntl } from 'umi';
import Projects from './components/Projects';
import Practice from './components/Practice';
import Test from './components/Test';
import styles from './Center.less';
import Language from '@/locales/index';
const { Option } = Select;
const operationTabList = (practice, test) => [
  {
    key: 'practice',
    tab: (
      <span>
        {Language.pages_profile_practiceHistory}{' '}
        <span
          style={{
            fontSize: 14,
          }}
        >
          ({practice})
        </span>
      </span>
    ),
  },
  {
    key: 'test',
    tab: (
      <span>
        {Language.pages_profile_testHistory}{' '}
        <span
          style={{
            fontSize: 14,
          }}
        >
          ({test})
        </span>
      </span>
    ),
  },
];

class Center extends Component {
  state = {
    tabKey: 'practice',
    visible: false,
  };

  input = undefined;
  componentDidMount() {}

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch({
      type: 'accountAndcenter/fetchCurrent',
    });
    dispatch({
      type: 'accountAndcenter/fetchHistory',
    });
    dispatch({
      type: 'accountAndcenter/fetchInfo',
    });
    console.log(this.props);
  }
  onTabChange = (key) => {
    this.setState({
      tabKey: key,
    });
  };

  renderChildrenByTabKey = (tabKey) => {
    if (tabKey === 'test') {
      return <Test />;
    }

    if (tabKey === 'practice') {
      return <Practice />;
    }

    return null;
  };

  renderUserInfo = (currentUser) => (
    <div className={styles.detail}>
      <p>
        <ContactsOutlined
          style={{
            marginRight: 8,
          }}
        />
        Student
      </p>
      <p>
        <PhoneOutlined
          style={{
            marginRight: 8,
          }}
        />
        {this.props.info.PhoneNumber}
      </p>
      <p>
        <HomeOutlined
          style={{
            marginRight: 8,
          }}
        />
        {this.props.info.Address}
      </p>
      <p>
        <GlobalOutlined 
          style={{
            marginRight: 8,
          }}
        />
        {this.props.info.Website}
      </p>
    </div>
  );

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

  onFinish = (values) => {
    let data = {};
    if (values.name != undefined) data.DevName = values.name;
    if (values.address != undefined) data.Address = values.address;
    if (values.description != undefined) data.About = values.description;
    if (values.education != undefined) data.Education = values.education;
    if (values.gender != undefined) data.DevGender = values.gender;
    if (values.phone != undefined) data.PhoneNumber = values.phone;
    if (values.url != undefined) data.Website = values.url;
    
    this.props.dispatch({
      type: 'accountAndcenter/updateInfo',
      payload: data
    })

    message.success('This is a success message');
    this.onClose()
  };

  render() {
    const { tabKey } = this.state;
    const { currentUser = {}, currentUserLoading, info, list } = this.props;
    const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    console.log('info: ', info);
    return (
      <GridContent>
        <Row>
          <Col lg={7} md={24} className={styles.info}>
            <Card
              bordered={false}
              style={{
                marginBottom: 24,
              }}
              loading={dataLoading}
            >
              {!dataLoading && (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={currentUser.avatar} />
                    <div className={styles.name}>{info.DevName}</div>
                    <div>{info.DevMail}</div>
                  </div>
                  {this.renderUserInfo(currentUser)}
                  <Divider dashed />
                  <div className={styles.team}>
                  <div className={styles.teamTitle}>{Language.pages_profile_education}</div>
                    <p> {info.Education} </p>
                    <Divider dashed />
                    <div className={styles.teamTitle}>{Language.pages_profile_about}</div>
                    <p> {info.About} </p>
                    <Row gutter={36}>
                      {currentUser.notice &&
                        currentUser.notice.map((item) => (
                          <Col key={item.id} lg={24} xl={12}>
                            <Link to={item.href}>
                              <Avatar size="small" src={item.logo} />
                              {item.member}
                            </Link>
                          </Col>
                        ))}
                    </Row>
                  </div>
                </div>
              )}
              <Button type="primary" className={styles.editButton} onClick={this.showDrawer}>
                {Language.pages_profile_edit}
              </Button>
            </Card>
          </Col>

          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList(list?.practice?.length, list?.test?.length)}
              activeTabKey={tabKey}
              onTabChange={this.onTabChange}
            >
              {this.renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
        <Drawer
          title={Language.pages_profile_editInfo}
          width={400}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark onFinish={this.onFinish}>
            <Form.Item
              name="name"
              label={Language.pages_profile_name}
            >
              <Input placeholder={Language.pages_profile_edit_name} defaultValue={info.DevName} />
            </Form.Item>

            <Form.Item
              name="url"
              label={Language.pages_profile_website}
            >
              <Input
                style={{ width: '100%' }}
                placeholder={Language.pages_profile_edit_website}
                defaultValue={info.Website}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label={Language.pages_profile_phone}
            >
              <Input placeholder={Language.pages_profile_edit_phone} defaultValue={info.PhoneNumber} />
            </Form.Item>
            
            <Form.Item
              name="education"
              label={Language.pages_profile_education}
            >
              <Input placeholder={Language.pages_profile_edit_education} defaultValue={info.Education} />
            </Form.Item>

            <Form.Item
              name="gender"
              label={Language.pages_profile_gender}
            >
              <Select placeholder={Language.pages_profile_edit_gender} defaultValue={info.DevGender}>
                <Option value="male">{Language.pages_profile_male}</Option>
                <Option value="female">{Language.pages_profile_female}</Option>
                <Option value="other">{Language.pages_profile_other}</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="address"
              label={Language.pages_profile_address}
            >
              <Input.TextArea rows={3} placeholder={Language.pages_profile_edit_address} defaultValue={info.Address}/>
            </Form.Item>
            
            <Form.Item
              name="description"
              label={Language.pages_profile_description}
            >
              <Input.TextArea rows={4} placeholder={Language.pages_profile_edit_description} defaultValue={info.About}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {Language.pages_profile_save}
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </GridContent>
    );
  }
}

export default connect(({ loading, accountAndcenter }) => ({
  currentUser: accountAndcenter.currentUser,
  currentUserLoading: loading.effects['accountAndcenter/fetchCurrent'],
  info: accountAndcenter.info,
  list: accountAndcenter.list,
}))(Center);
