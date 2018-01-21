import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePass } from '../../actions';
import { Form, Button } from 'semantic-ui-react';

class ChangePass extends Component {
  state = { term: "" };

  render() {
    return (
      <div>
        <h2>Change Password</h2>
        <Form>
          <Form.Field>
            <label>Enter new password:</label>
            <input onChange={(event)=>{this.setState({ term: event.target.value })}} />
          </Form.Field>
          <Button onClick={()=>{this.props.changePass(this.state.term)}}>Change</Button>
        </Form>
      </div>
    )
  }
}

export default connect(null, { changePass })(ChangePass);
