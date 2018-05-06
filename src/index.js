import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Route, Switch } from "react-router-dom";

//ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(
	<HashRouter>
		<Switch>
			<Route path="/" name="Home" component={App} />
		</Switch>
	</HashRouter>,
	document.getElementById("root")
);
registerServiceWorker();
