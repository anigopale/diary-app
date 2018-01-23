import React, { Component } from 'react';
import Calendar from './calendar';

export default class CalendarView extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = { year: 2018, month: 1, day: 1 };
  }
  componentDidMount() {
    var d = new Date();
    this.setState({ year: d.getFullYear() });
  }

  render() {
    return (
      <div>
        <Calendar year={this.state.year} month={8} day={1} />
      </div>
    )
  }
}
