import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import {
  Typography,
  ConfigProvider,
  Card,
  List,
  Row,
  Col,
  Divider,
  Checkbox,
  Button,
  Tag,
} from 'antd';
import './style.less';
import Language from '@/locales/index';
import { SearchOutlined } from '@ant-design/icons';
const { Title } = Typography;
const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <SearchOutlined style={{ fontSize: '64px' }} />
    <p>
      {Language.pages_search_noResult}
      <br /> {Language.pages_search_maybe}
    </p>
  </div>
);
class SearchResult extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div style={{ padding: ' 24px 24px 0px 24px' }}>
          <Typography.Title level={3}>
            {Language.pages_search_searchResult} "{this.props.search.keyword}"
          </Typography.Title>
          <Typography.Text type="secondary">
            {Language.pages_search_about} {this.props.search.filterList.length} {Language.pages_search_result}
          </Typography.Text>
        </div>
        <Divider></Divider>
        <Row>
          <Col className="gutter-row" span={17}>
            <ConfigProvider renderEmpty={customizeRenderEmpty}>
              <List
                className="custom"
                loading={this.props.loading}
                style={{ margin: '0px 0px 10px 10px' }}
                itemLayout="horizontal"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 6,
                }}
                dataSource={this.props.search.filterList}
                renderItem={(item) => (
                  <Card bordered size="small" hoverable style={{ marginBottom: '12px' }}>
                    <List.Item
                      onClick={() => {
                        item.IsPractice
                          ? history.push({
                              pathname: '/developer/practice/questions',
                              state: {
                                id: item.ID,
                                type: 'practice',
                                listName: item._Set.concat(" Programming Set")
                                
                              },
                            })
                          : history.push({
                              pathname: '/developer/test/questions',
                              state: { id: item.ID, name: item.Name, type:"test" },
                            });
                      }}
                      style={{
                        // backgroundColor: 'white',
                        // margin: '10px 5px 10px 20px',
                        padding: '5px 20px 5px 10px',
                        // borderRadius: '5px',
                      }}
                    >
                      <Row style={{ width: '100%' }} justify="start" align="middle">
                        <Col xs={{ span: 24 }} md={{ span: 10 }}>
                          <List.Item.Meta
                            title={item.Name}
                            description={
                              <div>
                                <Typography.Text
                                  strong
                                  style={
                                    item.DifficultLevel === 'Easy'
                                      ? { color: 'green' }
                                      : item.DifficultLevel === 'Medium'
                                      ? { color: '#ed7e0c' }
                                      : { color: 'red' }
                                  }
                                >
                                  {item.DifficultLevel}
                                </Typography.Text>
                                {', ' + item.Type + ', ' + item.Score}
                                <br></br>
                                {item.BriefDescription}
                              </div>
                            }
                          />
                        </Col>
                        <Col xs={{ span: 14 }} md={{ span: 8 }} lg={{ span: 10 }}>
                          <Tag
                            style={{ marginBottom: '12px' }}
                            color={
                              item._Set?.includes('Java')
                                ? 'green'
                                : item._Set?.includes('JavaScript')
                                ? 'orange'
                                : 'blue'
                            }
                          >
                            {item.IsPractice ? item._Set : JSON.parse(item._Set)}
                          </Tag>
                          <br />
                          {item.IsPractice ? (
                            <Tag color="#467ab8">{Language.pages_welcome_practice}</Tag>
                          ) : (
                            <Tag color="#27a3c8">{Language.pages_welcome_test}</Tag>
                          )}
                        </Col>
                        <Col>
                          {item.isSolve && (
                            <Button size="large" style={{ width: '100px' }}>
                              {Language.pages_practice_list_solved}
                            </Button>
                          )}
                          {!item.isSolve && (
                            <Button size="large" style={{ width: '100px' }} type="primary">
                              {' '}
                              {Language.pages_search_start}{' '}
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </List.Item>
                  </Card>
                )}
              />
            </ConfigProvider>
          </Col>
          <Col className="gutter-row" span={1}></Col>
          <Col className="gutter-row" span={6} style={{ margin: '30px 0px 10px 0px' }}>
            <Title level={4}>{Language.pages_practice_list_status}</Title>
            <Checkbox
              onChange={() => {
                this.props.dispatch({ type: 'search/updateFilter', payload: 'solved' });
              }}
            >
              {Language.pages_practice_list_solved}
            </Checkbox>
            <br></br>
            <Checkbox
              onChange={() => {
                this.props.dispatch({ type: 'search/updateFilter', payload: 'unsolved' });
              }}
            >
              {Language.pages_practice_list_unsolved}
            </Checkbox>
            <Divider />
            <Title level={4}>{Language.pages_practice_list_difficulty}</Title>
            <Checkbox
              onChange={() => {
                this.props.dispatch({ type: 'search/updateFilter', payload: 'easy' });
              }}
            >
              {Language.pages_practice_list_easy}
            </Checkbox>
            <br></br>
            <Checkbox
              onChange={() => {
                this.props.dispatch({ type: 'search/updateFilter', payload: 'medium' });
              }}
            >
              {Language.pages_practice_list_medium}
            </Checkbox>
            <br></br>
            <Checkbox
              onChange={() => {
                this.props.dispatch({ type: 'search/updateFilter', payload: 'hard' });
              }}
            >
              {Language.pages_practice_list_hard}
            </Checkbox>
            <Divider />
            <Title level={4}>{Language.pages_practice_list_type}</Title>
            <Checkbox
              onChange={() => {
                this.props.dispatch({ type: 'search/updateFilter', payload: 'multiple' });
              }}
            >
              {Language.pages_practice_list_multipleChoice}
            </Checkbox>
            <br></br>
            <Checkbox
              onChange={() => {
                this.props.dispatch({ type: 'search/updateFilter', payload: 'code' });
              }}
            >
              {Language.pages_practice_list_coding}
            </Checkbox>
            <Divider />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(({ search, loading }) => ({
  search,
  loading: loading.effects['search/getSearchList'],
}))(SearchResult);
