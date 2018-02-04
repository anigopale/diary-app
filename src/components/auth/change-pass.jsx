import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePass } from '../../actions';
import { Form, Button } from 'semantic-ui-react';

class ChangePass extends Component {
  state = { term: "" };

  renderComponent() {
    if(!this.props.google_auth) {
      return (
        <div>
          <h2>Change Password</h2>
          <Form>
            <Form.Field>
              <label>Enter new password:</label>
              <input onChange={(event)=>{this.setState({ term: event.target.value })}} type="password" />
            </Form.Field>
            <Button onClick={()=>{this.props.changePass(this.state.term)}} primary>Change</Button>
          </Form>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderComponent()}
      </div>
    )
  }
}

function mapStateToProps({ google_auth }) {
  return { google_auth }
}

export default connect(mapStateToProps, { changePass })(ChangePass);
