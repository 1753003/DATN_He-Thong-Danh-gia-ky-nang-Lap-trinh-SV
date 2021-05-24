import React from 'react';
import { connect } from 'dva';
import { getPageQuery } from '@/utils/utils';
import { history } from 'umi';
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
import "./style.less"
import Language from '@/locales/index';
const { Title, Text } = Typography;
class SearchResult extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.search)
    return (
      <div>
        <h1>{Language.pages_search_searchResult}</h1>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={18}>
            <List className="custom"
              loading={this.props.loading}
              style={{ margin: '30px 0px 10px 10px' }}
              itemLayout="horizontal"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 6,
              }}
              dataSource={this.props.search.filterList}
              renderItem={(item) => (
                <List.Item
                  onClick={() => {
                    console.log(item.ID)
                    item.IsPractice ?
                    history.push(
                      '/developer/practice/questions?listName=' +
                        encodeURIComponent(decodeURIComponent(item._Set)) +
                        '&id='+ item.ID,
                    )
                    :
                    history.push(
                      '/developer/test/questions?listName=' +
                        encodeURIComponent(decodeURIComponent(item._Set)) +
                        `&id=${item.ID}`,
                    )
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
                   {item.isSolve && <Button size='large' style={{width:'100px'}}>{Language.pages_practice_list_solved}</Button>}
              {!item.isSolve && <Button size='large' style={{width:'100px'}} type="primary">  {Language.pages_search_start}  </Button>}
                </List.Item>
              )}
            />
          </Col>
          <Col className="gutter-row" span={6} style={{ margin: '30px 0px 10px 0px' }}>
            <Title level={4}>{Language.pages_practice_list_status}</Title>
            <Checkbox onChange={()=>{this.props.dispatch({type:'search/updateFilter',payload: 'solved'})}}>{Language.pages_practice_list_solved}</Checkbox>
            <br></br>
            <Checkbox onChange={()=>{this.props.dispatch({type:'search/updateFilter',payload: 'unsolved'})}}>{Language.pages_practice_list_unsolved}</Checkbox>
            <Divider />
            <Title level={4}>{Language.pages_practice_list_difficulty}</Title>
            <Checkbox onChange={()=>{this.props.dispatch({type:'search/updateFilter',payload: 'easy'})}}>{Language.pages_practice_list_easy}</Checkbox>
            <br></br>
            <Checkbox onChange={()=>{this.props.dispatch({type:'search/updateFilter',payload: 'medium'})}}>{Language.pages_practice_list_medium}</Checkbox>
            <br></br>
            <Checkbox onChange={()=>{this.props.dispatch({type:'search/updateFilter',payload: 'hard'})}}>{Language.pages_practice_list_hard}</Checkbox>
            <Divider />
            <Title level={4}>{Language.pages_practice_list_type}</Title>
            <Checkbox onChange={()=>{this.props.dispatch({type:'search/updateFilter',payload: 'multiple'})}}>{Language.pages_practice_list_multipleChoice}</Checkbox>
            <br></br>
            <Checkbox onChange={()=>{this.props.dispatch({type:'search/updateFilter',payload: 'code'})}}>{Language.pages_practice_list_coding}</Checkbox>
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
