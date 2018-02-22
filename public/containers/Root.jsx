import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./App.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

const Root = ({ store }) => (
    <Provider store={store}>
	<BrowserRouter>
	    <div>
		<Switch>
		    <Route path="/login" component={Login}/>
		    <Route path="/register" component={Register}/>
		    <Route path="/" component={App}/>
		</Switch>
	    </div>
	</BrowserRouter>
    </Provider>
);

export default Root;
