import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Dashboard from './Dashboard.jsx';
import VideoSelector from './VideoSelector.jsx';

class App extends React.Component {

	render() {

		return(
				<div>
					<Header username="nyanko" />	

					<Switch>
						<Route exact path="/" component={Dashboard} />
						<Route path="/videos" component={VideoSelector} />
						<Route path="/dashboard" component={Dashboard} />
					</Switch>


					<Footer />
				</div>
		);
	}
}

export default App;
