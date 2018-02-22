import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { listComments, addComment } from "../actions/videos.js";
import { CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";

const mapStateToProps = state => ({videos: state.videos, user: state.user});
const mapDispatchToProps = dispatch => ({
    listComments: videoId => dispatch(listComments(videoId)),
    addComment: (videoId, userId, text) => dispatch(addComment(videoId, userId, text))
});


class ConnectedComments extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    comment: ""
	};
    }

    componentDidMount() {
	this.props.listComments(this.props.match.params.videoId);
    }

    componentWillReceiveProps(nextProps) {
	const { videoId } = this.props.match.params;
	const { completionCode } = nextProps.videos;
	if (completionCode && completionCode === CODE_SUCCESS) {
	    this.setState({comment: ""});
	    this.props.listComments(videoId);
	}
    }

    render() {
	const { comments } = this.props.videos;
	const { videoId } = this.props.match.params;
	const { userData, loggedIn } = this.props.user;
	if (!comments)
	    return(<div>Please wait</div>);
	return(
	    <div>
		{loggedIn
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
		 </ul>

	    </div>
	);
    }
    
}

const Comments = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedComments));
export default Comments;
