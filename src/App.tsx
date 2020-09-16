import React, { useState } from "react";
import { Switch as SwitchRoute } from "react-router-dom";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Login from "./pages/login";
import Home from "./pages/home";
import { AuthenticatedRoute, RouteParams, UnauthenticatedRoute } from "./customRoute";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import AuthContext from "./context/auth";

const init_context = {
    ok: false,
    at: "",
};

const useStyles = makeStyles(() =>
    createStyles({
        switch: {
            display: "flex",
            height: "8vh",
            justifyContent: "end",
            alignItems: "center",
            width: "100%",
        },
    }),
);
const App: React.FC = () => {
    const prefersDarkMode: string = JSON.stringify(localStorage.getItem("theme"));
    const classes = useStyles();
    const [darkMode, setDarkMode] = useState(JSON.parse(prefersDarkMode));
    const [auth, setAuth] = useState(init_context);
    const login = (data: { ok: boolean; at: string }) => {
        setAuth(data);
    };
    const actions = { login };
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: darkMode,
                    primary: {
                        main: "#2C1654",
                    },
                    secondary: {
                        main: "#FF6969",
                    },
                    error: {
                        main: "#D8000C",
                    },
                    success: {
                        main: "#OOBE65",
                    },
                    warning: {
                        main: "#FDBF50",
                    },
                },
            }),
        [darkMode],
    );
    return (
        <AuthContext.Provider value={{ authState: auth, authActions: actions }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className={classes.switch}>
                    <label>Dark mode</label>
                    <Switch
                        defaultChecked={darkMode === "dark" ? true : false}
                        color="default"
                        onChange={(e) => {
                            const theme = e.target.checked ? "dark" : "light";
                            localStorage.setItem("theme", theme);
                            setDarkMode(theme);
                        }}
                    />
                </div>
                <Divider />
                <SwitchRoute>
                    <UnauthenticatedRoute path={RouteParams.login} exact component={Login} />
                    <AuthenticatedRoute path={RouteParams.home} exact component={Home} />
                </SwitchRoute>
            </ThemeProvider>
        </AuthContext.Provider>
    );
};

export default App;
