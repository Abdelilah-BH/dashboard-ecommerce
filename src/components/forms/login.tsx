import React from "react";
import { gql, useMutation } from "@apollo/client";
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

const LOGIN = gql`
    mutation Signin($email: String!, $password: String!) {
        signin(input: { email: $email, password: $password }) {
            ok
            access_token
        }
    }
`;

const FormLogin: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const [login] = useMutation(LOGIN);
    return (
        <form
            method="POST"
            autoComplete="off"
            onSubmit={(e) => {
                e.preventDefault();
                login({ variables: { email: "bouhou@gmail.com", password: "123casaraja" } });
            }}
        >
            <TextField required id="email" label="Email" name="email" className={classes.textField} fullWidth />
            <TextField
                required
                id="password"
                name="password"
                label="Password"
                fullWidth
                type="password"
                className={classes.textField}
            />
            <Box className={classes.btn_login}>
                <Button type="submit" color="primary" variant="contained" fullWidth>
                    Sign in
                </Button>
            </Box>
        </form>
    );
};

export default FormLogin;
