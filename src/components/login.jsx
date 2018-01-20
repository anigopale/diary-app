import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Item } from 'semantic-ui-react';
import { resetApp, userLogin } from '../actions';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { uterm: "", pterm: "" };
  }

  handleLogin() {
    this.props.userLogin(this.state.pterm);
  }

  handleReset() {
    this.props.resetApp();
  }

  render() {
    return (
      <Grid container centered>
        <Grid.Row stretched>
        <Grid.Column width={9}>
          <Form>
            <Form.Field>
              <label>Enter Username</label>
              <input onChange={(event) => this.setState({ uterm: event.target.value })} />
            </Form.Field>
            <Form.Field>
              <label>Enter Password</label>
              <input onChange={(event) => this.setState({ pterm: event.target.value })} />
            </Form.Field>
            <Form.Field>
              <Button onClick={this.handleLogin.bind(this)} fluid>Submit</Button>
            </Form.Field>
            <Form.Field>
              <Button onClick={this.handleReset.bind(this)} fluid>Reset App</Button>
            </Form.Field>
          </Form>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          New User? Sign up!
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(null, { resetApp, userLogin })(Login);
