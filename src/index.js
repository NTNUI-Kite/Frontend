import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import RouteContainer from './containers/RouteContainer';
import './css/grid.css';
import './css/board.css';
import './css/loader.css';
import './css/navbar.css';
import './css/style.css';
import './css/editor.css';
import './css/pages/homePage.css';
import './css/pages/profilePage.css';
import './css/pages/singleEventPage.css';

const App = () => <RouteContainer />;

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, app);
registerServiceWorker();
