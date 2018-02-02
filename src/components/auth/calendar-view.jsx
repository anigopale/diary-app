import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Container, Sidebar, Button, Segment, Icon, Pusher, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Calendar from './calendar';
import ShowEntries from './show-entries';
import { setNowDate } from '../../actions';

class CalendarView extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = { year: 2018, month: 1, day: 1, height: window.innerHeight};
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

        <Grid stackable>
          <Grid.Column width={4} color="black" style={{ minHeight: this.state.height }} stretched>
            <Calendar
              year={this.state.year}
              month={this.state.month}
              day={this.state.day}
              />
          </Grid.Column>

          <Grid.Column width={12}>
            <Segment basic>
              <Divider hidden />
                <Button fluid secondary onClick={()=>{this.props.setNowDate()}}>
                  <Icon name="add to calendar" />
                  Add new Entry
                </Button>
                <Divider hidden />
              <ShowEntries />
            </Segment>
          </Grid.Column>
        </Grid>

    )
  }
}

export default connect(null, { setNowDate })(CalendarView);
