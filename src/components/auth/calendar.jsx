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

  week = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ];

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
      if(d)
      {
        if(d === this.props.day
        && this.state.year === this.state.today.y
        && this.state.month === this.state.today.m )
          return <Table.Cell active><Header>{d}</Header></Table.Cell>

        return <Table.Cell>{d}</Table.Cell>
      }
      return <Table.Cell></Table.Cell>
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

  renderCalendarBody() {
    return (
      <Table celled color="black" unstackable fixed>
        <Table.Header>
          <Table.Row>
            {this.renderWeek()}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.renderMonth()}
        </Table.Body>
      </Table>
    )
  }

  renderCalendarHead() {
    return (
      <Table celled color="black" textAlign="center" unstackable fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={this.downYear.bind(this)}>
              <Icon name="chevron left" />
            </Table.HeaderCell>

            <Table.HeaderCell>
              {this.state.year}
            </Table.HeaderCell>

            <Table.HeaderCell onClick={this.upYear.bind(this)}>
              <Icon name="chevron right" />
            </Table.HeaderCell>
          </Table.Row>

          <Table.Row>
            <Table.HeaderCell onClick={this.downMonth.bind(this)}>
              <Icon name="chevron left" />
            </Table.HeaderCell>

            <Table.HeaderCell>
              {this.state.monthStr}
            </Table.HeaderCell>

            <Table.HeaderCell onClick={this.upMonth.bind(this)}>
              <Icon name="chevron right" />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>

    )
  }


  render() {
    console.log(calendar().of(2018, 2));
    console.log(this.props.year);
    return(
      <div>
        <Segment textAlign="center">

          {this.renderCalendarHead()}

          {this.renderCalendarBody()}
        </Segment>
      </div>
    )
  }
}
