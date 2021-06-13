import {
  PlusOutlined,
  HomeOutlined,
  ContactsOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
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
  message,
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
      type: 'accountAndcenter/fetchHistory',
    });
    dispatch({
      type: 'accountAndcenter/fetchInfo',
    });
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

  renderUserInfo = () => (
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
      payload: data,
    });

    message.success('This is a success message');
    this.onClose();
  };

  render() {
    const { tabKey } = this.state;
    const { currentUserLoading, info, list } = this.props;
    const dataLoading = currentUserLoading;
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
                    <img
                      alt=""
                      src={
                        info.DevImage == null
                          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADFCAMAAACM/tznAAAAPFBMVEXm5+inqaykpqnp6uvf4OHj5OWpq67LzM6rrbDc3d7W19musLO9v8Hh4uO0trnd3t/Dxce3ubvIycvQ0dO/bc7sAAAFNElEQVR4nO2d25qrIAyFlWitWq3W93/X7bG7nelBCPmYFfkv54qsgZwkNEkikUgkEolEIpFIJBKJRCKRSCQSiUQikUhEHiIKvYRAjJbnWVkNxVCVWX40HYjKojePtLfyMBqM1ncnY9Jnxj9cqiNoQDTUv6zfNDgX6iWgqn5t/arBaVCtAF3bT+bPEtSVYgm6b+bPElxynRLQ9ePuf1DgrHIT0LDP/FmCQp8CVOy3f1Sg06aAzf9/VuCmSwGq7OwfFdAVD7OTpf2jAqUmBXb6/ydOeehVe4N2xf9fW6APvW5f2DuAVQE1wfDsZP+oQBZ65V5wOwCzAK2KLVC62j8qoCEnpq8F4AfOCgRw9IDrFsBPh6hn2K9hC2ScDTB5gdAGMHEPAasAPfgWIPsi4IcCoS1gwoiBqwDYbpBubAEu2ALwYsAEdhxgu4BxC0BXxTn3BKAHQrYPnLxgaCM4sPLgTQBkJ+BDAOi2SBQgChAFiAJwBYCOAtejJ0KJBwHK0DZwINdPAg8ChLaBBfXsLVAjuwDLaxEvNwD4VQlmTxTeByZUMwVIsTcAuycG3hFL2C0R7CA4QReWAgq+D7PcILoLnGBtAQUbIEmaY28ATiDADwErrrmAmotyjs1xFRdkZtwqAjUHYMKhKDRt6EX7JLd3AycdlwQ3rrZfSfU4gAWqLO2HboW+wk4BffaPCpS778ybk7L9v5LvrApMm6m0fxocOn+XwKRF6HXKQXn3Zm74br65NEr//QuUXT5IYEyvalLoJXR9J8EhzJ+gfHk94dl40xa6N/8jREl16+v7+xHnvqsS9U8H/ICmd0OasiqbnI72hMgdWgm9jhAs//7h1nW3oSrzgx0AoqZozfMzMqMLPIoGYxRof0fCUYMhOYIE1HTpm1TIpJ3S1zMeuX1KhlUXAhPfn5ExreZ0iIZ3u/9xEyhshmzsawiYLvQ6ZaBm7xCt6bV8EnqEyh3dkE2Bugm9XO9QadMYN2ddXwVs7Z8UULYHMtsro6ZW5Qdy+2dk9Lyhkjhek1H0mJTtO1qbAvBX5DYax/nROvTCPeF8ZRz9ovSK4wGYFVBxCHLGADX2sMAC66Ik9sjYAnN+OvTy2VDLsh/eD7q+JPdfAfCagD02Bn5bkBEC7wpAF8Y+5gaRt4CHDYDtBfgzYyl2IPAwPD5yCm2GM8yBqQ3cW5MeXhGaQZ0c4g8Or6AWhV5c4CwAqBv04wInMB9U8+QCJ0DH5/gvyd0FgMwG/Z0AzFTA4wkAPQP+TgDmGfB5AsY4ENoca7yeAMgzwO8EPAkAlwv5PQF4Xwi4T2r/5hraJDu81QEbaDWxww8LfREAKxB6aQY+gxUI/buANIVqCnh3AWhOwLsLQHMCvrOACaRMQMIFQD0pwfwm/hqkciD3WwisAgDdGywF7Ef6wRmBNGgC59qg517ABo4XFPGBSF5QxAci3ZkT8YFAuaCQD8TJBUXywAmUMRoPPy/1BpSK2H8tvIASBgRq4VUAkGRYohZeBMAIA2JBAOWykFgQGOMgxCyhh1+VeAdGNSDQEN3ACANClcAsAERn2Pr9VAsBIOKgWBQEiYOCURAjDvJ/afcDCF0xoX7YKgBAIiDUD1uASATk0oAUoiAWTAMwMiGxYngWACATEuqIrgIANIYF8yCI64KieRBCKuhtUOi1AH//A6loIoiQCwv2g2YBQtv3FdFMGCEXlvsqgiKAZCkA8XVMVgCAaki0FgIQwOE3paz482MDjWQxiDBHfXgBrN/OVCeAZDsAQYCrqP3+W0L/AOggQRK505yuAAAAAElFTkSuQmCC'
                          : info.DevImage
                      }
                    />
                    <div className={styles.name}>{info.DevName}</div>
                    <div>{info.DevMail}</div>
                  </div>
                  {this.renderUserInfo()}
                  <Divider dashed />
                  <div className={styles.team}>
                    <div className={styles.teamTitle}>{Language.pages_profile_education}</div>
                    <p> {info.Education} </p>
                    <Divider dashed />
                    <div className={styles.teamTitle}>{Language.pages_profile_about}</div>
                    <p> {info.About} </p>
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
            ></div>
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
  currentUserLoading: loading.effects['accountAndcenter/fetchInfo'],
  info: accountAndcenter.info,
  list: accountAndcenter.list,
}))(Center);
