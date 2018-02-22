import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { listVideos, deleteVideo } from "../actions/videos.js";
import { CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";
import VideoLink from "../containers/VideoLink.jsx";

const mapDispatchToProps = dispatch => ({
    listVideos: () => dispatch(listVideos()),
    deleteVideo: videoId => dispatch(deleteVideo(videoId))
});

const mapStateToProps = state => ({videos: state.videos, user: state.user });

class ConnectedVideos extends React.Component{
    constructor(props) {
	super(props);
    }

    componentDidMount() {
	this.props.listVideos();
    }

    componentWillReceiveProps(nextProps) {
	const { completionCode } = nextProps.videos;
	if (completionCode && completionCode === CODE_SUCCESS)
	    this.props.listVideos();
    }

    

    render() {
	const { loggedIn, isAdminAccess } = this.props.user;
	const { videos } = this.props.videos;
	if (!videos)
	    return(<div>Please wait</div>);
	return(
	    <div>
		All Videos <br/>

	    <ul>
	    {videos.map(el =>
		<span key={el.id}>
		    <VideoLink video={{...el, video_id: el.id}}/>
		    { isAdminAccess
		      ?
		      <button
			  onClick={e => this.props.deleteVideo(el.id)}
		      >Delete</button>
		      : ""
		    }
		</span>
	    )}
	    </ul>
	    </div>
	);
    }
}

const Videos = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedVideos));
export default Videos;
