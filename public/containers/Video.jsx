import React from "react";
import { connect } from "react-redux";
import { Redirect,Link, withRouter } from "react-router-dom";

import { showVideo, deleteVideo, listComments, addComment } from "../actions/videos.js";
import { CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";
import Likes from "./Likes.jsx";
import VideoPlaylists from "./VideoPlaylists.jsx";
import VideoCategories from "./VideoCategories.jsx";
import Comments from "./Comments.jsx";

const mapStateToProps = state => ({
    videos: state.videos,
    user: state.user
});
const mapDispatchToProps = dispatch => ({
    showVideo: videoId  => dispatch(showVideo(videoId)),
    deleteVideo: videoId => dispatch(deleteVideo(videoId))
});

class ConnectedVideo extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    videoId: this.props.match.params.videoId
	};
    }

    componentDidMount() {
	const { videoId } = this.props.match.params;
	this.props.showVideo(videoId);

    }

    render() {
	const { loggedIn, isAdminAccess, userData } = this.props.user;
	const { currentVideo, comments, notFound, completionCode } = this.props.videos;
	if (completionCode && completionCode === CODE_FAILURE)
	    return(<div>You have exceeded the unauthorized user's view quoat. Please log in to proceed.</div>);
	if (!currentVideo)
	    return(<div>Please wait</div>);
	if (notFound)
	    return(<div>Video not found (sorry about that)</div>);
	const { videoId } = this.props.match.params;
	const location = "/api/content/" + currentVideo.location;
	return(
	    <div>
		<video src={location}
		       controls
		       height="480"
		       width="720">
		    
		</video><br/>
		{isAdminAccess
		 ? <span>
		    <Link to={`${this.props.match.url}/edit`}>Edit<br/></Link>
		    <button onClick={e => this.props.deleteVideo(currentVideo.id)}>Delete Video</button>
		 </span>
		 : ""
		}
		<h2>{currentVideo.description}</h2>
		{" "}
		{currentVideo.views}
		{currentVideo.views % 10 == 1
		 ? " view"
		 : " views"}
		{" "}
		<Likes  />
		<VideoPlaylists />
		<VideoCategories />
		<Comments />
{/*	    {loggedIn
      ?
	     <span>
		<textarea
		rows="4"
		cols="50"
		onChange={e => this.setState({comment: e.target.value})}
		/><br/>
		<button
		    disabled={!this.state.comment}
		    onClick={e => this.props.addComment(videoId, userData.id, this.state.comment)}
		>Add comment</button>
		 </span>
		       : ""
	    }
	    <ul>
		{comments.map(el =>
		    <li key={el.id}>
			<b>{el.name}</b>: {el.text}
		    </li>
		 )}
	    </ul>*/}

	    </div>
	);
    }
    
};

const Video = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedVideo)); 

export default Video;
