import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import App from './containers/App.js';

var reducer1 = (state = {}, action) => {

	switch(action.type) {
		case 'ACTION_1':
			return {
				...state,
				message: action.message
			};
		default: return state;
	}

};

const store = createStore((state = {}, action) => {
	switch(action.type) {
		case 'ACTION_1':
			return {
				...state,
				message: action.message
			};
		default: return state;
	}

});

render( 
	<Provider store={store}>
		<App />	
	</Provider>
	 ,	document.getElementById('app')
);
