import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { register } from "../actions/users.js";
import { CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";

const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch => ({
    register: (id, pw) => dispatch(register(id, pw))
});

class ConnectedRegister extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    id: "",
	    pw: "",
	    pwConfirm: ""
	};
    }

    render() {
	if (!this.props.user) {
	    return(<div>Please wait</div>);
	} else {
	    const { completionCode } = this.props.user;
	    if (completionCode && completionCode === CODE_SUCCESS) {
		return(<Redirect to="/login"/>);
	    }
	    return(
	    <div>
		Register
		Login: 
		<input onChange={e => this.setState({id: e.target.value})} /><br/>
		Password:
		<input type="password" onChange={e => this.setState({pw: e.target.value})} /><br/>
		Password Confirm: 
		<input type="password" onChange={e => this.setState({pwConfirm: e.target.value})} />
		<button disabled={
		    !this.state.id
			       || !this.state.pw
			       || !this.state.pwConfirm
		    || this.state.pw != this.state.pwConfirm
				 }
			onClick={e => this.props.register(
				this.state.id,
				this.state.pw
			    )}
		>
		    Register
		</button><br/>
		{this.state.pw != this.state.pwConfirm
		 ? "Passwords don't match"
		 : ""}
		{this.props.completionCode && this.props.completionCode === CODE_FAILURE
		 ? "Error while registering"
		 : ""
		}
	    </div>
	    );
	}
	
    }
}

const Register = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedRegister));
export default Register;
