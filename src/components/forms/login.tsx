import React, { useContext, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import AuthContext from "../../context/auth";

const useStyles = makeStyles(() =>
    createStyles({
        textField: {
            margin: 0,
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

interface SignInOutput {
    ok: string;
    access_token: string;
}

interface SignInInput {
    email: string | undefined;
    password: string | undefined;
}

const FormLogin: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const { authActions } = useContext(AuthContext);
    const [login, { error, loading }] = useMutation<{ signin: SignInOutput }, SignInInput>(LOGIN);
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { email: email.current?.value, password: password.current?.value },
            });
            authActions.login({ ok: data?.signin?.ok, at: data?.signin?.access_token });
            history.push("/");
        } catch (err) {
            console.log(err);
            // console.log({ err: err });
        }
    };
    // eslint-disable-next-line react/prop-types
    return (
        <React.Fragment>
            <form method="POST" autoComplete="off" onSubmit={handleSubmit}>
                {error
                    ? error.message.split(". ").map((el, i) => (
                          <p key={i} style={{ color: "red" }}>
                              * {el}
                          </p>
                      ))
                    : null}
                <div>
                    <TextField
                        required
                        id="email"
                        inputRef={email}
                        label="Email"
                        name="email"
                        className={classes.textField}
                        fullWidth
                    />
                </div>
                <TextField
                    required
                    id="password"
                    name="password"
                    inputRef={password}
                    label="Password"
                    fullWidth
                    type="password"
                    className={classes.textField}
                />
                <Box className={classes.btn_login}>
                    <Button type="submit" color="primary" variant="contained" disabled={loading} fullWidth>
                        Sign in
                    </Button>
                </Box>
            </form>
        </React.Fragment>
    );
};

export default FormLogin;
