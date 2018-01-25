import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Grid, Form, Button, Divider } from 'semantic-ui-react';
import { putEntry, deleteDate } from '../../actions';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", date: "" };
  }

  handleFormSubmit() {
    if(this.props.date.format) {
      this.props.putEntry(this.props.date.format, this.state.text);
    }
    else {
      this.props.putEntry(this.state.date, this.state.text)
    }
  }

  renderDate() {
    if(this.props.date.format) {
      return (
        <p>
          <h3 onClick={() => {
              this.setState({ date: this.props.date.format })
              this.props.deleteDate()
            }}>
            {this.props.date.display}
          </h3>
          (click to edit)
        </p>
      );
    }
    return (
      <Form.Field>
        <input
          placeholder="ex: 2010-12-31 4:30 PM"
          value={this.state.date}
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
                  <Button onClick={this.handleFormSubmit.bind(this)} secondary>Save</Button>
                  <Button onClick={() => {this.setState({ text: "" })}}>Clear</Button>
                </Form.Field>

                {this.renderDate()}

                <Form.Field>
                  <textarea onChange={(event) => {this.setState({ text: event.target.value })}} value={this.state.text} />
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

export default connect(mapStateToProps, { putEntry, deleteDate })(Editor);
