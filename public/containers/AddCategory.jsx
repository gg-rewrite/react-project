import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { addCategory } from "../actions/categories.js";
import { CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";

const mapStateToProps = state => ({category: state.categories, user: state.user});
const mapDispatchToProps = dispatch => ({
    addCategory: category => dispatch(addCategory(category))
});

class ConnectedAddCategory extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    name: "",
	    description: ""
	};
    }
    render() {
	if (this.props.category.completionCode
	 && this.props.category.completionCode === CODE_SUCCESS)
	    return(<Redirect to="/categories"/>);
	if (this.props.user.userData)
	    return(
		<div>
		    Add Category<br/>
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
			onClick={e => this.props.addCategory(this.state)}
		    >Add
		    </button>
		    {this.props.category.completionCode
		     && this.props.category.completionCode === ADD_CATEGORY_FAILURE
		     ? "Adding category failed"
		     : ""
		    }
		</div>
	    );
	else
	    return(<div>Access denied</div>);
    }
    
}

const AddCategory = withRouter(connect(mapStateToProps,mapDispatchToProps)(ConnectedAddCategory));
export default AddCategory;
