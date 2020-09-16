import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./context/auth";

export enum RouteParams {
    home = "/",
    login = "/login",
}

interface CustomRouteProps {
    component: React.FC;
    path: RouteParams;
    exact: boolean;
}

export function AuthenticatedRoute({ component: Component, ...rest }: CustomRouteProps): JSX.Element {
    const { authState } = useContext(AuthContext);
    console.log({ authState });
    return <Route {...rest} render={() => (authState.ok ? <Component /> : <Redirect to="/login" />)} />;
}

export function UnauthenticatedRoute({ component: Component, ...rest }: CustomRouteProps): JSX.Element {
    const { authState } = useContext(AuthContext);
    console.log({ authState });
    return <Route {...rest} render={() => (!authState.ok ? <Component /> : <Redirect to="/" />)} />;
}
