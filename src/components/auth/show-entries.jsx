import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { fetchData } from '../../actions';

class ShowEntries extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: false }
  }

  componentDidMount() {
    this.props.fetchData();
  }

  renderEntries() {
    if(!this.props.data) {
      return <h1>No entries found</h1>
    }
    return this.props.data.map((data) => {
      return (
        <Segment>
          {data.date}
        </Segment>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderEntries()}
      </div>
    )
  }
}

function mapStateToProps({ data }) {
  return { data };
}

export default connect(mapStateToProps, { fetchData })(ShowEntries);
