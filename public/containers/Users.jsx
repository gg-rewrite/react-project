import React from "react";
import { connect } from "react-redux";
import { Route, withRouter, Link } from "react-router-dom";

import { listUsers, deleteUser } from "../actions/users.js";
import { CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";
import User from "./User.jsx";

const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch => ({
    listUsers: () => dispatch(listUsers()),
    deleteUser: userId => dispatch(deleteUser(userId))
});

class ConnectedUsers extends React.Component {

    constructor(props) {
	super(props);
    }

    componentDidMount() {
	this.props.listUsers();
    }

    componentWillReceiveProps(nextProps) {
	const { isAdminAccess, completionCode } = this.props.user;
	if (completionCode && completionCode === CODE_SUCCESS)
	    this.props.listUsers();
    }
    
    render() {
	const {loggedIn, isAdminAccess, userData, users } = this.props.user;
	if (!isAdminAccess)
	    return(<div>Access denied</div>);
	if (!users)
	    return(<div>Please wait</div>);
	return(
	    <div>
		Admin users<br/>

		<ul>
		    {users.map(el =>
			<li key={el.id}>
			    <Link to={`${this.props.match.url}/${el.id}`}>{el.name}</Link>
			    {el.role_id === 1 ? "Admin" : ""}
			    <button
				onClick={e => this.props.deleteUser(el.id)}
			    >Delete</button>
			</li>
		     )}
		</ul>
		<Route path="/users/:userId" component={User}/>
	    </div>
	);
	
    }
}

const Users = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedUsers));
export default Users;
