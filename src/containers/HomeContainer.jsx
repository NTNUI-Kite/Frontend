import React, { Component } from 'react';

import BlogContainer from './BlogContainer';
import EventPreviews from '../components/EventPreviews';


import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';

class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      events: [],
    };

    this.onEventChange = this.onEventChange.bind(this);
  }

  componentWillMount() {
    EventStore.addChangeListener(this.onEventChange);
  }

  componentDidMount() {
    EventActions.getEvents();
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.onEventChange);
  }

  onEventChange() {
    this.setState({
      events: EventStore.getEvents(),
    });
  }

  render() {
    return (
      <div className="homeContainer">
        <EventPreviews events={this.state.events} />
        {/* {
          this.renderWidget()
        } */}
        <div className="homeBlog">
          <BlogContainer />
        </div>
      </div>
    );
  }
}

export default HomeContainer;
