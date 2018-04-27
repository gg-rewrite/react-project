import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Link, withRouter } from "react-router-dom";

import { listCategories, deleteCategory } from "../actions/categories.js";
import Category from "./Category.jsx";
import AddCategory from "./AddCategory.jsx";

const mapStateToProps = state => ({categories: state.categories, user: state.user});

const mapDispatchToProps = dispatch => ({
    listCategories: () => dispatch(listCategories()),
    deleteCategory: catId => dispatch(deleteCategory(catId))
});

class ConnectedCategories extends React.Component {
    constructor(props) {
	super(props);
    }

    componentDidMount() {
	this.props.listCategories();
    }

    componentWillReceiveProps(nextProps) {
	const { completionCode } = this.props.categories;
	if (completionCode)
	    this.props.listCategories();
    }
    
    render() {

	const { isAdminAccess } = this.props.user;
	const { categories } = this.props.categories;
	const { match } = this.props;
	if (!categories) {
	    this.props.listCategories();
	    return(<div>Please wait</div>);
	}
	return(
	    <div>
		Categories<br/>
		<ul>
		    {categories.map((el, i) =>
			<li key={i}>
			    <Link to={`${match.url}/${el.id}`}>{el.name}</Link>
			    {" "}
			{isAdminAccess && el.id > 2 ? <span>
		    <Link to={`${match.url}/${el.id}/edit`}>Edit</Link>
		    <button onClick={e => this.props.deleteCategory(el.id)}>Delete</button>
			</span>
		       : "" }
			</li>)}
		</ul>
		{isAdminAccess ? <Link to="/categories/new">Add category</Link> : ""}

		<Route path="/categories/new" component={AddCategory}/>
		<Route path="/categories/:catId" component={Category}/>

	    </div>
	);
    };
};

const Categories = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedCategories));

export default Categories;
