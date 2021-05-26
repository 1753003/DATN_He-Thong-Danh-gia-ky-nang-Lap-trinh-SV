import { StarTwoTone, LikeOutlined, MessageFilled } from '@ant-design/icons';
import { List, Tag, Radio, Row, Col } from 'antd';
import React, { useState } from 'react';
import { connect } from 'umi';
import TestListContent from '../TestListContent';
import styles from './index.less';
import '../../../../../components/GlobalHeader/style.less';
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
          <Radio.Button value="All">All</Radio.Button>
        </Radio.Group>

        <Radio.Group className={styles.rdGroup} onChange={onFilterChange} value={filter1}>
          <Radio.Button value="Pass">Passed</Radio.Button>
          <Radio.Button value="Fail">Failed</Radio.Button>
        </Radio.Group>

        <Radio.Group className={styles.rdGroup} onChange={onFilterChange} value={filter2}>
          <Radio.Button value="Public">Public</Radio.Button>
          <Radio.Button value="Private">Private</Radio.Button>
        </Radio.Group>
      </Row>

      <List
        size="large"
        className={`${styles.articleList} custom`}
        rowKey="id"
        pagination={{
          pageSize: 3,
        }}
        itemLayout="vertical"
        dataSource={testList}
        renderItem={(item) => (
          <List.Item key={item.TestID}>
            <List.Item.Meta
              title={<a className={styles.listItemMetaTitle}>{item.TestName}</a>}
              description={
                <span>
                  <Tag color="green">{item.DifficultLevel}</Tag>
                  {renderTestSet(JSON.parse(item.LanguageAllowed))}
                </span>
              }
            />
            <TestListContent data={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default connect(({ accountAndcenter }) => ({
  list: accountAndcenter.list,
  info: accountAndcenter.info,
}))(Test);
