import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { resetApp, userLogin } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
  }

  handleLogin() {
    this.props.userLogin(this.state.term);
  }

  handleReset() {
    this.props.resetApp();
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Enter Password</label>
            <input onChange={(event) => this.setState({ term: event.target.value })} />
          </Form.Field>
          <Button onClick={this.handleLogin.bind(this)}>Submit</Button>
          <Button onClick={this.handleReset.bind(this)}>Reset App</Button>
        </Form>
      </div>
    );
  }
}

export default connect(null, { resetApp, userLogin })(Login);
