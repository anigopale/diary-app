import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

export default class Login extends Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Enter Password</label>
            <input />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }
}
