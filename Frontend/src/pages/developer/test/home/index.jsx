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
import {c_set, cpp_set, java_set, js_set} from '@/utils/image.js'

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <MailOutlined rotate={180} style={{ fontSize: 20 }} />
    <p>{Language.pages_test_noInvite}</p>
  </div>
);

const data = [
  {
    title: 'C Programming Set',
    img: c_set,
  },
  {
    title: 'C++ Programming Set',
    img: cpp_set,
  },
  {
    title: 'Java Programming Set',
    img: java_set,
  },
  {
    title: 'JavaScript Programming Set',
    img: js_set,
  },
];

const testHome = ({ dispatch, status, inviteList }) => {
  useEffect(() => {
    if (status === -1)
      notification.open({
        description: `${Language.pages_test_wrongCode}`,
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
        description: `${Language.pages_test_noCode}`,
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
        <Row gutter={32} className="row-wrapper">
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
              <Texty>{Language.pages_test_inviteList}</Texty>
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
