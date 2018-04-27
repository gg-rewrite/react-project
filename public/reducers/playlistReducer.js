import initialState from "../store/state.js";
import {LIST_PLAYLISTS, SHOW_PLAYLIST, EDIT_PLAYLIST, DELETE_PLAYLIST, ADD_PLAYLIST, LIST_VIDEOS_IN_PLAYLIST, ADD_VIDEO_TO_PLAYLIST, DELETE_VIDEO_FROM_PLAYLIST, LIST_PLAYLISTS_FOR_VIDEO, CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";

const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
	case LIST_PLAYLISTS:
	    return {...state, playlists: action.playlists, completionCode: undefined};
	case SHOW_PLAYLIST:
	    return {...state, currentPlaylist: action.playlist, completionCode: undefined};
	case ADD_PLAYLIST:
	    return {...state, completionCode: action.completionCode};
	case DELETE_PLAYLIST:
	    return {...state,
		    playlists: state.playlists.filter(el => el.id != action.playlistId),
		    completionCode: undefined
	    };
	case EDIT_PLAYLIST:
	    return {...state, completionCode: action.completionCode};
	case LIST_VIDEOS_IN_PLAYLIST:
	    return {...state, completionCode: undefined, videos: action.videos};
	case ADD_VIDEO_TO_PLAYLIST:
	    return {...state, completionCode: action.completionCode};
	case DELETE_VIDEO_FROM_PLAYLIST:
	    console.log(state);
	    return {...state,
		    completionCode: CODE_SUCCESS,
		    videos: state.playlists.filter(el => el.id != action.videoId)
	    };
	case LIST_PLAYLISTS_FOR_VIDEO:
	    return {...state, completionCode: undefined};
	default: return state;
    }
};

export default playlistReducer;
