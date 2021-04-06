import React from 'react';
import styles from './index.less';
import { List, Button, Checkbox, Typography, Row, Col, Divider , Card} from 'antd';


const { Title, Text } = Typography;

const data = [
  {
    title: 'Array',
    status: 'Solved',
    dificulty: 'Easy',
    type: 'Coding',
    success: '90%',
    description: 'Leaning......'
  },
  {
    title: 'Type',
    status: 'Unsolved',
    dificulty: 'Hard',
    type: 'multiple-choice',
    success: '40%',
    description: 'Leaning......'
  },
  {
    title: 'Recursion',
    status: 'Solved',
    dificulty: 'Medium',
    type: 'Coding',
    success: '90%',
    description: 'Leaning......'
  },
  {
    title: 'Array',
    status: 'Solved',
    dificulty: 'Easy',
    type: 'Coding',
    success: '90%',
    description: 'Leaning......'
  },
  {
    title: 'Type',
    status: 'Unsolved',
    dificulty: 'Hard',
    type: 'multiple-choice',
    success: '40%',
    description: 'Leaning......'
  },
  {
    title: 'Recursion',
    status: 'Solved',
    dificulty: 'Medium',
    type: 'Coding',
    success: '90%',
    description: 'Leaning......'
  },
  {
    title: 'Array',
    status: 'Solved',
    dificulty: 'Easy',
    type: 'Coding',
    success: '90%',
    description: 'Leaning......'
  },
  {
    title: 'Type',
    status: 'Unsolved',
    dificulty: 'Hard',
    type: 'multiple-choice',
    success: '40%',
    description: 'Leaning......'
  },
  {
    title: 'Recursion',
    status: 'Solved',
    dificulty: 'Medium',
    type: 'Coding',
    success: '90%',
    description: 'Leaning......'
  },
  {
    title: 'Array',
    status: 'Solved',
    dificulty: 'Easy',
    type: 'Coding',
    success: '90%',
    description: 'Leaning......'
  },
  {
    title: 'Type',
    status: 'Unsolved',
    dificulty: 'Hard',
    type: 'multiple-choice',
    success: '40%',
    description: 'Leaning......'
  },
  {
    title: 'Recursion',
    status: 'Solved',
    dificulty: 'Medium',
    type: 'Coding',
    success: '90%',
    description: 'Leaning......'
  },
  
];

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

class SetTest extends React.Component {
  state = { visible: false };

  render() {
    return (
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={18}>
          <List
            style={{margin: '30px 0px 10px 10px'}}
            itemLayout="horizontal"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 6,
            }}
            dataSource={data}
            renderItem={item => (
            <List.Item style={{backgroundColor: 'white', margin: '10px 5px 10px 20px', padding:'5px 20px 5px 10px', borderRadius:'5px'}}>             
              <List.Item.Meta
                title={item.title}
                description={<div> {item.dificulty +','+ item.type +','+ item.success} <br></br>  {item.description}</div>}
              />
              {item.status == 'Solved' && <Button size='large' style={{width:'100px'}}>Solved</Button>}
              {item.status != 'Solved' && <Button size='large' style={{width:'100px'}} type="primary">  Start  </Button>}
            </List.Item>
            )}
          />
        </Col>
        <Col className="gutter-row" span={6} style={{margin: '30px 0px 10px 0px'}}>
        <Title level={4}>STATUS</Title>
        <Checkbox onChange={onChange}>Solved</Checkbox>
        <br></br>
        <Checkbox onChange={onChange}>Unsolved</Checkbox>
        <Divider />
        <Title level={4}>DIFICULTY</Title>
        <Checkbox onChange={onChange}>Easy</Checkbox>
        <br></br>
        <Checkbox onChange={onChange}>Medium</Checkbox>
        <br></br>
        <Checkbox onChange={onChange}>Hard</Checkbox>
        <Divider />
        <Title level={4}>TYPE</Title>
        <Checkbox onChange={onChange}>Multiple-choice</Checkbox>
        <br></br>
        <Checkbox onChange={onChange}>Coding</Checkbox>
        <Divider />
        </Col>
      </Row>
    );
  }
}

export default SetTest;
