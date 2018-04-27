import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { editPlaylist } from "../actions/playlists.js";
import { CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";

const mapStateToProps = state => ({playlists: state.playlists, user:state.user});
const mapDispatchToProps = dispatch => ({
    editPlaylist: (userId, playlistId, playlist) => dispatch(editPlaylist(userId, playlistId, playlist))
});

class ConnectedEditPlaylist extends React.Component {
    constructor(props) {
	super(props);
	if (this.props.playlist) {
	    this.state = {
		name: this.props.playlist.name,
		description: this.props.playlist.description
	    }
	} else {
	    this.state = {
		name: "",
		description: ""
	    }
	}

    }

    render() {
	const { playlistId } = this.props.match.params;
	const {completionCode} = this.props.playlists;
	if (completionCode && completionCode === CODE_SUCCESS)
	    return(<Redirect to={`/playlists/${playlistId}`}/>);
	const { loggedIn, userData } = this.props.user;
	if (!loggedIn)
	    return(<div>Access denied</div>);
	return(
	    <div>
		Edit Playlist<br/>
		Name: <br/>
		<input
		    value={this.state.name}
		    onChange={e => this.setState({name: e.target.value})}/><br/>
		Description: <br/>
		<input
		    value={this.state.description}
		    onChange={e => this.setState({description: e.target.value})}/>
		<button
		    disabled={!this.state.name || !this.state.description}
		    onClick={e => this.props.editPlaylist(userData.id, playlistId, this.state)}
		>Submit</button>
	    </div>
	);
    }
};

const EditPlaylist = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedEditPlaylist));
export default EditPlaylist;
