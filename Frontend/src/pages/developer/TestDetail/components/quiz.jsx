import React from 'react';
import { Checkbox} from 'antd';

const CheckboxGroup = Checkbox.Group;
export default class Quiz extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: this.props.value,
        options: this.props.options
      }
    }

    onChangeAnswer = (checkedValues) => {
      this.props.onChangeAnswer(checkedValues);
    }

    render() {
        return (
            <>
              <CheckboxGroup
                options={this.state.options}
                onChange={this.onChangeAnswer}
                defaultValue={this.state.value}
              
              ></CheckboxGroup>
              
            </>
        )
    }
}