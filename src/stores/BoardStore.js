import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import BoardConstants from '../constants/BoardConstants';

const CHANGE_EVENT = 'change';

let boardMembers = [];

let members = [];

let events = [];

let event = {};

let post = {};

const setBoardMembers = (newBoardMembers) => {
  boardMembers = newBoardMembers;
};

const setEvents = (newEvents) => {
  events = newEvents;
};

const setEvent = (newEvent) => {
  event = newEvent;
};

const setMembers = (newMembers) => {
  members = newMembers;
};

const setPost = (newPost) => {
  post = newPost;
}

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getBoardMembers", "getEvent", "getEvents", "getPost", "getMembers"] }] */
class BoardStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getBoardMembers() {
    return boardMembers;
  }

  getEvent() {
    return event;
  }

  getEvents() {
    return events;
  }

  getPost() {
    return post;
  }

  getMembers () {
    return members;
  }
}

const BoardStore = new BoardStoreClass();

BoardStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case BoardConstants.RECIEVE_BOARD_MEMBERS:
      setBoardMembers(action.boardMembers);
      BoardStore.emitChange();
      break;

    case BoardConstants.RECIEVE_BOARD_MEMBERS_ERROR:
      BoardStore.emitChange();
      break;

    case BoardConstants.RECIEVE_EVENT:
      setEvent(action.event);
      BoardStore.emitChange();
      break;

    case BoardConstants.RECIEVE_EVENT_ERROR:
      BoardStore.emitChange();
      break;

    case BoardConstants.RECIEVE_EVENTS:
      setEvents(action.events);
      BoardStore.emitChange();
      break;

    case BoardConstants.RECIEVE_EVENTS_ERROR:
      BoardStore.emitChange();
      break;

    case BoardConstants.RECIEVE_POST:
      setPost(action.post);
      BoardStore.emitChange();
      break;

    case BoardConstants.RECIEVE_POST_ERROR:
      BoardStore.emitChange();
      break;

    case BoardConstants.RECIEVE_MEMBERS:
      setMembers(action.members);
      BoardStore.emitChange();
      break;
    case BoardConstants.RECIEVE_MEMBERS_ERROR:
      BoardStore.emitChange();
      break;
    case BoardConstants.UPDATE_MEMBER:
      members = members.map((member) => {
        if (member.id === action.body.id) {
          return action.body;
        }
        return member;
      });
      BoardStore.emitChange();
      break;
    case BoardConstants.UPDATE_EVENT:
      events = events.map((ev) => {
        if (ev.id === action.event.id) {
          return action.event;
        }
        return ev;
      });
      BoardStore.emitChange();
      break;
    case BoardConstants.UPDATE_POST:
      post = post.map((ev) => {
        if (post.id === action.post.id) {
          return action.post;
        }
        return post;
      });
      BoardStore.emitChange();
      break;
    case BoardConstants.REMOVE_ATTENDEE:
      event.signups = event.signups.filter(user => user !== action.user);
      BoardStore.emitChange();
      break;
    case BoardConstants.ADD_ATTENDEE:
      event.signups.push(action.user);
      BoardStore.emitChange();
      break;

    default:
  }
});

export default BoardStore;
