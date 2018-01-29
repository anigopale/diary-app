import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { saveAs } from 'file-saver';
import { Button } from 'semantic-ui-react';
import { fetchData } from '../../actions';

class ExportCal extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  exportCal() {
    let ical_begin = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//DiaryApp//\n`
    let ical_end = `END:VCALENDAR`;
    let filename = `${localStorage.getItem('user')}_diary`
    let ical_events = '';
    this.props.data.map((d) => {
      let date = moment(d.time, 'x').format('YYYYMMDD');
      let time = moment(d.time, 'x').format('HHmmss');
      let dtstamp = `${date}T${time}Z`;
      let note = d.note.replace(/(\r\n|\n|\r)/gm," ");
      ical_events = ical_events + `BEGIN:VEVENT\nUID:${localStorage.getItem('user')}\nDTSTAMP:${dtstamp}\nDTSTART:${dtstamp}\nDTEND:${dtstamp}\nSUMMARY:Diary entry\nDESCRIPTION:${note}\nEND:VEVENT\n`;
    });
    let ical = `${ical_begin}${ical_events}${ical_end}`;
    let blob = new Blob([ical], {type: "text/plain"});
    saveAs(blob, `${filename}.ics`);
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
