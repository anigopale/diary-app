import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Button } from 'semantic-ui-react';
import marked from 'marked';
import { fetchData, showSelectedEntry } from '../../actions';

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
        <h2>{this.props.selected_data.date}</h2>
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
          {data.date}
        </Segment>
      )
    })
  }

  render() {
    return (
      <div>
        <h2>
          {this.props.date.display}
        </h2>
        {this.renderEntries()}
      </div>
    )
  }
}

function mapStateToProps({ data, selected_data, date }) {
  console.log(selected_data);
  return { data, selected_data, date };
}

export default connect(mapStateToProps, { fetchData, showSelectedEntry })(ShowEntries);
