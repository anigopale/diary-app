import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Item } from 'semantic-ui-react';
import { resetApp, login, password } from '../actions';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { uterm: "", pterm: "" };
  }
  componentDidMount() {
    if(this.props.loggedin)
      this.props.history.push('/');
  }
  componentDidUpdate() {
    if(this.props.loggedin)
      this.props.history.push('/');
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
          Hi {this.props.user}!
          <Form.Field>
            <label>Enter Password</label>
            <input onChange={(event) => this.setState({ pterm: event.target.value })} value={this.state.pterm} type="password" />
          </Form.Field>
          <Form.Field>
            <Button onClick={()=>{this.props.password(this.props.user, this.state.pterm)}} fluid>Submit</Button>
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
    console.log(this.props);
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

function mapStateToProps({ user, loggedin }) {
  return { user, loggedin };
}

export default connect(mapStateToProps, { login, password })(Login);
