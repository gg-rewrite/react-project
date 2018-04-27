import React from 'react';
import ReactDOM from 'react-dom';

import store from "./store/store.js";
import Root from "./containers/Root.jsx";

ReactDOM.render( <Root store={store}/>,
	document.getElementById('app'));

