import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { resetApp } from '../actions';

class Login extends Component {

  handleReset() {
    this.props.resetApp();
  }


  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Enter Password</label>
            <input />
          </Form.Field>
          <Button>Submit</Button>
          <Button onClick={this.handleReset.bind(this)}>Reset App</Button>
        </Form>
      </div>
    );
  }
}

export default connect(null, { resetApp })(Login);
