import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import BoardActions from '../../actions/BoardActions';

class EditUserDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.userInfo.name,
      phone: props.userInfo.phone, // TODO: replace this
      email: props.userInfo.email,
      title: props.userInfo.title,
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.cancelDialog = this.cancelDialog.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.userInfo.name,
      phone: nextProps.userInfo.phone,
      email: nextProps.userInfo.email,
      title: nextProps.userInfo.title,
    });
  }

  updateUser() {
    const userObject = {
      id: this.props.userInfo.id,
      facebook_id: this.props.userInfo.facebook_id,
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      title: this.state.title,
    };

    const newMember =  Object.assign({}, userObject);

    if (newMember.board_member || (newMember.board_member === 1)) {
      newMember.board_member = false;
    } else {
      newMember.board_member = true;
    }

    BoardActions.updateMember(newMember);
    this.props.toggle();
  }

  cancelDialog() {
    this.setState({
      name: this.props.userInfo.name,
      phone: this.props.userInfo.phone, // TODO: replace this
      email: this.props.userInfo.email,
      title: this.props.userInfo.title,
    });
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
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={this.updateUser}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Member profile"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            name="name"
            hintText="Name"
            floatingLabelText="Name"
            defaultValue={this.state.name}
            onChange={this.handleChange}
          />
          <TextField
            name="phone"
            hintText="Phone-number"
            floatingLabelText="Phone-number"
            defaultValue={this.state.phone}
            onChange={this.handleChange}
          />
          <TextField
            name="email"
            hintText="Email"
            floatingLabelText="Email"
            defaultValue={this.state.email}
            onChange={this.handleChange}
          />
          <TextField
            name="title"
            hintText="Rolle"
            floatingLabelText="Rolle"
            defaultValue={this.state.title}
            onChange={this.handleChange}
          />
        </Dialog>
      </div>
    );
  }
}

EditUserDialog.propTypes = {
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    facebook_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    title: PropTypes.string,
  }).isRequired,
};

export default EditUserDialog;
