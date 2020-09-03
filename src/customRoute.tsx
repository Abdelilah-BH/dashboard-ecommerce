import React from "react";
import { Route, Redirect } from "react-router-dom";

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
    return <Route {...rest} render={() => (false ? <Component /> : <Redirect to="/" />)} />;
}

export function UnauthenticatedRoute({ component: Component, ...rest }: CustomRouteProps): JSX.Element {
    return <Route {...rest} render={() => (true ? <Component /> : <Redirect to="/login" />)} />;
}
