import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Button, Divider, Icon, Card } from 'semantic-ui-react';
import marked from 'marked';
import { fetchData, showSelectedEntry, deleteFilter, setEditorData, removeSelected } from '../../actions';

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
    if(this.props.date_filter.format) {
      return this.props.data.map(data => {
        if(this.props.date_filter.format === data.dateOnly) {
          return <Card
            style={{ cursor: "pointer" }}
            onClick={() => {
              this.props.showSelectedEntry(data)
              this.setState({ selected: true })
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
    if(!this.state.selected) {
      if(!this.props.date_filter.display) {
        return (
          <div>
            <h2>All Entries</h2>
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
              this.setState({ selected: false })
            }}>
            Show all
          </Button>
          <Divider />
        </div>
      )
    }
  }

  renderData() {
    if(this.state.selected) {
      return <div>
        {this.renderEntries()}
      </div>
    }
    return (
      <Card.Group>
        {this.renderEntries()}
      </Card.Group>
    )
  }

  render() {
    return (
      <div>
        {this.renderHead()}
        {this.renderData()}
      </div>
    )
  }
}

function mapStateToProps({ data, selected_data, date_filter }) {
  return { data, selected_data, date_filter };
}

export default connect(mapStateToProps, { fetchData, showSelectedEntry, deleteFilter, setEditorData, removeSelected })(ShowEntries);
