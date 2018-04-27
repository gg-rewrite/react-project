import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { listCategoriesForVideo } from "../actions/videos.js";
import { listCategories, addVideoToCategory, deleteVideoFromCategory } from "../actions/categories.js";
import { CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";

const mapStateToProps = state => ({categories: state.categories, user:state.user, videos: state.videos});
const mapDispatchToProps = dispatch => ({
    listCategories: () => dispatch(listCategories()),
    listCategoriesForVideo: videoId => dispatch(listCategoriesForVideo(videoId)),
    addVideoToCategory: (categoryId, videoId) => dispatch(addVideoToCategory(categoryId, videoId)),
    deleteVideoFromCategory: (categoryId, videoId) => dispatch(deleteVideoFromCategory(categoryId, videoId))
});


class ConnectedVideoCategories extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    videoId: this.props.match.params.videoId,
	    categoryId: ""
	};
    }

    componentDidMount() {
	this.props.listCategoriesForVideo(this.props.match.params.videoId);
	this.props.listCategories();

    }

    componentWillReceiveProps(nextProps) {
	const { completionCode } = nextProps.categories;
	if (completionCode && completionCode === CODE_SUCCESS)
	    this.props.listCategoriesForVideo(this.props.match.params.videoId);
    }

    render() {
	const { videoId } = this.props.match.params;
	const { isAdminAccess, userData } = this.props.user;
	const { categories } = this.props.videos;
	if (!categories || !this.props.categories.categories) {
	    return(<div>Please wait</div>);
	}
	const allCategories = this.props.categories.categories;
	return(
	    <div>
		{categories.length > 0 ?"In categories:": ""}<br/>
		<ul>
		    {categories.map(el =>
			<li key={el.category_id}>
			    <Link to={`/categories/${el.category_id}`}>{el.name}</Link>
			    {isAdminAccess ?
			     <button
onClick={e => this.props.deleteVideoFromCategory(el.category_id, videoId)}
			     >Remove from category</button>
			     : "" }
			</li>
		     )}
		</ul>
		{isAdminAccess ?
		 <span>
		     <select onChange={e => this.setState({categoryId: e.target.value})}>
			 {allCategories.map(el =>
			     <option key={el.id} value={el.id}>{el.name}</option>
			  )}
		     </select>
		     <button
			 onClick={e => this.props.addVideoToCategory(this.state.categoryId, videoId)}
		     >Add to category</button>
		 </span> : "" }
	    </div>
	);
    }
    
};

const VideoCategories = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedVideoCategories));
export default VideoCategories;
