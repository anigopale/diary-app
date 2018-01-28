import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Button, Divider } from 'semantic-ui-react';
import marked from 'marked';
import { fetchData, showSelectedEntry, deleteFilter, deleteEntry, setEditorData, removeSelected } from '../../actions';

class ShowEntries extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: false }
  }

  componentDidMount() {
    this.props.fetchData();
  }


  markUp(note) {

    let text = marked(note, {sanitize: true});
    return {
      __html: text
    };
  }

  showEntry() {
    return (
      <Container text>
        <Button
          onClick={() => {
            this.setState({ selected: false })
          }}>
          Back
        </Button>
        <Button.Group floated='right'>
          <Button onClick={() => {
              this.props.setEditorData(this.props.selected_data.date)
            }}>
            Edit
          </Button>
          <Button.Or />
          <Button
            onClick={() => {
              this.props.deleteEntry(this.props.selected_data.id)
              this.props.fetchData()
              this.setState({ selected: false })
            }}>
            Delete
          </Button>
        </Button.Group>
        <h4>{this.props.selected_data.dateDisplay}, {this.props.selected_data.time}</h4>
        <Divider />
        <Segment basic style={{ minHeight: 270 }}>
        <p
          dangerouslySetInnerHTML={this.markUp(this.props.selected_data.note)}
          />
        </Segment>
      </Container>
    )
  }

  renderEntries() {
    if(!this.props.data) {
      return <h1>No entries found</h1>
    }
    if(this.state.selected) {
      return this.showEntry();
    }
    if(this.props.date_filter.format) {
      return this.props.data.map(data => {
        if(this.props.date_filter.format === data.dateOnly) {
          return <Segment color="black"
            style={{ cursor: "pointer" }}
            onClick={() => {
              this.props.showSelectedEntry(data)
              this.setState({ selected: true })
            }}
            >
            {data.timeOnly}
          </Segment>
        }
      })
    }

    return this.props.data.map((data) => {
      return (
        <Segment color="black"
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.props.showSelectedEntry(data)
            this.setState({ selected: true })
          }}
          >
          {data.dateDisplay}, {data.timeOnly}
        </Segment>
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
            color="black"
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

  render() {
    return (
      <div>
        {this.renderHead()}
        {this.renderEntries()}
      </div>
    )
  }
}

function mapStateToProps({ data, selected_data, date_filter }) {
  return { data, selected_data, date_filter };
}

export default connect(mapStateToProps, { fetchData, showSelectedEntry, deleteFilter, deleteEntry, setEditorData, removeSelected })(ShowEntries);
