import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetApp } from '../actions';
import { Link } from 'react-router-dom';
import { Container, Segment, Button, Header } from 'semantic-ui-react';

class ResetApp extends Component {
  render() {
    return (
      <Segment
        color="red"
        inverted
        vertical
        style={{ minHeight: 900, padding: '1em 0em' }}
        >
        <Container
          style={{ fontSize: '2em', fontWeight: 'normal', marginBottom: 0, marginTop: '1.5em' }}
          text>
          <Link to="/">
            <Button primary>Back</Button>
          </Link>

          <Header
            as='h1'
            content='Warning!'
            inverted
            style={{ fontSize: '2em', fontWeight: 'normal', marginBottom: 0, marginTop: '1em' }}
          />
          <p>
            Resetting the app will delete all the data
          </p>
          <Button basic inverted onClick={() => {this.props.resetApp()}} color="white">Reset App</Button>
        </Container>
      </Segment>

    )
  }
}

export default connect(null, { resetApp })(ResetApp);
