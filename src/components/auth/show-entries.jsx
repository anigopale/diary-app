import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../actions';

class ShowEntries extends Component {

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}



export default connect(null, { fetchData })(ShowEntries);
