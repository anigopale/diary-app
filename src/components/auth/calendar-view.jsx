import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Container, Button, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Calendar from './calendar';
import ShowEntries from './show-entries';
import { setNowDate } from '../../actions';

class CalendarView extends Component {
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

          <Button fluid secondary onClick={()=>{this.props.setNowDate()}}>
            <Icon name="add to calendar" />
            Add new Entry
          </Button>

        </Segment>

        <Grid stackable>
          <Grid.Column width={5} floated="left">
            <Calendar
              year={this.state.year}
              month={this.state.month - 1}
              day={this.state.day}
              />
          </Grid.Column>

          <Grid.Column width={11}>
            <div>
              <ShowEntries />
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default connect(null, { setNowDate })(CalendarView);
