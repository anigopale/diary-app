import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Button, Divider, Icon, Card } from 'semantic-ui-react';
import marked from 'marked';
import { fetchData, showSelectedEntry, deleteFilter, setEditorData, removeSelected } from '../../actions';

class ShowEntries extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData();
  }


  renderEntries() {
    if(!this.props.data) {
      return <h1>No entries found</h1>
    }
    if(this.props.date_filter.format) {
      return this.props.data.map(data => {
        if(this.props.date_filter.format === data.dateOnly) {
          return <Card
            style={{ cursor: "pointer" }}
            onClick={() => {
              this.props.showSelectedEntry(data)
            }}
            >
            <Card.Content header={data.timeOnly} />
            <Card.Content description={data.note.substring(0, 50)+'...'} />
          </Card>
        }
      })
    }

    return this.props.data.map((data) => {
      return (
        <Card
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
      )
    })
  }

  renderHead() {
    if(!this.props.date_filter.display) {
      return (
        <div>
          <Divider />
        </div>
      )
    }
    return (
      <div>
        <h2>
          {this.props.date_filter.display}
        </h2>
        <Button
          onClick={() => {
            this.props.deleteFilter()
          }}>
          Show all
        </Button>
        <Divider />
      </div>
    )
  }


  render() {
    return (
      <div>
        {this.renderHead()}
        <Card.Group>
          {this.renderEntries()}
        </Card.Group>
      </div>
    )
  }
}

function mapStateToProps({ data, selected_data, date_filter }) {
  return { data, selected_data, date_filter };
}

export default connect(mapStateToProps, { fetchData, showSelectedEntry, deleteFilter, setEditorData, removeSelected })(ShowEntries);
