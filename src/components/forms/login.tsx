import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() =>
    createStyles({
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

const FormLogin: React.FC = (): JSX.Element => {
    const classes = useStyles();
    return (
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
            <Box className={classes.btn_login}>
                <Button color="primary" variant="contained" fullWidth>
                    Sign in
                </Button>
            </Box>
        </form>
    );
};

export default FormLogin;
