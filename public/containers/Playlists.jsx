import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Link, withRouter } from "react-router-dom";

import { listPlaylists, deletePlaylist } from "../actions/playlists.js";
import AddPlaylist from "./AddPlaylist.jsx";
import Playlist from "./Playlist.jsx";

const mapStateToProps = state => ({playlists: state.playlists, user: state.user});
const mapDispatchToProps = dispatch => ({
    listPlaylists: userId => dispatch(listPlaylists(userId)),
    deletePlaylist: (userId, playlistId) => dispatch(deletePlaylist(userId, playlistId))
});

class ConnectedPlaylists extends React.Component {
    constructor(props) {
	super(props);
    }

    componentWillReceiveProps(nextProps) {
	if (nextProps.playlists.completionCode
	&& nextProps.user.loggedIn)
	    this.props.listPlaylists(nextProps.user.userData.id);
    }

    render() {
	const { loggedIn, userData } = this.props.user;
	const { match } = this.props;
	if (!loggedIn)
	    return(<div>Access denied</div>);
	const { playlists } = this.props.playlists;
	if (!playlists) {
	    this.props.listPlaylists(userData.id);
	    return(<div>Please wait</div>);
	}
	
	return(
	    <div>
		Playlists<br/>

		{playlists.length == 0 ? "No playlists" :
		 <ul>
		     {playlists.map(el =>
			 <li key={el.id}>
			     <Link to={`${this.props.match.url}/${el.id}`}>{el.name}</Link>
			     {" "}
			     <button
				 onClick={e => this.props.deletePlaylist(userData.id, el.id)}
			     >Delete</button>
			 </li>
		      )}
		 </ul>
		}
		 <br/>
		 <Link to="/playlists/new">Add playlist</Link>
		 <Switch>
		     <Route path="/playlists/new" component={AddPlaylist}/>
		     <Route path="/playlists/:playlistId" component={Playlist}/>
		 </Switch>
	    </div>
	);
    }
}

const Playlists = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedPlaylists));
export default Playlists;
