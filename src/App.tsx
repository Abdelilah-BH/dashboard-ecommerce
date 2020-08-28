import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import { AuthenticatedRoute, RouteParams } from "./customRoute";

const App: React.FC = () => {
    return (
        <Switch>
            <Route path={RouteParams.login} exact component={Login} />
            <AuthenticatedRoute path={RouteParams.home} component={Home} />
        </Switch>
    );
};

export default App;
