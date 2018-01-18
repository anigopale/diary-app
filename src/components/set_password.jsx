import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

export default class SetPass extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Set Password</label>
            <input onChange={(event) => this.setState({ term: event.target.value})} />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }
}
