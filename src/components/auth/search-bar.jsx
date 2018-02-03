import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { search } from '../../actions';

class SearchBar extends Component {
  render() {
    return (
      <Input icon="search" onChange={(e) =>{this.props.search(e.target.value)}} />
    )
  }
}

export default connect(null, { search })(SearchBar);
