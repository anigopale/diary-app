import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Grid, Segment, Header, Icon, Button } from 'semantic-ui-react';
import calendar from 'calendar-js';
import { setSelectedDate, filterEntries } from '../../actions';

class Calendar extends Component {
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
      },
      selected: 0
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

  renderDay(d) {
    if(d === this.props.day
        && this.state.year === this.state.today.y
        && this.state.month === this.state.today.m )
          return (
              <Header color="teal" as="h3" content={d} />
          )

      if(this.props.calendar.includes(`${this.state.year} ${this.state.month + 1} ${d}`)) {
        return <Header color="green" as="h4" icon="calendar" />
      }

    return <Header as="h4" content={d} color="grey" />
  }

  renderDays(week) {
    return week.map((d, i) => {
      if(d)
      {
        return (
          <Table.Cell
            key={i}
            onClick={() => {
              this.setState({ selected: d })
              this.props.filterEntries(d, this.state.month + 1, this.state.year)
            }}
            active={d === this.state.selected}
            style={{ cursor: "pointer" }}
            >
            {this.renderDay(d)}
          </Table.Cell>
        )
      }
      return <Table.Cell key={i}></Table.Cell>
    })
  }

  renderMonth() {
    return this.state.cal.map((week, i) => {
      return (
          <Table.Row key={i}>
            {this.renderDays(week)}
          </Table.Row>
      )
    })
  }

  renderWeek() {
    return this.week.map((day, i) => {
      return <Table.HeaderCell key={i}>{day}</Table.HeaderCell>
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
            <Table.HeaderCell onClick={this.downYear.bind(this)} style={{ cursor: "pointer" }}>
              <Icon name="chevron left" />
            </Table.HeaderCell>

            <Table.HeaderCell>
              {this.state.year}
            </Table.HeaderCell>

            <Table.HeaderCell onClick={this.upYear.bind(this)} style={{ cursor: "pointer" }}>
              <Icon name="chevron right" />
            </Table.HeaderCell>
          </Table.Row>

          <Table.Row>
            <Table.HeaderCell onClick={this.downMonth.bind(this)} style={{ cursor: "pointer" }}>
              <Icon name="chevron left" />
            </Table.HeaderCell>

            <Table.HeaderCell>
              {this.state.monthStr}
            </Table.HeaderCell>

            <Table.HeaderCell onClick={this.upMonth.bind(this)} style={{ cursor: "pointer" }}>
              <Icon name="chevron right" />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>

    )
  }


  render() {
    return(
      <div>
        <Segment textAlign="center">

          {this.renderCalendarHead()}
          <Button fluid color="black"
            disabled={this.state.selected === 0}
            onClick={() => {
              this.props.setSelectedDate(this.state.selected, this.state.month + 1, this.state.year)
            }}
            >
            <Icon name="add to calendar" />
            Add
          </Button>
          {this.renderCalendarBody()}



        </Segment>
      </div>
    )
  }
}

function mapStateToProps({ calendar }) {
  return { calendar };
}


export default connect(mapStateToProps, { setSelectedDate, filterEntries })(Calendar);
