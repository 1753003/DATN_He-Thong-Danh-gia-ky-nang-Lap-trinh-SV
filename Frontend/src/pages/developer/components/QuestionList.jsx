import React from 'react';
import { Card, List, Typography, Tabs } from 'antd';


const QuestionList = ({onclick, listQuestion}) => (
<List
    grid={{
      gutter: 16,
      column: 4
    }}
    dataSource={listQuestion}
    renderItem={item => (
      <List.Item>
        <Typography.Link >{item.num}</Typography.Link>
      </List.Item>
    )}
  />
    
);

export default QuestionList;
