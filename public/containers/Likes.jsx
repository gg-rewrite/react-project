import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { listLikes, addLike, deleteLike } from "../actions/videos.js";
import { CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";

const mapStateToProps = state => ({videos: state.videos, user: state.user});
const mapDispatchToProps = dispatch => ({
    listLikes: videoId => dispatch(listLikes(videoId)),
    addLike: (videoId, userId) => dispatch(addLike(videoId, userId)),
    deleteLike: (videoId, userId) => dispatch(deleteLike(videoId, userId))
});


class ConnectedLikes extends React.Component {
    constructor(props) {
	super(props);
    }

    isLiked(userId) {
	return userId === this.props.videos.likes.find(l => l.user_id === userId);
    }

    componentDidMount() {
	this.props.listLikes(this.props.match.params.videoId);
    }

    componentWillReceiveProps(nextProps) {
	const { videoId } = this.props.match.params;
	const { completionCode } = nextProps.videos;
	if (completionCode && completionCode === CODE_SUCCESS)
	    this.props.listLikes(videoId);
    }

    render() {
	const { likes } = this.props.videos;
	const { videoId } = this.props.match.params;
	const { userData, loggedIn } = this.props.user;
	if (!likes)
	    return(<div>Please wait</div>);
	return(
	    <div>
		{likes.length}
		{likes.length % 10 == 1
		 ? " like"
		 : " likes"
		}
		{loggedIn
		 ? <span>
		{likes.filter(l => l.user_id === userData.id).length > 0
		 ? <button onClick={e => {
			 this.props.deleteLike(videoId, userData.id);
		     }}>Unlike</button>
		 : <button onClick={e => {
			 this.props.addLike(videoId, userData.id);
		     }}>Like</button>
		}
		 </span>
		 : ""
		}
	    </div>
	);
    }
    
}

const Likes = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedLikes));
export default Likes;
