import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { listPlaylistsForVideo } from "../actions/videos.js";
import { listPlaylists, addVideoToPlaylist, deleteVideoFromPlaylist } from "../actions/playlists.js";
import { CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";

const mapStateToProps = state => ({playlists: state.playlists, user:state.user, videos: state.videos});
const mapDispatchToProps = dispatch => ({
    listPlaylists: userId => dispatch(listPlaylists(userId)),
    listPlaylistsForVideo: videoId => dispatch(listPlaylistsForVideo(videoId)),
    addVideoToPlaylist: (userId, playlistId, videoId) => dispatch(addVideoToPlaylist(userId, playlistId, videoId)),
    deleteVideoFromPlaylist: (userId, playlistId, videoId) => dispatch(deleteVideoFromPlaylist(userId, playlistId, videoId))
});


class ConnectedVideoPlaylists extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    videoId: this.props.match.params.videoId,
	    playlistId: ""
	};
    }

    componentDidMount() {
	this.props.listPlaylistsForVideo(this.props.match.params.videoId);

    }

    componentWillReceiveProps(nextProps) {
	const { completionCode } = nextProps.playlists;
	if (completionCode && completionCode === CODE_SUCCESS)
	    this.props.listPlaylistsForVideo(this.props.match.params.videoId);

    }

    render() {
	const { videoId } = this.props.match.params;
	const { loggedIn, userData } = this.props.user;
	const { playlists } = this.props.videos;
	if (!loggedIn)
	    return(<div></div>);
	if (!playlists || !this.props.playlists.playlists) {
	    this.props.listPlaylists(userData.id);
	    return(<div>Please wait</div>);
	}
	const userPlaylists = this.props.playlists.playlists;
	return(
	    <div>
		{playlists.length > 0 ? "In playlists:" : "" }<br/>
		<ul>
		    {playlists.map(el =>
			<li key={el.playlist_id}>
			    <Link to={`/playlists/${el.playlist_id}`}>{el.name}</Link>
			    <button
				onClick={e => this.props.deleteVideoFromPlaylist(userData.id, el.playlist_id, videoId)}
			    >Remove from playlist</button>
			</li>
		     )}
		</ul>
		<select onChange={e => this.setState({playlistId: e.target.value})}>
		    {userPlaylists.map(el =>
			<option key={el.id} value={el.id}>{el.name}</option>
		     )}
		</select>
		<button
		    onClick={e => this.props.addVideoToPlaylist(userData.id, this.state.playlistId, videoId)}
		>Add to playlist</button>
	    </div>
	);
    }
    
};

const VideoPlaylists = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedVideoPlaylists));
export default VideoPlaylists;
