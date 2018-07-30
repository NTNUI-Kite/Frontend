import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Button from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import EditView from '../../components/board/EditView';
import Loader from '../../components/baseComponents/Loader';
import Notifier from '../../components/baseComponents/Notifier';

import BoardStore from '../../stores/BoardStore';
import BoardActions from '../../actions/BoardActions';


const createDate = (mysqlDate) => {
  const dateParts = mysqlDate.split('-');
  dateParts[2] = dateParts[2].split('T')[0];
  const d = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], 0, 0, 0);
  return new Date(d);
};

const dateToSQL = (date) => {
  const newDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString();
  return newDate;
};

class EditBlogContainer extends Component {
  constructor() {
    super();

    this.state = {
      hasRecievedData: false,
      showSnackbar: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentWillMount() {
    BoardStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    BoardActions.getPost(this.props.match.params.postId);
  }

  componentWillReceiveProps(nextProps) {
    BoardActions.getPost(nextProps.match.params.postId);
    this.setState({
      hasRecievedData: false,
    });
  }

  componentWillUnmount() {
    BoardStore.removeChangeListener(this.onChange);
  }

  onChange() {
    const postList = BoardStore.getPost();
    const post = postList[0];
    const blocksFromHtml = htmlToDraft(post.abstract);
    const content = ContentState.createFromBlockArray(blocksFromHtml);
    const editorState = EditorState.createWithContent(content);

    const body = {
      id: post.id,
      title: post.title,
      abstract: post.abstract,
      date: createDate(post.date),
      editorState,
      hasRecievedData: true,
    };

    this.setState(body);
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleDateChange(event, date) {
    const newDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    this.setState({
      date: newDate,
    });
  }

  saveChanges() {
    const rawState = convertToRaw(this.state.editorState.getCurrentContent());
    const markup = draftToHtml(rawState);

    const body = {
      id: this.state.id,
      title: this.state.title,
      abstract: markup,
      date: this.state.date,
    };
    BoardActions.updateEvent(body);
    this.setState({
      showSnackbar: true,
      originalCapacity: this.state.capacity,
    });
  }

  handleRequestClose() {
    this.setState({
      showSnackbar: false,
    });
  }

  render() {
    if (!this.state.hasRecievedData) {
      return (<Loader />);
    }
    return (
      <div>
        <Paper className="fieldContainer">
          <TextField className="fieldItem" name="title" floatingLabelText="Tittel" defaultValue={this.state.title} onChange={this.handleChange} />
          <DatePicker className="fieldItem" name="date" floatingLabelText="Dato" mode="landscape" value={this.state.date} onChange={this.handleDateChange} />
        </Paper>
        <Paper className="editContainer">
          <EditView
            editorState={this.state.editorState}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Paper>
        <Button className="saveButton" label="Lagre endringer" onClick={this.saveChanges} />
        <Notifier open={this.state.showSnackbar} onRequestClose={this.handleRequestClose} />
      </div>
    );
  }
}

EditBlogContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string,
    }),
  }).isRequired,
};

export default EditBlogContainer;
