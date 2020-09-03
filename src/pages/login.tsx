import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import LoginForm from "../components/forms/login";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "92vh",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
        },
        avatar_size: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
        textField: {
            margin: 5,
        },
        btn_login: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80px",
        },
    }),
);

const Login: React.FC = (): JSX.Element => {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={6} className={classes.form}>
                <Box>
                    <img src="/ghff.png" alt="..." width="100%" height="100%" />
                </Box>
            </Grid>
            <Grid item xs={6} className={classes.form}>
                <Box>
                    <Avatar src="/broken-image.jpg" className={classes.avatar_size} />
                </Box>
                <Box>
                    <Typography variant="h3">WELCOME</Typography>
                </Box>
                <Box>
                    <LoginForm />
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
