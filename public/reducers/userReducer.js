import initialState from "../store/state.js";
import { LIST_USERS, SHOW_USER, AUTHORIZE_USER, USER_LOGGED_IN, LOGOUT_USER, REGISTER_USER, DELETE_USER, EDIT_USER, ADMIN_ACCESS } from "../actions/constants.js";

const userReducer = (state = initialState, action) => {
    switch (action.type) {
	case LIST_USERS:
	    return {...state, users: action.users, completionCode: undefined};
	case SHOW_USER:
	    return {...state, currentUser: action.currentUser, completionCode: undefined};
	case AUTHORIZE_USER:
	    return {...state, completionCode: action.completionCode};
	case USER_LOGGED_IN:
	    return {...state, loggedIn: action.logIn, userData: action.userData, completionCode: undefined, isAdminAccess: action.isAdminAccess};
	case LOGOUT_USER:
	    return {...state, loggedIn: false, userData: undefined, isAdminAccess: false};
	case REGISTER_USER:
	    return {...state, completionCode: action.completionCode};
	case DELETE_USER:
	    return {...state, users: state.users.filter(el => el.id !== action.userId)};
	case EDIT_USER:
	    return {...state, completionCode: action.completionCode};
	default:
	    return state;
    }
};

export default userReducer;
