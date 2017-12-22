import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import axios from 'axios';

class TableRow extends React.Component {
	render() {
		return(
			<li>
				<Link to={`/videos/${this.props.data.id}`}>{this.props.data.description}</Link> | 
				{this.props.data.views} views
			</li>
		);
	}
}


class Videos extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}

	componentDidMount() {
		axios.get("https://localhost:8081/api/videos")
			.then(res => {
				this.setState({data: res.data});
			});
	}

	render() {
		return(
			<div>
				Videos List
				<ul>
					{this.state.data.map(video => <TableRow data={video}/>)}
				</ul>
			</div>
		);
	}
}

export default Videos;
