import { StarTwoTone, LikeOutlined, MessageFilled } from '@ant-design/icons';
import { List, Tag, Radio, Row, Col, Button, ConfigProvider } from 'antd';
import React, { useState } from 'react';
import { connect, history } from 'umi';
import TestListContent from '../TestListContent';
import styles from './index.less';
import '../../../../../components/GlobalHeader/style.less';
import Language from '@/locales/index';
const Test = (props) => {
  const { list } = props;

  const IconText = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  );
  
  const [testList, setTestList] = useState(list.test);
  const [filter1, setFilter1] = useState('');
  const [filter2, setFilter2] = useState('');
  const [filter3, setFilter3] = useState('All');

  
  function onFilterChange(e) {
    const val = e.target.value;
    if (val == 'Pass') {
      setFilter3('');
      if (filter2 == '') setTestList(list.test.filter((test) => test.isPass));
      else if (filter2 == 'Public')
        setTestList(list.test.filter((test) => test.isPass && test.isPublic));
      else if (filter2 == 'Private')
        setTestList(list.test.filter((test) => test.isPass && !test.isPublic));
      setFilter1('Pass');
    } else if (val == 'Fail') {
      setFilter3('');
      if (filter2 == '') setTestList(list.test.filter((test) => !test.isPass));
      else if (filter2 == 'Public')
        setTestList(list.test.filter((test) => !test.isPass && test.isPublic));
      else if (filter2 == 'Private')
        setTestList(list.test.filter((test) => !test.isPass && !test.isPublic));
      setFilter1('Fail');
    } else if (val == 'Public') {
      setFilter3('');
      if (filter1 == '') setTestList(list.test.filter((test) => test.isPublic));
      else if (filter1 == 'Pass')
        setTestList(list.test.filter((test) => test.isPass && test.isPublic));
      else if (filter1 == 'Fail')
        setTestList(list.test.filter((test) => !test.isPass && test.isPublic));
      setFilter2('Public');
    } else if (val == 'Private') {
      setFilter3('');
      if (filter1 == '') setTestList(list.test.filter((test) => !test.isPublic));
      else if (filter1 == 'Pass')
        setTestList(list.test.filter((test) => test.isPass && !test.isPublic));
      else if (filter1 == 'Fail')
        setTestList(list.test.filter((test) => !test.isPass && !test.isPublic));
      setFilter2('Private');
    } else if (val == 'All') {
      setFilter1('');
      setFilter2('');
      setFilter3('All');
      setTestList(list.test);
    }
  }

  function renderTestSet(data) {
    if (data.length == 1) return <Tag color="magenta">{data[0]}</Tag>;
    else if (data.length == 2)
      return (
        <span>
          <Tag color="magenta">{data[0]}</Tag>
          <Tag color="red">{data[1]}</Tag>
        </span>
      );
    else if (data.length == 3)
      return (
        <span>
          <Tag color="magenta">{data[0]}</Tag>
          <Tag color="red">{data[1]}</Tag>
          <Tag color="volcano">{data[2]}</Tag>
        </span>
      );
    else if (data.length == 4)
      return (
        <span>
          <Tag color="magenta">{data[0]}</Tag>
          <Tag color="red">{data[1]}</Tag>
          <Tag color="volcano">{data[2]}</Tag>
          <Tag color="cyan">{data[3]}</Tag>
        </span>
      );
  }
  return (
    <div styles={{ display: 'block' }}>
      <Row justify="end">
        <Radio.Group className={styles.rdGroup} onChange={onFilterChange} value={filter3}>
          <Radio.Button value="All">{Language.pages_profile_all}</Radio.Button>
        </Radio.Group>

        <Radio.Group className={styles.rdGroup} onChange={onFilterChange} value={filter1}>
          <Radio.Button value="Pass">{Language.pages_profile_passed}</Radio.Button>
          <Radio.Button value="Fail">{Language.pages_profile_failed}</Radio.Button>
        </Radio.Group>

        <Radio.Group className={styles.rdGroup} onChange={onFilterChange} value={filter2}>
          <Radio.Button value="Public">{Language.pages_profile_public}</Radio.Button>
          <Radio.Button value="Private">{Language.pages_profile_private}</Radio.Button>
        </Radio.Group>
      </Row>
      <ConfigProvider locale="en">
      <List
        size="large"
        className={`${styles.articleList} custom`}
        rowKey="id"
        pagination={{
          pageSize: 3,
        }}
       
        dataSource={testList}
        renderItem={(item) => (
          <List.Item key={item.key}>
            <List.Item.Meta
              title={<a className={styles.listItemMetaTitle}>{item.TestName}</a>}
              description={
                <>
                <span>
                  <Tag color="green">{item.DifficultLevel}</Tag>
                  {renderTestSet(JSON.parse(item.LanguageAllowed))}
                </span>
                <br/>
                <TestListContent data={item} style={{paddingTop: '10px'}}/>
                </>
              }
            />
            
            <Button 
              type = "primary"
              onClick = {() => {
              history.push({
                pathname: '/developer/profile/review',
                state: {id:item.TestID,type:"test", name: item.TestName},
              });
            }}>{Language.pages_profile_review}</Button>

            <Button 
              style = {{marginLeft: '10px', backgroundColor: '#011B33', color: 'white'}}
              
              onClick = {() => {
              history.push({
                pathname: '/developer/test/questions',
                state: {id:item.TestID,type:"test", name: item.TestName},
              });
            }}>{Language.pages_profile_doagain}</Button>
          </List.Item>
        )}
      />
      </ConfigProvider>
      
    </div>
  );
};

export default connect(({ accountAndcenter }) => ({
  list: accountAndcenter.list,
  info: accountAndcenter.info,
}))(Test);
