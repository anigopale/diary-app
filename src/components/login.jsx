import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Item } from 'semantic-ui-react';
import { resetApp, login } from '../actions';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { uterm: "", pterm: "" };
  }

  handleLogin() {
    this.props.login(this.state.uterm);
  }

  handleReset() {
    this.props.resetApp();
  }

  renderComponents() {
    if(this.props.user) {
      return(
        <div>
          <Form.Field>
            <label>Enter Password</label>
            <input onChange={(event) => this.setState({ pterm: event.target.value })} value={this.state.pterm} type="password" />
          </Form.Field>
          <Form.Field>
            <Button fluid>Submit</Button>
          </Form.Field>
        </div>
      )
    }

    return (
      <div>
        <Form.Field>
          <label>Enter Username</label>
          <input onChange={(event) => this.setState({ uterm: event.target.value })} />
        </Form.Field>
        <Form.Field>
          <Button onClick={this.handleLogin.bind(this)} fluid>Submit</Button>
        </Form.Field>
        <Form.Field>
          <Button onClick={this.handleReset.bind(this)} fluid>Reset App</Button>
        </Form.Field>
      </div>
    )
  }

  render() {
    return (
      <Grid container centered>
        <Grid.Row stretched>
        <Grid.Column width={9}>
          <Form>
            {this.renderComponents()}
          </Form>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          New User? <Link to='/signup'>Sign up!</Link>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProps({ user }) {
  return { user }
}

export default connect(mapStateToProps, { login })(Login);
