import React, { Component } from 'react';
import {
  Container,
  Segment,
  Header,
  Button,
  Divider
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Landing extends Component {
  render() {
    return (
      <div>
        <Segment
          inverted
          textAlign="center"
          vertical
          style={{ minHeight: 400, padding: '1em 0em' }}
          >

          <Container>
            <Container text>
                <Header
                  as='h1'
                  content='Diary App'
                  inverted
                  style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '1.5em' }}
                />
              <Divider inverted white />
              <Divider hidden />

              <Segment inverted>
                <Button.Group>
                  <Link to='/login'>
                    <Button basic color="white" inverted>Login</Button>
                   </Link>
                  <Button.Or />
                   <Link to='/signup'>
                     <Button basic color="white" inverted>Sign Up</Button>
                   </Link>
                 </Button.Group>
                 <Divider hidden />
               </Segment>

            </Container>
          </Container>

        </Segment>
        <Divider hidden />
        <Container
          textAlign="center"
          >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          <Divider hidden />

          <Link to='/reset'>
            <Button color="red">Reset App</Button>
          </Link>
        </Container>

      </div>
    )
  }
}
