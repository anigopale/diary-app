import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteAccount } from '../../actions';
import { Button } from 'semantic-ui-react';

class DeleteAcc extends Component {
  render() {
    return (
      <div>
        <h2>Delete Account</h2>
        <p>
          Sorry to see you here. Want to delete your account?? Click Delete Account Button.
        </p>
        <Button
          onClick={() => {this.props.deleteAccount()}}
          color="red"
          >
          Delete Account
        </Button>
      </div>
    )
  }
}

export default connect(null, { deleteAccount })(DeleteAcc);
