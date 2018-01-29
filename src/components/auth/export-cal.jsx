import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class ExportCal extends Component {
  render() {
    return (
      <div>
        <h2>Export Calendar</h2>
        <p>
          Export your Diary data
        </p>
        <Button
          onClick={() => {this.props.deleteAccount()}}
          primary
          >
          Export
        </Button>
      </div>
    )
  }
}
