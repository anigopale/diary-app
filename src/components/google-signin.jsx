/*global gapi */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { createUserDB } from '../actions';

class GoogleSignin extends Component {
  constructor(props) {
    super(props);
    this.googleSignin = this.googleSignin.bind(this);
  }

  googleSignin() {
    window.gapi.auth2.init()
    .then(() => {
      var GoogleAuth;
      GoogleAuth = window.gapi.auth2.getAuthInstance();
      GoogleAuth.signIn();
      var signedIn = GoogleAuth.isSignedIn.get();
      GoogleAuth.isSignedIn.listen(status => {
        if(status) {
          var user = GoogleAuth.currentUser.get();
          var basicProfile = user.getBasicProfile();
          this.props.createUserDB(basicProfile.getEmail(), user.getId(), true);
        }
      })
      if(signedIn) {
        var user = GoogleAuth.currentUser.get();
        var basicProfile = user.getBasicProfile();
        this.props.createUserDB(basicProfile.getEmail(), user.getId(), true);
      }
    })
  }


  render() {
    return (
      <Button color='google plus' onClick={this.googleSignin}>
        <Icon name='google plus' />Sign in with Google
      </Button>
    )
  }
}

export default connect(null, { createUserDB })(GoogleSignin);
