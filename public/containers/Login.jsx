import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect, Link } from "react-router-dom";

import { login } from "../actions/users.js";
import { CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";

const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch => ({
    login: (id, pw) => dispatch(login(id, pw))
});

class ConnectedLogin extends React.Component {
    constructor(props){
	super(props);
	this.state = {
	    login: "",
	    password: ""
	};
    }

    render() {
	if (this.props.user.completionCode && this.props.user.completionCode === CODE_SUCCESS) {
	    return(<Redirect to="/"/>)
	}
	else return(
	    <div>
		Log in or
		{" "}
		<Link to="/register">Register</Link><br/>
		<input
		    onChange={e => this.setState({login: e.target.value})}
		/><br/>
		<input type="password"
		       onChange={e => this.setState({password: e.target.value})}
		/>
		<button disabled={
		    !this.state.login
		    || !this.state.password
				 }
			onClick={e => this.props.login(
				this.state.login,
				this.state.password
			    )}
		>
		    Log in
		</button><br/>
		{this.props.user.completionCode === CODE_FAILURE
		 ? "Wrong user or password"
		 : ""
		}
	    </div>
	);
    }
    
}

const Login = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin));
export default Login;
