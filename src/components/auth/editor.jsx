import React, { Component } from 'react';
import { Segment, Container, Grid, Form, Button } from 'semantic-ui-react';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
  }


  render() {
    return (
      <Container>
        <Segment>
          <Grid Stackable>
            <Grid.Column>
              <Button>Save</Button>
              <Button>Clear</Button>
              <Form>
                <Form.Field>
                  <input placeholder="yyyy-mm-dd hh mm a" />
                </Form.Field>
                <Form.Field>
                  <textarea onChange={(event) => {this.setState({ text: event.target.value })}} />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    )
  }
}
