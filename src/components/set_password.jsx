import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPass } from '../actions';

class SetPass extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  onSubmit() {
    this.props.setPass(this.state.term);
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Set Password</label>
            <input onChange={(event) => this.setState({ term: event.target.value})} />
          </Form.Field>
          <Button onClick={this.onSubmit.bind(this)}>Submit</Button>
        </Form>
      </div>
    );
  }
}


export default connect(null, { setPass })(SetPass);
