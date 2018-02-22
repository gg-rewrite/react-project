import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { showCategory, editCategory } from "../actions/categories.js";

const mapStateToProps = state => ({
    category: state.categories,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    showCategory: catId => dispatch(showCategory(catId)),
    editCategory: (catId, category) => dispatch(editCategory(catId, Category))
});

class ConnectedEditCategory extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    name: "",
	    description: ""
	};
    }

    componentDidMount() {
	this.props.showCategory(this.props.match.params.catId);
    }

    render() {
	const { category, user } = this.props;
	if (!this.props.user.userData || (this.props.user.userData && this.props.user.userData.role_id !== 1))
	    return(<div>Access Denied</div>);
	if (!category.currentCategory)
	    return(<div>Please wait</div>);
	else {
	    const { currentCategory } = category;
	    this.setState({name: currentCategory.name, description: currentCategory.description});
	    return(
	    <div>
		Edit Category {this.props.match.params.catId}<br/>
		Name
		{" "}
		<input
		    value={this.state.name}
		    onChange={e => this.setState({name: e.target.value})}
		/><br/>
		Description
		{" "}
		<input
		    value={this.state.description}
		    onChange={e => this.setState({description: e.target.value})}
		/>
		<button
		    disabled={!this.state.name || !this.state.description}
		    onClick={e => this.props.editCategory(this.state)}
		>
		    Submit
		</button>
	    </div>
	    );
	}
	
    }
}

const EditCategory = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedEditCategory));
export default EditCategory;
