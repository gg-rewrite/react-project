import axios from "axios";

import { LIST_CATEGORIES, SHOW_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY, ADD_CATEGORY, LIST_VIDEOS_IN_CATEGORY, ADD_VIDEO_TO_CATEGORY, DELETE_VIDEO_FROM_CATEGORY, CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";

const listCategoriesAction = categories => ({type: LIST_CATEGORIES, categories: categories});
const showCategoryAction = category => ({type: SHOW_CATEGORY, category: category});
const listVideosInCategoryAction = videos => ({type: LIST_VIDEOS_IN_CATEGORY, videos: videos});
const addCategoryAction = completionCode => ({type: ADD_CATEGORY, completionCode: completionCode});
const deleteCategoryAction = categoryId => ({type: DELETE_CATEGORY, categoryId: categoryId});

export const listCategories = () => dispatch =>
    axios.get("/api/video_categories")
	 .then(response => dispatch(listCategoriesAction(response.data)))
	 .catch(error => console.log(error));

export const showCategory = catId => dispatch => 
    axios.get("/api/video_categories/" + catId)
	 .then(response => dispatch(showCategoryAction(response.data)))
	 .catch(error => console.log(error));

export const listVideosInCategory = catId => dispatch =>
    axios.get("/api/video_categories/" + catId + "/videos")
	 .then(response => dispatch(listVideosInCategoryAction(response.data)))
	 .catch(error => console.log(error));

export const deleteVideoFromCategory = (catId, videoId) => dispatch =>
    axios.delete("/api/video_categories/" + catId + "/videos/" + videoId)
	 .then(response => dispatch({type: DELETE_VIDEO_FROM_CATEGORY, completionCode: CODE_SUCCESS}))
	 .catch(error => console.log(error));

export const addVideoToCategory = (catId, videoId) => dispatch =>
    axios.post("/api/video_categories/" + catId + "/videos", {video_id: videoId})
	 .then(response => dispatch({type: ADD_VIDEO_TO_CATEGORY, completionCode: CODE_SUCCESS}))
	 .catch(error => console.log(error));

export const addCategory = category => dispatch =>
    axios.post("/api/video_categories", category)
	 .then(response => dispatch(addCategoryAction(CODE_SUCCESS)))
	 .catch(error => {
	     console.log(error);
	     dispatch(addCategoryAction(CODE_FAILURE));
	 });

export const deleteCategory = categoryId => dispatch =>
    axios.delete("/api/video_categories/" + categoryId)
	 .then(response => dispatch(deleteCategoryAction(categoryId)))
	 .catch(error => console.log(error));


export const editCategory = (catId, category) => dispatch =>
    axios.put("/api/video_categories/" + catId, category)
	 .then(response => dispatch(editCategoryAction(CODE_SUCCESS)))
	 .catch(error => console.log(error));
