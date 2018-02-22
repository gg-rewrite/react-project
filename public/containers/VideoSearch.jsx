import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { listVideos } from "../actions/videos.js";
import VideoLink from "./VideoLink.jsx";


const mapStateToProps = state => ({videos: state.videos});
const mapDispatchToProps = dispatch => ({
    listVideos: () => dispatch(listVideos())
});

const initialState = {
    searchString: "",
    selectedVideos: []
};

class ConnectedVideoSearch extends React.Component {

    constructor(props) {
	super(props);
	this.state = initialState;
	 
    }

    selectVideos() {
	const selects = this.props.videos.videos.filter( el =>
	    el.description.toLowerCase().indexOf(this.state.searchString) !== -1
	);
	this.setState({selectedVideos: selects});
    }

    componentDidMount() {
	this.props.listVideos();

    }
    
    render() {
	if (!this.props.videos.videos) {
	    this.props.listVideos();
	    return(<div>please wait</div>)
	}
	
	return (
	    <div>
		search
		{" "}
		<input type="text"
		       autoComplete="on"
		       onChange={(e) => {
			       this.setState({searchString: e.target.value.toLowerCase()});
			       this.selectVideos();
			   }}
		/>
		<ul>
		    {this.state.selectedVideos.map(el =>
			<li key={el.id}>
			    <VideoLink video={{...el, video_id: el.id}} />
			</li>
		     )}
		</ul>
		
	    </div>
	);
    }
}

const VideoSearch = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedVideoSearch));

export default VideoSearch;
