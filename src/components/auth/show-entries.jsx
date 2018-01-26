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
        {this.renderEntries()}
      </div>
    )
  }
}

function mapStateToProps({ data, selected_data }) {
  return { data, selected_data };
}

export default connect(mapStateToProps, { fetchData, showSelectedEntry })(ShowEntries);
