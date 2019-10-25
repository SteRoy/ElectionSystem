import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "./home";
import Vote from "./vote";

ReactDOM.render(
    <Router>
        <React.Fragment>
            <div className="wrap">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/vote/:voter" component={Vote} />
                </Switch>
            </div>
        </React.Fragment>
    </Router>,
    document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
