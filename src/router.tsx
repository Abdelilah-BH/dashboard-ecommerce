import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import { AuthenticatedRoute } from "./customRoute";
import { UserContext } from "./App";

const Router: React.FC = () => {
    const { isAuth } = useContext(UserContext);
    return (
        <Switch>
            {console.log({ isAuth })}
            <Route path="/login" exact component={Login} />
            <AuthenticatedRoute path="/" exact component={Home} isAuth={isAuth} />
        </Switch>
    );
};

export default Router;
