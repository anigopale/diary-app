import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Search extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <Button>Back</Button>
        </Link>
      </div>
    )
  }
}

export default connect(null)(Search);
