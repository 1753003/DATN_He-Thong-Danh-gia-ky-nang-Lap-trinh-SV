import { PlusOutlined, HomeOutlined, ContactsOutlined, PhoneOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Input, Row, Tag, Form, Radio } from 'antd';
import React, { Component, useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, connect, useIntl } from 'umi';
import Projects from './components/Projects';
import Practice from './components/Practice';
import Test from './components/Test';
import styles from './Center.less';
import Language from '@/locales/index';
const operationTabList = [
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
          (8)
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
          (8)
        </span>
      </span>
    ),
  },
  
];

const TagList = ({ tags }) => {
  const ref = useRef(null);
  const [newTags, setNewTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const showInput = () => {
    setInputVisible(true);

    if (ref.current) {
      // eslint-disable-next-line no-unused-expressions
      ref.current?.focus();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...newTags];

    if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
      tempsTags = [
        ...tempsTags,
        {
          key: `new-${tempsTags.length}`,
          label: inputValue,
        },
      ];
    }

    setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>{Language.pages_profile_education}</div>
      {/* {(tags || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))} */
      <Tag>Ho Chi Minh University Of Science</Tag>
      }
      {/* {inputVisible && (
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{
            width: 78,
          }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )} */}
      {/* {!inputVisible && (
        <Tag
          onClick={showInput}
          style={{
            borderStyle: 'dashed',
          }}
        >
          <PlusOutlined />
        </Tag>
      )} */}
    </div>
  );
};

class Center extends Component {
  // static getDerivedStateFromProps(
  //   props: accountAndcenterProps,
  //   state: accountAndcenterState,
  // ) {
  //   const { match, location } = props;
  //   const { tabKey } = state;
  //   const path = match && match.path;
  //   const urlTabKey = location.pathname.replace(`${path}/`, '');
  //   if (urlTabKey && urlTabKey !== '/' && tabKey !== urlTabKey) {
  //     return {
  //       tabKey: urlTabKey,
  //     };
  //   }
  //   return null;
  // }
  state = {
    tabKey: 'practice',
  };

  input = undefined;
  componentDidMount() {
    
  }
  
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
    console.log(this.props)
  }
  onTabChange = (key) => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key,
    });
  };

  renderChildrenByTabKey = (tabKey) => {
    if (tabKey === 'projects') {
      return <Projects />;
    }

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
    </div>
  );

  
  render() {
    const { tabKey } = this.state;
    const { currentUser = {}, currentUserLoading, info } = this.props;
    const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    console.log('info: ', info);
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
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
                  <TagList tags={currentUser.tags || []} />
                  <Divider
                    style={{
                      marginTop: 16,
                    }}
                    dashed
                  />
                  <div className={styles.team}>
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
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={tabKey}
              onTabChange={this.onTabChange}
            >
              {this.renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default connect(({ loading, accountAndcenter }) => ({
  currentUser: accountAndcenter.currentUser,
  currentUserLoading: loading.effects['accountAndcenter/fetchCurrent'],
  info: accountAndcenter.info,
}))(Center);
