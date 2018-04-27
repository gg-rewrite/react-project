import initialState from "../store/state.js";
import { LIST_CATEGORIES, SHOW_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY, ADD_CATEGORY, LIST_VIDEOS_IN_CATEGORY, ADD_VIDEO_TO_CATEGORY, DELETE_VIDEO_FROM_CATEGORY, LIST_CATEGORIES_FOR_VIDEO } from "../actions/constants.js";

const  categoryReducer = (state = initialState, action) => {
    switch (action.type) {
	case LIST_CATEGORIES:
	    return {...state, categories: action.categories, completionCode: undefined};
	case SHOW_CATEGORY:
	    return {...state, currentCategory: action.category, completionCode: undefined};
	case EDIT_CATEGORY:
	    return {...state, completionCode: action.completionCode};
	case ADD_CATEGORY:
	    return {...state, completionCode: action.completionCode};
	case DELETE_CATEGORY:
	    return {...state, completionCode: action.completionCode};
	case LIST_VIDEOS_IN_CATEGORY:
	    return {...state, videos: action.videos};
	case ADD_VIDEO_TO_CATEGORY:
	    return {...state, completionCode: action.completionCode};
	case DELETE_VIDEO_FROM_CATEGORY:
	    return {...state, completionCode: action.completionCode};
	case LIST_CATEGORIES_FOR_VIDEO:
	    return {...state, completionCode: undefined};
	default: return state;
    }
};

export default categoryReducer;
