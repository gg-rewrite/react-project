import axios from "axios";
import {LIST_PLAYLISTS, SHOW_PLAYLIST, EDIT_PLAYLIST, DELETE_PLAYLIST, ADD_PLAYLIST, LIST_VIDEOS_IN_PLAYLIST, ADD_VIDEO_TO_PLAYLIST, DELETE_VIDEO_FROM_PLAYLIST, CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";

export const listPlaylists = (userId) => dispatch => 
    axios.get("/api/users/" + userId + "/playlists")
	 .then(response => dispatch({type: LIST_PLAYLISTS, playlists: response.data}))
	 .catch(error => console.log(error));

export const showPlaylist = (userId, playlistId) => dispatch =>
    axios.get("/api/users/" + userId + "/playlists/" + playlistId)
	 .then(response => dispatch({type: SHOW_PLAYLIST, playlist: response.data}))
	 .catch(error => console.log(error));


export const addPlaylist = (userId, playlist) => dispatch =>
    axios.post("/api/users/" + userId + "/playlists", playlist)
	 .then(response => dispatch({type: ADD_PLAYLIST, completionCode: CODE_SUCCESS}))
	 .catch(error => console.log(error));

export const deletePlaylist = (userId, playlistId) => dispatch =>
    axios.delete("/api/users/" + userId + "/playlists/" + playlistId)
	 .then(response => dispatch({type: DELETE_PLAYLIST, playlistId: playlistId}))
	 .catch(error => console.log(error));

export const editPlaylist = (userId, playlistId, playlist) => dispatch =>
    axios.put("/api/users/" + userId + "/playlists/" + playlistId, playlist)
	 .then(response => dispatch({type: EDIT_PLAYLIST, completionCode: CODE_SUCCESS}))
	 .catch(error => console.log(error));

export const listVideosInPlaylist = (userId, playlistId) => dispatch =>
    axios.get("/api/users/" + userId + "/playlists/" + playlistId + "/videos")
	 .then(response => dispatch({type: LIST_VIDEOS_IN_PLAYLIST, videos: response.data}))
	 .catch(error => console.log(error));

export const addVideoToPlaylist = (userId, playlistId, videoId) => dispatch =>
    axios.post("/api/users/" + userId + "/playlists/" + playlistId + "/videos", {video_id: videoId})
	 .then(response => dispatch({type: ADD_VIDEO_TO_PLAYLIST, completionCode: CODE_SUCCESS}))
	 .catch(error => console.log(error));

export const deleteVideoFromPlaylist = (userId, playlistId, videoId) => dispatch =>
    axios.delete("/api/users/" + userId + "/playlists/" + playlistId + "/videos/" + videoId)
	 .then(response => dispatch({type: DELETE_VIDEO_FROM_PLAYLIST, videoId: videoId}))
	 .catch(error => console.log(error));
