import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { uterm: "", pterm: "" };
  }

  handleSignup() {

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
              <input onChange={(event) => this.setState({ pterm: event.target.value })} />
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

export default connect(null)(Signup);
