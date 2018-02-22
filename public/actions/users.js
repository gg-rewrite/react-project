import axios from "axios";
import { LIST_USERS, SHOW_USER, AUTHORIZE_USER, USER_LOGGED_IN, LOGOUT_USER, REGISTER_USER, DELETE_USER, EDIT_USER,  CODE_SUCCESS, CODE_FAILURE, ADMIN_ACCESS } from "./constants.js";

const listUsersAction = () => ({type: LIST_USERS});
const showUserAction = user => ({type: SHOW_USER, currentUser: user});
const loginAction = completionCode => ({type: AUTHORIZE_USER, completionCode: completionCode });
const isLoggedInAction = (logIn, userData, isAdminAccess) => ({type: USER_LOGGED_IN, logIn: logIn, userData: userData, isAdminAccess: isAdminAccess});
const logoutAction = () => ({type: LOGOUT_USER});
const registerAction = completionCode => ({type: REGISTER_USER, completionCode: completionCode});

export const showUser = userId => dispatch =>
    axios.get("/api/users/" + userId)
	 .then(response => dispatch(showUserAction(response.data)))
	 .catch(error => console.log(error));

export const login = (id, pw) => dispatch =>
    axios.post("/api/auth", {login: id, password: pw})
	 .then(response => {
	     dispatch(loginAction(CODE_SUCCESS));
	 }).catch(error => {
	     dispatch(loginAction(CODE_FAILURE));
	 });

export const isLoggedIn = () => dispatch =>  
    axios.get("/api/auth")
	 .then(response => axios.get("/api/users/" + response.data.id) 
	 ).then( response => 
	      dispatch(isLoggedInAction(
		 true,
		 response.data,
		 response.data.role_id === 1 ? true : false
	     ))
	 ).catch(error => {
	     dispatch(isLoggedInAction(false, "", false));
	 });

export const logout = () => dispatch =>
    axios.post("/api/auth/logout")
	 .then(dispatch(logoutAction()))
	 .catch(error => console.log(error));

export const register = (id, pw) => dispatch =>
    axios.post("/api/users", {login: id, password: pw})
	 .then( response => {
	     console.log(response.status);
	     dispatch(registerAction(CODE_SUCCESS));
	 }).catch(error => {
	     console.log(error);
	     dispatch(registerAction(CODE_FAILURE));
	 });

export const listUsers = () => dispatch =>
    axios.get("/api/users")
	 .then(response => dispatch({type: LIST_USERS, users: response.data}))
	 .catch(error => console.log(error));

export const deleteUser = userId => dispatch =>
    axios.delete("/api/users/" + userId)
	 .then(response => dispatch({type: DELETE_USER, userId: userId}))
	 .catch(error => console.log(error));

export const editUser = (userId, user) => dispatch =>
    axios.put("/api/users/" + userId, user)
	 .then(response => dispatch({type: EDIT_USER, completionCode: CODE_SUCCESS}))
	 .catch(error => console.log(error));
