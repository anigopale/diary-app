import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Grid, Form, Button, Divider } from 'semantic-ui-react';
import moment from 'moment';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "", date: "" };
  }

  renderDate() {
    if(this.props.date.format) {
      return (
        <h3>
          {this.props.date.format}
        </h3>
      );
    }
    return (
      <Form.Field>
        <input
          placeholder="ex: 2010-12-31 4:30 PM"
          onChange={(event) => {this.setState({ datetime: event.target.value })}}
          />
      </Form.Field>
    )
  }

  render() {
    return (
      <Container>
        <Segment>
          <Grid stackable>
            <Grid.Column>

              <Form>
                <Form.Field>
                  <Button>Save</Button>
                  <Button>Clear</Button>
                </Form.Field>

                {this.renderDate()}

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

function mapStateToProps({ date }) {
  return { date };
}

export default connect(mapStateToProps)(Editor);
