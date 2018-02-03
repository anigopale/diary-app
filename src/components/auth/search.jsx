import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';

class Search extends Component {
  renderResults() {
    var results=_.filter(this.props.data,(entry) => {
      return entry.note.indexOf(this.props.search_term)>-1;
    });
  }

  render() {
    return (
      <div>
        <Link to="/">
          <Button>Back</Button>
        </Link>
        <h2>Results for '{this.props.search_term}'</h2>
        <Divider />
        {this.renderResults()}
      </div>
    )
  }
}

function mapStateToProps({ search_term, data }) {
  return { search_term, data };
}

export default connect(mapStateToProps)(Search);
