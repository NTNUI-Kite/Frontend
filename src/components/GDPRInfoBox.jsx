import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Delete from 'material-ui/svg-icons/action/delete';
import User from 'material-ui/svg-icons/action/account-circle';
import PropTypes from 'prop-types';
import DeleteUserDialog from '../components/DeleteUserDialog';

class GDPRInfoBox extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({
      showEdit: !this.state.showEdit,
    });
  }

  render() {
    return (
      <Paper className="userInfoBox">
        <Subheader>Privacy</Subheader>
        <List>
          <ListItem disabled primaryText="All information about you is showed on this page." leftIcon={<User />} />
          <ListItem disabled primaryText="You can request deletion by pressing the button below." leftIcon={<Delete />} />
        </List>
        <Button label="Delete me" onClick={this.toggleEdit} />
        <DeleteUserDialog
          toggle={this.toggleEdit}
          open={this.state.showEdit}
          userInfo={this.props.userInfo}
        />
      </Paper>
    );
  }
}

GDPRInfoBox.propTypes = {
  userInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    facebook_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default GDPRInfoBox;
