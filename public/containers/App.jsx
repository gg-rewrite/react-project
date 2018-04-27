import React from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Categories from "./Categories.jsx";
import Category from "./Category.jsx";
import Users from "./Users.jsx";
import VideoSearch from "./VideoSearch.jsx";
import Playlists from "./Playlists.jsx";
import Video from "./Video.jsx";
import Videos from "./Videos.jsx";
import VideoUpload from "./VideoUpload.jsx";
import { isLoggedIn, logout } from "../actions/users.js";

const mapStateToProps = state => ({
    user: state.user
});
const mapDispatchToProps = dispatch => ({
    isLoggedIn: () => dispatch(isLoggedIn()),
    logout: () => dispatch(logout())
});

class ConnectedApp extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    lastLocation: this.props.location.pathname
	};
    }

    componentDidMount() {
	this.props.isLoggedIn();
    }

    componentWillReceiveProps(nextProps) {
	if (nextProps.location.pathname !== this.state.lastLocation) {
	    this.setState({lastLocation: nextProps.location.pathname});
	    this.props.isLoggedIn();
	    this.forceUpdate();
	}
    }
    
    render() {
	const { loggedIn, isAdminAccess, userData } = this.props.user;
	return(
	    <div key="App">
		<Link to="/categories">Categories</Link>
		{" "}
		<Link to="/videos">Videos</Link>
		{" "}
		{isAdminAccess ?
		 <span>
		     <Link to="/videoUpload">Video Upload</Link>
		     {" "}
		     <Link to="/users">Users</Link>
		 </span>: ""}
		 {" "}
		 {loggedIn ? <Link to="/playlists">Playlists</Link> : ""}
		 {" "}
		 Welcome, {loggedIn ? `${userData.name}` : "guest"}
		 {" "}
		 {loggedIn ?
		  <button onClick={e => this.props.logout()}>
		      Log out
		  </button> :
		  <Link to="/login">Log in</Link>
		 }
		  <VideoSearch/>
		  <Switch>
		      <Route  path="/categories" component={Categories}/>
		      <Route path="/playlists" component={Playlists}/>
		      <Route exact path="/videos/:videoId" component={Video}/>
		      <Route exact path="/videos" component={Videos}/>
		      <Route path="/videoUpload" component={VideoUpload}/>
		      <Route path="/users" component={Users}/>
	     </Switch>
	    </div>

	);
    }

}

const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedApp));
export default App;
