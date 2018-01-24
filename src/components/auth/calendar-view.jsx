import React, { Component } from 'react';
import { Grid, Container, Button, Segment, Icon } from 'semantic-ui-react';
import Calendar from './calendar';

export default class CalendarView extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = { year: 2018, month: 1, day: 1 };
  }
  componentDidMount() {
    var d = new Date();
    this.setState({
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDate()
    });
  }

  render() {
    return (
      <Container>
        <Segment>
          <Button fluid secondary>
            <Icon name="add to calendar" />
            Add new Entry
          </Button>
        </Segment>
        <Grid stackable>
          <Grid.Column width={5} floated="left">
            <Calendar
              year={this.state.year}
              month={this.state.month}
              day={this.state.day}
              />
            <Segment>

            </Segment>
          </Grid.Column>

          <Grid.Column width={11}>
            <Segment>

            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
