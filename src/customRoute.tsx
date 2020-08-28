import React from "react";
import { Route, Redirect } from "react-router-dom";

export enum RouteParams {
    home = "/",
    login = "login",
}

interface CustomRouteProps {
    component: React.FC;
    path: RouteParams;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function AuthenticatedRoute({ component: Component, ...rest }: CustomRouteProps) {
    return (
        <Route
            {...rest}
            render={({ match: { params } }) => (false ? <Component {...params} /> : <Redirect to="/login" />)}
        />
    );
}
