import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button } from 'semantic-ui-react';
import { fetchData } from '../../actions';

class ExportCal extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  exportCal() {
    let ical_begin = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//DiaryApp//\n`
    let ical_end = `END:VCALENDAR`;
    let ical_events = '';
    this.props.data.map((d) => {
      let date = moment(d.time, 'x').format('YYYYMMDD');
      let time = moment(d.time, 'x').format('HHmmss');
      let dtstamp = `${date}T${time}Z`;
      ical_events = ical_events + `BEGIN:VEVENT\nUID:${localStorage.getItem('user')}\nDTSTAMP:${dtstamp}\nSUMMARY:${d.note}\nEND:VEVENT\n`;
    });
    console.log(`${ical_begin}${ical_events}${ical_end}`);
  }

  render() {
    return (
      <div>
        <h2>Export Calendar</h2>
        <p>
          Export your Diary data
        </p>
        <Button
          onClick={this.exportCal.bind(this)}
          primary
          >
          Export
        </Button>
      </div>
    )
  }
}

function mapStateToProps({ data }) {
  return { data };
}

export default connect(mapStateToProps, { fetchData })(ExportCal);
