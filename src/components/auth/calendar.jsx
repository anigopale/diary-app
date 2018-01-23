import React, { Component } from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import calendar from 'calendar-js';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cal: calendar().of(this.props.year, this.props.month).calendar,
      month: calendar().of(this.props.year, this.props.month).month,
      year: this.props.year
    }
  }

  month = calendar().of(this.props.year, this.props.month).month;
  cal = calendar().of(this.props.year, this.props.month).calendar;

  renderWeek(week) {
    return week.map((d) => {
      if(d === 0) return <Grid.Column></Grid.Column>
      if(d === 16) return <Grid.Column><Header as="h2" color="green">{d}</Header></Grid.Column>
      return <Grid.Column onClick={()=>this.setState({selected: d})}><Header as='h2' color="grey">{d}</Header></Grid.Column>
    })
  }

  renderMonth() {
    return this.cal.map((week) => {
      return (
        <div>
          <Grid horizontal >
            {this.renderWeek(week)}
          </Grid>
          <br />
        </div>
      )
    })
  }

  render() {
    console.log(calendar().of(2018, 2));
    console.log(this.props.year);
    return(
      <div>
        <Segment>
          <Header as="h2">
            {`${this.state.month} ${this.state.year}`}
          </Header>
          {this.renderMonth()}
        </Segment>
      </div>
    )
  }
}
