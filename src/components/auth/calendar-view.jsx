import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
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
      <Grid>
        <Grid.Column width={6}>
        <Calendar
          year={this.state.year}
          month={this.state.month}
          day={this.state.day}
          />
        </Grid.Column>
      </Grid>
    )
  }
}
