import React from 'react';
import { connect } from 'dva';
import { getPageQuery } from '@/utils/utils';
import {
    Typography,
    Card,
    List,
    PageHeader, Row, Col,
    Divider,
    Checkbox,
    Button,
    Tag
  } from 'antd';
const { Title, Text } = Typography;
class SearchResult extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.search.list)
    return (
      <div>
        <h1>Search result</h1>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={18}>
            <List
              style={{ margin: '30px 0px 10px 10px' }}
              itemLayout="horizontal"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 6,
              }}
              dataSource={this.props.search.list}
              renderItem={(item) => (
                <List.Item
                  onClick={() => {
                    history.push(
                      '/developer/practice/questions?listName=' +
                        encodeURIComponent(decodeURIComponent(location.query.listName)) +
                        `&id=${item.PracticeID}`,
                    );
                  }}
                  style={{
                    backgroundColor: 'white',
                    margin: '10px 5px 10px 20px',
                    padding: '5px 20px 5px 10px',
                    borderRadius: '5px',
                  }}
                >
                  <List.Item.Meta
                    title={
                      <Row>
                        <Col span={12}>{item.Name}</Col>
                        <Col span={12}>
                        <Tag color="magenta">{item._Set}</Tag>
                        {item.IsPractice ? <Tag color="green">Practice</Tag>
                                          : <Tag color="green">Test</Tag>}
                        </Col>
                      </Row>
                    }
                    description={
                      <div>
                        {item.DifficultLevel +
                          ',' +
                          item.Type +
                          ',' 
                          + item.Score
                        } 
                        <br></br> 
                        {item.BriefDescription}
                      </div>
                    }
                  />
                   {item.isSolve && <Button size='large' style={{width:'100px'}}>Solved</Button>}
              {!item.isSolve && <Button size='large' style={{width:'100px'}} type="primary">  Start  </Button>}
                </List.Item>
              )}
            />
          </Col>
          <Col className="gutter-row" span={6} style={{ margin: '30px 0px 10px 0px' }}>
            <Title level={4}>STATUS</Title>
            <Checkbox onChange={()=>{}}>Solved</Checkbox>
            <br></br>
            <Checkbox onChange={()=>{}}>Unsolved</Checkbox>
            <Divider />
            <Title level={4}>DIFICULTY</Title>
            <Checkbox onChange={()=>{}}>Easy</Checkbox>
            <br></br>
            <Checkbox onChange={()=>{}}>Medium</Checkbox>
            <br></br>
            <Checkbox onChange={()=>{}}>Hard</Checkbox>
            <Divider />
            <Title level={4}>TYPE</Title>
            <Checkbox onChange={()=>{}}>Multiple-choice</Checkbox>
            <br></br>
            <Checkbox onChange={()=>{}}>Coding</Checkbox>
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
