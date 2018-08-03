import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import AuthActions from '../actions/AuthActions';
import Notifier from './baseComponents/Notifier';

class DeleteUserDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSnackbar: false,
    };

    this.deleteUser = this.deleteUser.bind(this);
    this.cancelDialog = this.cancelDialog.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {

  }

  deleteUser() {
    const userObject = {
      id: this.props.userInfo.id,
      facebook_id: this.props.userInfo.facebook_id,
      name: this.props.userInfo.name,
      phone: this.props.userInfo.phone,
      email: this.props.userInfo.email,
    };

    AuthActions.deleteUser(userObject);
    this.props.toggle();

    this.setState({
      showSnackbar: true,
    });

  }

  handleRequestClose() {
    this.setState({
      showSnackbar: false,
    });
  }

  cancelDialog() {
    this.props.toggle();
  }

  render() {
    const actions = [
      <FlatButton
        key={0}
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onClick={this.cancelDialog}
      />,
      <FlatButton
        key={1}
        label="Delete"
        primary={true}
        keyboardFocused={false}
        onClick={this.deleteUser}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Delete profile"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
        >
            <p id="alert-dialog-description">
              By pressing delete you will send a request that will delete all your data within 30 days.
            </p>
            <p id="alert-dialog-description">
              Are you sure you want to delete all your data?
            </p>
        </Dialog>
        <Notifier open={this.state.showSnackbar} onRequestClose={this.handleRequestClose} />
      </div>
    );
  }
}

DeleteUserDialog.propTypes = {
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    facebook_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeleteUserDialog;
