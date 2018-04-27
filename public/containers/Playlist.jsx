import React from "react";
import { connect } from "react-redux";
import { Route, withRouter, Link } from "react-router-dom";

import { showPlaylist, listVideosInPlaylist, deleteVideoFromPlaylist } from "../actions/playlists.js";
import VideoLink from "./VideoLink.jsx";
import EditPlaylist from "./EditPlaylist.jsx";

const mapStateToProps = state => ({playlists: state.playlists, user:state.user});

const mapDispatchToProps = dispatch => ({
    showPlaylist: (userId, playlistId) => dispatch(showPlaylist(userId, playlistId)),
    listVideosInPlaylist: (userId, playlistId) => dispatch(listVideosInPlaylist(userId, playlistId)),
    deleteVideoFromPlaylist: (userId, playlistId, videoId) => dispatch(deleteVideoFromPlaylist(userId, playlistId, videoId))
});

class ConnectedPlaylist extends React.Component {
    constructor(props) {
	super(props);
    }

    componentDidMount() {
	const { playlistId } = this.props.match.params;
	const { loggedIn, userData } = this.props.user;
	if (loggedIn) {
	    this.props.showPlaylist(userData.id, playlistId);
	    this.props.listVideosInPlaylist(userData.id, playlistId);
	}
    }

    componentWillReceiveProps(nextProps) {
	if (nextProps.playlists.completionCode) {
	    const {playlistId} = this.props.match.params;
	    const {loggedIn, userData} = this.props.user;
	    if (loggedIn) {
		this.props.showPlaylist(userData.id, playlistId);
		this.props.listVideosInPlaylist(userData.id, playlistId);
	    }
	}
    }
    
    render() {
	const { loggedIn, userData  } = this.props.user;
	if (!loggedIn)
	    return(<div>Access denied</div>);
	const { currentPlaylist, videos } = this.props.playlists;
	const { playlistId } = this.props.match.params;
	if (!currentPlaylist || !videos) {
	    this.props.showPlaylist(userData.id, playlistId);
	    this.props.listVideosInPlaylist(userData.id,playlistId);
	    return(<div>Please wait</div>);
	}
	return(
	    <div>
	    <h1>{currentPlaylist.name}</h1>
	    <h2>{currentPlaylist.description}</h2>
	    <Link to={`/playlists/${playlistId}/edit`}>Edit</Link>
	    <Route path="/playlists/:playlistId/edit" render={() => <EditPlaylist playlist={currentPlaylist}/>}/>
	    <ul>
	    {videos.map(el =>
		<span key={el.id}>
		    <VideoLink video={el} />
		    <button
			onClick={e => this.props.deleteVideoFromPlaylist(userData.id, playlistId, el.id)}
		    >Remove</button>
		</span>
	    )}
			 </ul>
	    </div>
	);
    }
    
}

const Playlist = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedPlaylist));
export default Playlist;
