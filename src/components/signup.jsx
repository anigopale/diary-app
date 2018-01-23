import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { createUserDB } from '../actions';

class Signup extends Component {
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

  handleSignup() {
    this.props.createUserDB(this.state.uterm, this.state.pterm);
  }

  render() {
    return (
      <Grid container centered>
        <Grid.Row stretched>
        <Grid.Column width={9}>
          <Form>
            <Form.Field>
              <label>Enter a Username</label>
              <input onChange={(event) => this.setState({ uterm: event.target.value })} />
            </Form.Field>
            <Form.Field>
              <label>Enter a Password</label>
              <input onChange={(event) => this.setState({ pterm: event.target.value })} type="password" />
            </Form.Field>
            <Form.Field>
              <Button onClick={this.handleSignup.bind(this)} fluid>Submit</Button>
            </Form.Field>
          </Form>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProps({ loggedin }) {
  return { loggedin }
}

export default connect(mapStateToProps, { createUserDB })(Signup);
