import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Button } from 'semantic-ui-react';
import { fetchData, showSelectedEntry } from '../../actions';

class ShowEntries extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: false, data: {} }
  }

  componentDidMount() {
    this.props.fetchData();
  }

  showEntry() {
    return (
      <Container>
        <Button onClick={() => {this.setState({ selected: false })}}>Back</Button>
        <h2>{this.state.data.date}</h2>
        <p>{this.state.data.note}</p>
      </Container>
    )
  }

  renderEntries() {
    if(!this.props.data) {
      return <h1>No entries found</h1>
    }
    return this.props.data.map((data) => {
      return (
        <Segment color="black" onClick={this.props.showSelectedEntry(data)}>
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
