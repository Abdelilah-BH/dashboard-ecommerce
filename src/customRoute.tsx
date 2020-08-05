import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";

interface RouteParams {
    // eslint-disable-next-line @typescript-eslint/ban-types
    "/": {};
    // eslint-disable-next-line @typescript-eslint/ban-types
    "/login": {};
}

type RoutePath = keyof RouteParams;

type Params<TPath extends RoutePath> = TPath extends RoutePath ? RouteParams[TPath] : never;

interface CustomRouteProps<TPath extends RoutePath> extends Omit<RouteProps, "component" | "path" | "isAuth"> {
    // tie our component type to our path type
    component: React.ComponentType<Params<TPath>>;
    path: TPath;
    isAuth: boolean | unknown;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function AuthenticatedRoute<TPath extends RoutePath>({
    component: Component,
    ...rest
}: CustomRouteProps<TPath>) {
    return (
        <Route
            {...rest}
            render={({ match: { params } }) => {
                if (rest.isAuth) return <Component {...params} />;
                return <Redirect to="/login" />;
            }}
        />
    );
}
