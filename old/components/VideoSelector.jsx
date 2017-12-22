import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import Videos from './Videos.jsx';
import Video from './Video.jsx';

class VideoSelector extends React.Component {


	render() {
		return(
			<div>
				<Switch>
					<Route exact path='/videos' component={Videos}/>
					<Route path='/videos/:videoId' component={Video}/>
				</Switch>
			</div>
		);
	}
}

export default VideoSelector;
