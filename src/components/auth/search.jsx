import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { showSelectedEntry } from '../../actions';

class Search extends Component {
  state = { selected: false };

  renderResults() {
    let results = _.filter(this.props.data,(data) => {
      return data.note.indexOf(this.props.search_term)>-1;
    });
    if(results.length === 0) {
      return <h1>no results found</h1>
    }
    return results.map((data) => {
      return <Card
        style={{ cursor: "pointer" }}
        onClick={() => {
          this.props.showSelectedEntry(data)
        }}
        header={`${data.dateDisplay}, ${data.timeOnly}`}
        description={data.note.substring(0, 40)}
        >
        <Card.Content header={data.dateDisplay} meta={data.timeOnly} />
        <Card.Content description={data.note.substring(0, 50)+'...'} />
      </Card>
    })
  }

  render() {
    return (
      <div>
        <Link to="/">
          <Button>Back</Button>
        </Link>
        <Divider />
        <Card.Group>
          {this.renderResults()}
        </Card.Group>
      </div>
    )
  }
}

function mapStateToProps({ search_term, data }) {
  return { search_term, data };
}

export default connect(mapStateToProps, { showSelectedEntry })(Search);
