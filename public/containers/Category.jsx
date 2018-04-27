import React from "react";
import { connect } from "react-redux";
import { Route, withRouter, Link } from "react-router-dom";

import { showCategory, listVideosInCategory, deleteVideoFromCategory } from "../actions/categories.js";
import VideoLink from "./VideoLink.jsx";
import EditCategory from "./EditCategory.jsx";

const mapStateToProps = state => ({categories: state.categories, user:state.user});

const mapDispatchToProps = dispatch => ({
    showCategory: catId => dispatch(showCategory(catId)),
    listVideosInCategory: catId => dispatch(listVideosInCategory(catId)),
    deleteVideoFromCategory: (catId, videoId) => dispatch(deleteVideoFromCategory(catId, videoId))
});

class ConnectedCategory extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    catId: this.props.match.params.catId
	};
    }

    componentDidMount() {
	const { catId } = this.props.match.params;
	this.props.showCategory(catId);
	this.props.listVideosInCategory(catId);
    }

    componentWillReceiveProps(nextProps) {
	const { catId } = this.props.match.params;
	const { loggedIn, userData } = this.props.user;
	const { completionCode } = this.props.categories;
	if (catId !== this.state.catId
	|| (completionCode && completionCode === CODE_SUCCESS)) {
	    this.setState({catId: catId});
	    this.props.showCategory(catId);
	    this.props.listVideosInCategory(catId);
	}
    }
    
    render() {
	const { isAdminAccess, userData  } = this.props.user;
	const { currentCategory, videos } = this.props.categories;
	const { catId } = this.props.match.params;
	if (!currentCategory || !videos) {
	    return(<div>Please wait</div>);
	}
	return(
	    <div>
		<h1>{currentCategory.name}</h1>
		<h2>{currentCategory.description}</h2>
		{isAdminAccess && catId > 2
		 ?
		 <Link to={`/categories/${catId}/edit`}>Edit</Link>
		 : ""}
		 <ul>
		     {videos.map(el =>
			 <span key={el.video_id}>
			     <VideoLink video={el} />
			     {isAdminAccess && catId > 2 ?
			      <button
				  onClick={e => this.props.deleteVideoFromCategory(catId, el.video_id)}
			      >Remove</button>
			      : ""
			     }
			      
			 </span>
		      )}
		 </ul>
	    </div>
	);
    }
    
}

const Category = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedCategory));
export default Category;
