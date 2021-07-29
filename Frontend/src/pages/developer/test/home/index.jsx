import React, { useEffect, useState } from 'react';
import styles from './style.less';
import './style.less';
import {
  Typography,
  Card,
  Input,
  Button,
  notification,
  List,
  ConfigProvider,
  Row,
  Col,
} from 'antd';
import { Link, history } from 'umi';
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';
import Language from '@/locales/index';
import { MailOutlined } from '@ant-design/icons';

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <MailOutlined rotate={180} style={{ fontSize: 20 }} />
    <p>You have no invitation!</p>
  </div>
);
const data = [
  {
    title: 'C Programming Set',
    img: 'https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/Language%2FC_set%20(1).png?alt=media&token=29dece54-d20c-4155-b05d-8ad6b0dad0f1',
  },
  {
    title: 'C++ Programming Set',
    img: 'https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/Language%2Fcpp_set%20(1).png?alt=media&token=84498d05-6728-402e-afb8-43421b4a487d',
  },
  {
    title: 'Java Programming Set',
    img: 'https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/Language%2Fjava_set%20.png?alt=media&token=d4a36599-487d-42ad-bba1-af575fab82c0',
  },
  {
    title: 'JavaScript Programming Set',
    img: 'https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/Language%2Fjs_set.png?alt=media&token=dcfebb65-0e26-4799-9c2e-632f89745f1f',
  },
];

const testHome = ({ dispatch, status, inviteList }) => {
  useEffect(() => {
    if (status === -1)
      notification.open({
        description: 'Your have enter wrong PIN code!',
        className: 'code-notification',
        type: 'error',
      });
    dispatch({
      type: 'test/saveStatusFromCode',
      payload: null,
    });
  }, [status]);

  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    if (value === '')
      notification.open({
        description: 'Your have not enter PIN code!',
        type: 'warning',
      });
    dispatch({
      type: 'test/saveStatusFromCode',
      payload: null,
    });
    if (value !== '')
      dispatch({
        type: 'test/getTestIdFromCode',
        payload: value,
      });
    else return;
  };
  
  return (
    <div className={styles.global}>
      <QueueAnim className="combine-wrapper">
        <Row className="row-wrapper">
          <Col span={12} key="input-wrapper" className="input-wrapper">
            <Input
              // allowClear
              onPressEnter={handleSubmit}
              onChange={(e) => handleChange(e)}
              className="input"
              size="large"
              placeholder={Language.pages_test_home_enterPinCode}
            ></Input>
            <Button onClick={handleSubmit} block size="large" className="button">
              {Language.pages_test_home_join}
            </Button>
          </Col>
          <Col
            span={12}
            key="invite-list"
            styles={{ boxShadow: '0 1px 2px rgba(24, 144, 255, .4)' }}
          >
            <Typography.Title level={2}>
              <Texty>Invite List:</Texty>
            </Typography.Title>
            <ConfigProvider renderEmpty={customizeRenderEmpty}>
              <List
                className="invite-list"
                dataSource={inviteList}
                renderItem={(item) => (
                  <Card className="invite-card">
                    <List.Item key={item.id}
                    onClick={()=>{
                      console.log(item.id)
                      history.push({
                        pathname: '/developer/test/questions',
                        state: {id:item.id,type:"test"},
                      })
                    }}>
                      <List.Item.Meta title={item.testName} description={`from ${item.author}`} />
                    </List.Item>
                  </Card>
                )}
              />{' '}
            </ConfigProvider>
          </Col>
        </Row>
      </QueueAnim>
      <div>
        <Typography.Title className={styles.topic}>
          <Texty>{Language.pages_practice_topics}</Texty>
        </Typography.Title>
        <div className={styles.body}>
          <QueueAnim delay={300} className={styles.queue}>
            {data.map((item, i) => (
              <Link key={i} to={'/developer/test/list?listName=' + encodeURIComponent(item.title)}>
                <Card className={styles.card} hoverable>
                  <img alt="cover" src={item.img} />
                </Card>
              </Link>
            ))}
          </QueueAnim>
          <div className={styles.topics}></div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ test, user }) => ({
  inviteList: user.inviteList,
  status: test.statusFromCode,
}))(testHome);
