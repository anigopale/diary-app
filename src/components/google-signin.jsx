/*global gapi */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { createUserDB } from '../actions';

class GoogleSignin extends Component {
  constructor(props) {
    super(props);
    this.googleSignin = this.googleSignin.bind(this);
    this.googleSignout = this.googleSignout.bind(this);
    this.googleDisconnect = this.googleDisconnect.bind(this);
  }

  googleSignin() {
    console.log("running signin method");
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

  }
  googleSignout() {
    var GoogleAuth;
    GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.signOut();
  }
  googleDisconnect() {
    var GoogleAuth;
    GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.disconnect();
  }

  render() {
    return (
      <div>
      <Button color='google plus' onClick={this.googleSignin}>
        <Icon name='google plus' />Sign in with Google
       </Button>
       <Button color='google plus' onClick={this.googleSignout}>
         <Icon name='google plus' />SignOut
        </Button>
        <Button color='google plus' onClick={this.googleDisconnect}>
          <Icon name='google plus' />UnAuthorize
         </Button>
       </div>
    )
  }
}

export default connect(null, { createUserDB })(GoogleSignin);
