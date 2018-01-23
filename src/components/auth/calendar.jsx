import React, { Component } from 'react';
import { Grid, Segment, Header, Icon } from 'semantic-ui-react';
import calendar from 'calendar-js';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cal: calendar().of(this.props.year, this.props.month).calendar,
      monthStr: calendar().of(this.props.year, this.props.month).month,
      month: this.props.month,
      year: this.props.year,
      today: {
        m: this.props.month,
        y: this.props.year,
        d: this.props.day
      }
    }
  }

  month = calendar().of(this.props.year, this.props.month).month;
  cal = calendar().of(this.props.year, this.props.month).calendar;

  renderWeek(week) {
    return week.map((d) => {
      if(d === 0) return <Grid.Column></Grid.Column>
      if(d === this.props.day
        && this.state.year === this.state.today.y
        && this.state.month === this.state.today.m )
        return <Grid.Column><Header color="blue">{d}</Header></Grid.Column>
      return <Grid.Column onClick={()=>this.setState({selected: d})}>{d}</Grid.Column>
    })
  }

  renderMonth() {
    return this.state.cal.map((week) => {
      return (
        <div>
          <Grid horizontal textAlign="center">
            {this.renderWeek(week)}
          </Grid>
          <br />
        </div>
      )
    })
  }

  upYear() {
    this.setState({
      cal: calendar().of(this.state.year + 1, this.state.month).calendar,
      monthStr: calendar().of(this.state.year + 1, this.state.month).month,
      month: this.state.month,
      year: this.state.year + 1
    });
  }
  downYear() {
    this.setState({
      cal: calendar().of(this.state.year - 1, this.state.month).calendar,
      monthStr: calendar().of(this.state.year - 1, this.state.month).month,
      month: this.state.month,
      year: this.state.year - 1
    });
  }
  upMonth() {
    if(this.state.month === 11) {
      this.upYear();
      this.setState({
        cal: calendar().of(this.state.year + 1, 0).calendar,
        monthStr: calendar().of(this.state.year + 1, 0).month,
        month: 0,
        year: this.state.year + 1
      });
    }
    else {
      this.setState({
        cal: calendar().of(this.state.year, this.state.month + 1).calendar,
        monthStr: calendar().of(this.state.year, this.state.month + 1).month,
        month: this.state.month + 1,
        year: this.state.year
      });
    }
  }
  downMonth() {
    if(this.state.month === 0) {
      this.downYear();
      this.setState({
        cal: calendar().of(this.state.year - 1, 11).calendar,
        monthStr: calendar().of(this.state.year - 1, 11).month,
        month: 11,
        year: this.state.year - 1
      });
    }
    else {
      this.setState({
        cal: calendar().of(this.state.year, this.state.month - 1).calendar,
        monthStr: calendar().of(this.state.year, this.state.month - 1).month,
        month: this.state.month - 1,
        year: this.state.year
      });
    }
  }

  render() {
    console.log(calendar().of(2018, 2));
    console.log(this.props.year);
    return(
      <div>
        <Segment textAlign="center">

          <h2>
            <Icon name="chevron left" onClick={this.downYear.bind(this)} />
            {this.state.year}
            <Icon name="chevron right" onClick={this.upYear.bind(this)} />
          </h2>

          <h2>
            <Icon name="chevron left" onClick={this.downMonth.bind(this)} />
            {this.state.monthStr}
            <Icon name="chevron right" onClick={this.upMonth.bind(this)} />
          </h2>

          {this.renderMonth()}
        </Segment>
      </div>
    )
  }
}
