import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Button, Divider } from 'semantic-ui-react';
import marked from 'marked';
import { fetchData, showSelectedEntry, deleteDate } from '../../actions';

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
        <Button onClick={() => {this.setState({ selected: false })}}>Back</Button>
        <h2>{this.props.selected_data.date}, {this.props.selected_data.time}</h2>
        <p
          dangerouslySetInnerHTML={this.markUp(this.props.selected_data.note)}
          />

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
    if(this.props.date.format) {
      return this.props.data.map(data => {
        if(this.props.date.format === data.dateOnly) {
          return <Segment color="black"
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
          onClick={() => {
            this.props.showSelectedEntry(data)
            this.setState({ selected: true })
          }}
          >
          {data.dateOnly}, {data.timeOnly}
        </Segment>
      )
    })
  }

  renderHead() {
    if(!this.props.date.display) {
      return <h2>Your Entries</h2>
    }
    return (
      <div>
        <h2>
          {this.props.date.display}
        </h2>
        <Button color="black" onClick={() => {this.props.deleteDate()}}>Show all</Button>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderHead()}
        <Divider />
        {this.renderEntries()}
      </div>
    )
  }
}

function mapStateToProps({ data, selected_data, date }) {
  return { data, selected_data, date };
}

export default connect(mapStateToProps, { fetchData, showSelectedEntry, deleteDate })(ShowEntries);
