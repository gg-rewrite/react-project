import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const mapStateToProps = state => ({user: state.user});

class ConnectedVideoLink extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
	const { video } = this.props;
	return(
	    <div>
		<Link to={`/videos/${video.video_id}`}>
		    {video.description}
		    {" "}
		</Link>
	    </div>
	);
    }
}

const VideoLink = withRouter(connect(mapStateToProps)(ConnectedVideoLink));
export default VideoLink;
