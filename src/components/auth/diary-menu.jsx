import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Sidebar, Segment, Button, Icon, Responsive, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions';
import history from '../../actions/history';

class Dmenu extends Component {



  renderMobileItems() {

    return [
      <Link to='/' key={1}>
        <Menu.Item
          >
          <Icon name="home" />Home
        </Menu.Item>
      </Link>,

        <Menu.Item
          key={3}
          position="right"
          >

            <Dropdown text={localStorage.getItem('user')} icon='user' floating labeled button className='icon'>
              <Dropdown.Menu>
                <Dropdown.Item icon="settings" text="Settings" onClick={() => {history.push('/settings')}} />
                <Dropdown.Item onClick={() => {this.props.logout()}} icon="log out" text="Logout" />
              </Dropdown.Menu>
            </Dropdown>

        </Menu.Item>
    ];

  }

  renderDesktopItems() {

    return [
      <Link to='/' key={1}>
        <Menu.Item
          >
          <Icon name="home" />Home
        </Menu.Item>
      </Link>,

      <Menu.Item
          key={3}
          position="right"
          >

            <Dropdown text={localStorage.getItem('user')} icon='user' floating labeled button className='icon'>
              <Dropdown.Menu>
                <Dropdown.Item icon="settings" text="Settings" onClick={() => {history.push('/settings')}} />
                <Dropdown.Item onClick={() => {this.props.logout()}} icon="log out" text="Logout" />
              </Dropdown.Menu>
            </Dropdown>

        </Menu.Item>
    ];

  };





  render() {
    return (
      <div>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Menu inverted vertical={this.props.vertical}>
            {this.renderDesktopItems()}
          </Menu>
        </Responsive>

        <Responsive {...Responsive.onlyMobile}>
          <Menu inverted vertical={this.props.vertical}>
            {this.renderMobileItems()}
          </Menu>
        </Responsive>

      </div>
    )
  }
}

export default connect(null, { logout })(Dmenu);
