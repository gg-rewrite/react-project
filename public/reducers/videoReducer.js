import initialState from "../store/state.js";
import { LIST_VIDEOS, LIST_CATEGORIES_FOR_VIDEO,  SHOW_VIDEO, UPLOAD_VIDEO, DELETE_VIDEO, EDIT_VIDEO, LIST_LIKES, ADD_LIKE, DELETE_LIKE, LIST_COMMENTS, ADD_COMMENT, LIST_PLAYLISTS_FOR_VIDEO, CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js"

const videoReducer = (state = initialState, action) => {
    console.log(action);
    switch(action.type) {
	case LIST_VIDEOS:
	    return {...state, videos: action.videos, completionCode: undefined};
	case SHOW_VIDEO:
	    return {...state, currentVideo: action.video, notFound: action.notFound, completionCode: action.completionCode};
	case UPLOAD_VIDEO:
	    return {...state, completionCode: action.completionCode};
	case LIST_CATEGORIES_FOR_VIDEO:
	    return {...state, categories: action.categories, completionCode: undefined};
	case EDIT_VIDEO:
	    return {...state, completionCode: action.completionCode};
	case DELETE_VIDEO:
	    return {...state, completionCode: action.completionCode};
	case LIST_LIKES:
	    return {...state, likes: action.likes, completionCode: undefined};
	case ADD_LIKE:
	    return {...state, completionCode: action.completionCode};
	case DELETE_LIKE:
	    return {...state, completionCode: action.completionCode};
	case LIST_COMMENTS:
	    return {...state, comments: action.comments, completionCode: undefined};
	case ADD_COMMENT:
	    return {...state, completionCode: action.completionCode};
	case LIST_PLAYLISTS_FOR_VIDEO:
	    return {...state, playlists: action.playlists};
	default:
	    return state;
    }
};

export default videoReducer;
