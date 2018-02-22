import React from "react";
import { connect } from "react-redux";
import { Route, withRouter, Link } from "react-router-dom";

import { showUser } from "../actions/users.js";
import { CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";
import EditUser from "./EditUser.jsx";

const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch => ({
    showUser: userId => dispatch(showUser(userId))
});

class ConnectedUser extends React.Component {
    constructor(props) {
	super(props);
    }

    componentDidMount() {
	const { isAdminAccess } = this.props.user;
	if (isAdminAccess)
	    this.props.showUser(this.props.match.params.userId);
    }
    
    componentWillReceiveProps(nextProps) {
	const { isAdminAccess, completionCode } = this.props.user;
	if (completionCode && completionCode == CODE_SUCCESS)
	    this.props.showUser(this.props.match.params.userId);
    }

    render() {
	const { isAdminAccess, userData, currentUser } = this.props.user;
	const { userId } = this.props.match.params;
	if (!isAdminAccess)
	    return(<div>Access denied</div>);
	if (!currentUser) {
	    this.props.showUser(userId);
	    return(<div>Please wait</div>);
	}
	return(
	    <div>
		User <br/>
		{currentUser.name}
		{" "}
		<Link to={`/users/${userId}/edit`}>Edit</Link>
		<Route path="/users/:userId/edit" render={() => <EditUser userToEdit={currentUser}/>}/>
	    </div>
	);
    }
};

const User = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedUser));
export default User;

