import React, { Component } from 'react';
import { Segment, Button, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import marked from 'marked';
import { setEditorData, deleteEntry, fetchData } from '../../actions';

class ShowEntry extends Component {

  markUp(note) {
    if(!note) {
      return
    }

    let text = marked(note, {sanitize: true});
    return {
      __html: text
    };
  }

  render() {
    return (
      <Segment basic>
      <Container>
        <Link to="/">
          <Button>Back</Button>
        </Link>
        <Button.Group floated='right'>
          <Button onClick={() => {
              this.props.setEditorData(this.props.selected_data.date)
            }}>
            Edit
          </Button>
          <Button.Or />
          <Button
            color="red"
            onClick={() => {
              this.props.deleteEntry(this.props.selected_data.id)
              this.props.fetchData()
            }}>
            Delete
          </Button>
        </Button.Group>
        <h4>{this.props.selected_data.dateDisplay}, {this.props.selected_data.time}</h4>
        <Divider />
        <Segment basic style={{ minHeight: 270 }}>
          <Container text>
            <p
              dangerouslySetInnerHTML={this.markUp(this.props.selected_data.note)}
              />
          </Container>
        </Segment>
      </Container>
      </Segment>
    )
  }
}

function mapStateToProps({ selected_data }) {
  return { selected_data };
}

export default connect(mapStateToProps, { setEditorData, deleteEntry, fetchData })(ShowEntry);
