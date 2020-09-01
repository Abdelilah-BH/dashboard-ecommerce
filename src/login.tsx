import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "90vh",
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
    }),
);

const Login: React.FC = (): JSX.Element => {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={6} className={classes.form}>
                <div>
                    <img src="/ghff.png" width="100%" height="100%" />
                </div>
            </Grid>
            <Grid item xs={6} className={classes.form}>
                <div>
                    <Avatar src="/broken-image.jpg" className={classes.avatar_size} />
                </div>
                <div>
                    <h2>WELCOME</h2>
                </div>
                <div>
                    <form method="POST" autoComplete="off">
                        <TextField required id="email" label="Email" className={classes.textField} fullWidth />
                        <TextField
                            required
                            id="password"
                            label="Password"
                            fullWidth
                            type="password"
                            className={classes.textField}
                        />
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default Login;
