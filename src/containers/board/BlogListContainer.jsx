import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Button from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';

// import EventStore from '../../stores/EventStore';
import BoardActions from '../../actions/BoardActions';
import BoardStore from '../../stores/BoardStore';
import BlogActions from '../../actions/BlogActions';
import BlogStore from '../../stores/BlogStore';

const createDate = (mysqlDate) => {
  const dateParts = mysqlDate.split('-');
  return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
};

const toggleStyle = {
  width: '100px',
};

class BlogListContainer extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onNewPostClick = this.onNewPostClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onViewClick = this.onViewClick.bind(this);
  }

  componentWillMount() {
    BlogStore.addChangeListener(this.onChange);
  }


  componentDidMount() {
    BlogActions.getPosts();
  }

  componentWillUnmount() {
    BlogStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      posts: BlogStore.getPosts(),
    });
  }

  onEditClick(id) {
    this.props.history.push(`/board/postById/${id}`);
  }

  onViewClick(id) {
    this.props.history.push(`/board/event/${id}`);
  }

  onNewPostClick() {
    BoardActions.addNewPost()
      .then((res) => {
        this.props.history.push(`/board/postById/${res.id}`);
      });
  }

  render() {
    return (
      <Paper className="baseContainer">
        <Button label="Lag ny bloggpost" onClick={this.onNewPostClick} />
        <Table
          selectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Tittel</TableHeaderColumn>
              <TableHeaderColumn>Opprettet</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {
              this.state.posts.map(posts => (
                <TableRow key={posts.id}>
                  <TableRowColumn>{posts.title}</TableRowColumn>
                  <TableRowColumn>{createDate(posts.date).toDateString()}</TableRowColumn>
                  <TableRowColumn>
                    {/* <Link to={'/board/editEvent/' + event.id}>Edit</Link> */}
                    <Button label="Edit" onClick={() => this.onEditClick(posts.id)} />
                  </TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

BlogListContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(BlogListContainer);
