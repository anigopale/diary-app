import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Segment, Container, Grid, Form, Button, Divider } from 'semantic-ui-react';
import marked from 'marked';
import moment from 'moment';
import { putEntry, deleteDate } from '../../actions';
import Calendar from './calendar';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", date: "", year: 2018, month: 1, day: 1, height: window.innerHeight };
  }

  componentDidMount() {
    if(this.props.selected_data.id) {
      this.setState({
        text: this.props.selected_data.note,
        date: this.props.selected_data.date
      });
    }
    var d = new Date();
    this.setState({
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDate()
    });
  }

  handleFormSubmit() {
    if(this.props.selected_data.id) {
      this.props.putEntry(this.state.date, this.state.text, this.props.selected_data.id);
      return;
    }
    if(this.props.date.format) {
      this.props.putEntry(this.props.date.format, this.state.text);
    }
    else {
      this.props.putEntry(this.state.date, this.state.text)
    }
  }

  markUp() {
    let date;
    if(this.props.date.format) {
      date = marked(`${moment(this.props.date.format, 'YYYY-MM-DD hh:mm:ss a').format('Do MMM YYYY, hh:mm A')}`, {sanitize: true})
    }
    else {
      date = marked(`${moment(this.state.date, 'YYYY-MM-DD hh:mm:ss a').format('Do MMM YYYY, hh:mm A')}`, {sanitize: true})
    }

    let text = marked(this.state.text, {sanitize: true});
    return {
      __html: date+text
    };
  }

  renderDate() {
    if(this.props.date.format) {
      return (
        <p>
          <p onClick={() => {
              this.setState({ date: this.props.date.format })
              this.props.deleteDate()
            }}>
            {this.props.date.display}
          </p>
          (click to edit)
        </p>
      );
    }
    return (
      <Form.Field>
        <input
          placeholder="ex: 2010-12-31 4:30 PM"
          value={this.state.date}
          onChange={(event) => {this.setState({ date: event.target.value })}}
          />
      </Form.Field>
    )
  }

  renderPreview() {
    return <div dangerouslySetInnerHTML={this.markUp()} />
  }

  render() {
    return (
        <Grid>
          <Grid.Column width={4} color="black" style={{ minHeight: this.state.height }} stretched>
            <Calendar
              year={this.state.year}
              month={this.state.month - 1}
              day={this.state.day}
              />
          </Grid.Column>
          <Grid.Column width={12}>
            <Divider hidden />
            <Grid stackable columns={2}>
              <Grid.Column>
                <Segment basic>
                  <Form>
                    <Form.Field>
                      <Button onClick={this.handleFormSubmit.bind(this)} secondary>Save</Button>
                      <Button onClick={() => {this.setState({ text: "" })}}>Clear</Button>
                      <Link to="/">
                        <Button floated="right" secondary>Cancel</Button>
                      </Link>
                    </Form.Field>

                    {this.renderDate()}

                    <Form.Field>
                      <textarea onChange={(event) => {this.setState({ text: event.target.value })}} value={this.state.text} />
                    </Form.Field>
                  </Form>
                </Segment>
              </Grid.Column>

              <Grid.Column>
                <h2>Preview</h2>
                <Divider />
                {this.renderPreview()}
              </Grid.Column>


            </Grid>
          </Grid.Column>
        </Grid>

    )
  }
}

function mapStateToProps({ date, selected_data }) {
  return { date, selected_data };
}

export default connect(mapStateToProps, { putEntry, deleteDate })(Editor);
