/*global gapi */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

export default class GoogleSignin extends Component {
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
    var user = GoogleAuth.currentUser.get();
    console.log(user);
    console.log(user.getId());
    var basicProfile = user.getBasicProfile();
    console.log(basicProfile.getEmail());
    var s = GoogleAuth.isSignedIn.get();
    console.log(s);
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
