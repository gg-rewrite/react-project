import axios from "axios";

import { LIST_VIDEOS, LIST_CATEGORIES_FOR_VIDEO, SHOW_VIDEO, UPLOAD_VIDEO, EDIT_VIDEO, LIST_LIKES, ADD_LIKE, DELETE_LIKE, LIST_COMMENTS, ADD_COMMENT,DELETE_VIDEO, LIST_PLAYLISTS_FOR_VIDEO, CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";

const showVideoAction = (video, notFound, completionCode) => ({type: SHOW_VIDEO, video: video, notFound: notFound, completionCode: completionCode});
const listVideosAction = (videos) => ({type: LIST_VIDEOS, videos: videos});
const uploadVideoAction = completionCode => ({type: UPLOAD_VIDEO, completionCode: completionCode});
const listCategoriesForVideoAction = categories => ({type: LIST_CATEGORIES_FOR_VIDEO, categories: categories});
const deleteVideoAction = videoId => ({type: DELETE_VIDEO, completionCode: CODE_SUCCESS});
const editVideoAction = completionCode => ({type: EDIT_VIDEO, completionCode: completionCode});
const listLikesAction = likes => ({type: LIST_LIKES, likes: likes});
const addLikeAction = userId => ({type: ADD_LIKE, completionCode: CODE_SUCCESS});
const deleteLikeAction = userId => ({type: DELETE_LIKE, completionCode: CODE_SUCCESS});
const listCommentsAction = comments => ({type: LIST_COMMENTS, comments: comments});
const addCommentAction = comment => ({type: ADD_COMMENT, comment: comment});

export const listVideos = () => dispatch => 
    axios.get("/api/videos")
	 .then(response => dispatch(listVideosAction(response.data)))
	 .catch(error => console.log(error));


export const showVideo = videoId => dispatch =>
    axios.get("/api/videos/" + videoId)
	 .then(response => {
	     dispatch(showVideoAction(response.data, false, undefined))
	 })
	 .catch(error => {
	     console.log(error);
	     switch(error.response.status) {
		 case 401: dispatch(showVideoAction({}, true, CODE_FAILURE)); break;
		 case 404: dispatch(showVideoAction({}, true, undefined)); break;
		 default: console.log("in videos.showVideo.default");
	     }
	 });

export const uploadVideo = data => dispatch => {
    let formData = new FormData();
    formData.append("videoToUpload", data.file);
    formData.append("description", data.description);
    axios.post("/api/videos", formData)
	 .then(response => dispatch(uploadVideoAction(CODE_SUCCESS)))
	 .catch(error => {
	     console.log(error);
	     dispatch(uploadVideoAction(CODE_FAILURE));
	 });
}

export const listCategoriesForVideo = videoId => dispatch =>
    axios.get("/api/videos/" + videoId + "/categories")
	 .then(response => dispatch(listCategoriesForVideoAction(response.data)))
	 .catch(error => console.log(error));

export const deleteVideo = videoId => dispatch =>
    axios.delete("/api/videos/" + videoId)
	 .then(response => dispatch({type: DELETE_VIDEO, completionCode: CODE_SUCCESS}))
	 .catch(error => console.log(error));

export const editVideo = (videoId, video) => dispatch => 
    axios.put("/api/videos/" + videoId, video)
	 .then(response => dispatch(editVideoAction(CODE_SUCCESS)))
	 .catch(error => console.log(error));

export const addLike = (videoId, userId) => dispatch =>
    axios.post("/api/videos/" + videoId + "/likes", {userId: userId})
	 .then(response => dispatch(addLikeAction(userId)))
	 .catch(error => console.log(error));

export const deleteLike = (videoId, userId) => dispatch =>
    axios.delete("/api/videos/" + videoId + "/likes/" + userId)
	 .then(response => dispatch(deleteLikeAction(userId)))
	 .catch(error => console.log(error));

export const listLikes = videoId => dispatch =>
    axios.get("/api/videos/" + videoId + "/likes")
	 .then(response => dispatch(listLikesAction(response.data)))
	 .catch(error => console.log(error));

export const listComments = videoId => dispatch =>
    axios.get("/api/videos/" + videoId + "/comments")
	 .then(response => dispatch(listCommentsAction(response.data)))
	 .catch(error => console.log(error));

export const addComment = (videoId, userId, text) => dispatch =>
    axios.post("/api/videos/" + videoId + "/comments", {userId: userId, text: text})
	 .then(response => dispatch({type: ADD_COMMENT, completionCode: CODE_SUCCESS}))
	 .catch(error => console.log(error));

export const listPlaylistsForVideo = videoId => dispatch =>
    axios.get("/api/videos/" + videoId + "/playlists")
	 .then(response => dispatch({type: LIST_PLAYLISTS_FOR_VIDEO, playlists: response.data}))
	 .catch(error => console.log(error));
