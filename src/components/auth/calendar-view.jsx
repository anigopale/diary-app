import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Container, Sidebar, Button, Segment, Icon, Pusher, Divider } from 'semantic-ui-react';
import { Link, Switch, Route } from 'react-router-dom';
import Calendar from './calendar';
import ShowEntries from './show-entries';
import Search from './search';
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
          <Grid.Column width={4} id='custom-color-1'>
            <Calendar
              year={this.state.year}
              month={this.state.month}
              day={this.state.day}
              />
          </Grid.Column>

          <Grid.Column width={12} style={{ minHeight: this.state.height }}>
            <Segment basic>
              <Divider hidden />
                <Button fluid onClick={()=>{this.props.setNowDate()}} color="blue">
                  <Icon name="add to calendar" />
                  Add new Entry
                </Button>
                <Divider hidden />
                <Switch>
                  <Route exact path="/" component={ShowEntries} />
                  <Route path="/search" component={Search} />
                </Switch>
            </Segment>
          </Grid.Column>
        </Grid>

    )
  }
}

export default connect(null, { setNowDate })(CalendarView);
