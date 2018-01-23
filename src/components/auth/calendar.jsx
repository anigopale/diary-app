import React, { Component } from 'react';
import { Table, Grid, Segment, Header, Icon } from 'semantic-ui-react';
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

  week = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

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


  renderDays(week) {
    return week.map((d) => {
      if(d === 0) return <Table.Cell> </Table.Cell>
      if(d === this.props.day
        && this.state.year === this.state.today.y
        && this.state.month === this.state.today.m )
        return <Table.Cell><Header color="blue">{d}</Header></Table.Cell>
      return <Table.Cell onClick={()=>this.setState({selected: d})}>{d}</Table.Cell>
    })
  }

  renderMonth() {
    return this.state.cal.map((week) => {
      return (
          <Table.Row>
            {this.renderDays(week)}
          </Table.Row>
      )
    })
  }

  renderWeek() {
    return this.week.map((day) => {
      return <Table.HeaderCell>{day}</Table.HeaderCell>
    })
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

          <Table celled>
            <Table.Header>
              <Table.Row>
                {this.renderWeek()}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.renderMonth()}
            </Table.Body>
          </Table>
        </Segment>
      </div>
    )
  }
}
