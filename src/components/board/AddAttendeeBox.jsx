import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import Button from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import AutoComplete from 'material-ui/AutoComplete';

class AddAttendeeBox extends Component {
  constructor() {
    super();
    this.state = {
      memberList: [{id: -1, name: "None"}],
      comment: '',
      hasCar: false,
      dataSourceConfig: {
        text: 'name',
        value: 'id',
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.addAttendee = this.addAttendee.bind(this);
    this.toggleCar = this.toggleCar.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const attendeeIds = [];
    nextProps.attendeeList.map(attendee => attendeeIds.push(attendee.user_id));
    const memberList = nextProps.memberList.filter(member => !(attendeeIds.includes(member.id)));
    this.setState({
      memberList,
    });
  }

  handleNameChange(event, index, value) {
    this.setState({ value });
  }

  addAttendee() {
    this.props.addAttendee(
      this.state.selectedUser,
      this.props.eventId,
      this.state.comment,
      this.state.hasCar
    );
    this.props.toggle();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  toggleCar() {
    this.setState({
      hasCar: !this.state.hasCar,
    });
  }

  onSelectUser = (selectedUser) => {
    this.setState({
      selectedUser,
    })
  }

  render() {
    const actions = [
      <Button key={1} label="Cancel" onClick={this.props.toggle} />,
      <Button key={0} label="Add" primary keyboardFocused onClick={this.addAttendee} disabled={(this.state.selectedUser === undefined)}/>,
    ];
    return (
      <Dialog
        title="Add user"
        open={this.props.open}
        onRequestClose={this.handleClose}
        actions={actions}
      >
        <div className="attendeeBoxItem">
          <AutoComplete
            dataSource={this.state.memberList}
            dataSourceConfig={{text:"name", value:"id"}}
            filter={AutoComplete.caseInsensitiveFilter}
            onNewRequest={this.onSelectUser}
          />
          {/* <SelectField
            floatingLabelText="Select user to add"
            value={this.state.value}
            onChange={this.handleNameChange}
          >
            {
              this.state.memberList.map(member => (
                <MenuItem key={member.id} value={member.id} primaryText={member.name} />
              ))
            }

          </SelectField> */}
        </div>
        <div className="attendeeBoxItem">
          <TextField
            key={this.state.userInfo}
            name="comment"
            hintText="Allergies etc."
            floatingLabelText="Comment"
            defaultValue={this.state.comment}
            onChange={this.handleChange}
            multiLine
          />
        </div>
        <Checkbox
          label="Has car"
          checked={this.state.hasCar}
          onCheck={this.toggleCar}
        />
      </Dialog>
    );
  }
}


AddAttendeeBox.propTypes = {
  eventId: PropTypes.number,
  memberList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  attendeeList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  addAttendee: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

AddAttendeeBox.defaultProps = {
  eventId: -1,
};

export default AddAttendeeBox;
