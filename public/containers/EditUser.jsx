import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { editUser } from "../actions/users.js";
import { CODE_SUCCESS, CODE_FAILURE }  from "../actions/constants.js";

const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch => ({
    editUser: (userId, user) => dispatch(editUser(userId, user))
});

class ConnectedEditUser extends React.Component {

    constructor(props) {
	super(props);
	const { userToEdit } = this.props;
	console.log(userToEdit);
	this.state = {
	    login: userToEdit.name,
	    password: userToEdit.password,
	    passwordConfirm: userToEdit.password,
	    role: userToEdit.role_id
	};
    }

    render() {
	const { userId } = this.props.match.params;
	const { completionCode } = this.props.user;
	if (completionCode && completionCode === CODE_SUCCESS)
	    return(<Redirect to="/users"/>);
	const {isAdminAccess, userData } = this.props.user;
	if (!isAdminAccess)
	    return(<div>Access denied</div>);
	return(
	    <div>
		Admin edit user<br/>
		Name: <br/>
		<input
		    value={this.state.login}
		    onChange={e => this.setState({login: e.target.value})}
		/> <br/>
		Password: <br/>
		<input
		    value={this.state.password}
		    type="password"
		    onChange={e => this.setState({password: e.target.value})}
		/> <br/>
		Password confirm: <br/>
		<input
		    type="password"
		    value={this.state.passwordConfirm}
		    onChange={e => this.setState({passwordConfirm: e.target.value})}
/> <br/>
		{this.state.password !== this.state.passwordConfirm
		 ? "Password and confirmation don't match"
		 : ""
		} <br/>
		<input type="checkbox" checked={this.state.role == 1} value={this.state.role} onChange={e => {
			if (e.target.value === "1") {
			    this.setState({role: 2});
			} else {
			    this.setState({role: 1});
			}
		    }} />
		Admin
		<br/>
		<button
		    disabled={!this.state.login || !this.state.password
			   || !this.state.passwordConfirm
			   || (this.state.password !== this.state.passwordConfirm)
			     }
		    onClick={e => this.props.editUser(userId, this.state)}
		>Submit</button>
		
	    </div>
	);
	
    }
}

const EditUser = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedEditUser));
export default EditUser;
