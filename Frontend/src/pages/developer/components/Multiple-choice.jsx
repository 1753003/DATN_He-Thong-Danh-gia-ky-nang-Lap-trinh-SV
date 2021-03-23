import React from 'react';
import { Radio, Typography } from 'antd';


const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const Multiplechoice = ({question, option1, option2, option3, option4, onChange}) => (
    <div>
      <Typography.Text>{question}</Typography.Text>
      <Radio.Group onChange={onChange} value={value}>
        <Radio style={radioStyle} value={1}>
          {option1}
        </Radio>
        <Radio style={radioStyle} value={2}>
          {option2}
        </Radio>
        <Radio style={radioStyle} value={3}>
          {option3}
        </Radio>
        <Radio style={radioStyle} value={4}>
          {option4}
        </Radio>
      </Radio.Group>
    </div>
);

export default Multiplechoice;
