import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";
import { showVideo, editVideo } from "../actions/videos.js";

const mapStateToProps = state => ({
    videos: state.videos,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    showVideo: videoId => dispatch(showVideo(videoId)),
    editVideo: (videoId, video) => dispatch(editVideo(videoId, video))
});

class ConnectedEditVideo extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    description: ""
	};
    }

    componentDidMount() {
	this.props.showVideo(this.props.match.params.videoId);
    }

    render() {
	const { completionCode } = this.props.videos;
	if (completionCode && completionCode === CODE_SUCCESS)
	    return(<Redirect to={`/videos/${this.props.match.params.videoId}`}/>);
	const { isLoggedIn, isAdminAccess } = this.props.user;
	if (!isAdminAccess)
	    return(<div>Access denied</div>);
	const { currentVideo } = this.props.videos;
	if (!currentVideo)
	    return(<div>Please wait</div>);
//	this.setState({description: currentVideo.description});
	return(
	    <div>
		Edit Video {this.props.match.params.videoId}<br/>
		<input
		    placeholder={currentVideo.description}
		    onChange={e => this.setState({description: e.target.value})}
/><br/>
		<button
		    onClick={e => this.props.editVideo(currentVideo.id, this.state)}
		>Submit</button>
	    </div>
	);
    };
    
}

const EditVideo = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedEditVideo));
export default EditVideo;
