import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { addPlaylist } from "../actions/playlists.js";
import { CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";

const mapStateToProps = state => ({playlists: state.playlists, user: state.user});
const mapDispatchToProps = dispatch => ({
    addPlaylist: (userId, playlist) => dispatch(addPlaylist(userId, playlist))
});

class ConnectedAddPlaylist extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    name: "",
	    description: ""
	};
    }
    
    render() {
	const {loggedIn, userData} = this.props.user;
	const { completionCode } = this.props.playlists;
	if (completionCode && completionCode === CODE_SUCCESS)  {
	    console.log(completionCode);
	    return(<Redirect to="/playlists"/>);
	}
	if (!loggedIn)
	    return(<div>Access denied</div>);
	return(
	    <div>
		Add Playlist<br/>
		Name
		{" "}
		<input onChange={e => this.setState({name: e.target.value})}/><br/>
		Description
		{" "}
		<input onChange={e => this.setState({description: e.target.value})}/><br/>
		<button
		    disabled={
			!this.state.name || !this.state.description
			     }
onClick={e => this.props.addPlaylist(userData.id, this.state)}
		>Add
		</button>
		{completionCode && completionCode === CODE_FAILURE
		 ? "Adding playlist failed"
		 : ""
		}
	    </div>
	)
    }
    
}

const AddPlaylist = withRouter(connect(mapStateToProps,mapDispatchToProps)(ConnectedAddPlaylist));
export default AddPlaylist;
