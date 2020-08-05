/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Box from "@material-ui/core/Box";
import { gql, useMutation } from "@apollo/client";
import { UserContext } from "./App";
import { IUser, SigninInput } from "./types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& > *": {
                margin: theme.spacing(2),
                width: "50ch",
            },
        },
    }),
);

const Signin = gql`
    mutation Signin($email: String!, $password: String!) {
        signin(input: { email: $email, password: $password }) {
            ok
            message
        }
    }
`;

const Login: React.FC = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signin, { data }]: any[] = useMutation<{ signin: IUser }, SigninInput>(Signin, {
        variables: { email, password },
    });
    const { setIsAuth } = useContext(UserContext);
    return (
        <Box width="100%" display="flex">
            <Box width="50%">
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validate={(values) => {
                        const errors: Partial<SigninInput> = {};
                        const regex_email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                        if (!values.email) {
                            errors.email = "Required";
                        } else if (!regex_email.test(values.email)) {
                            errors.email = "Invalid email address";
                        }
                        if (!values.password) {
                            errors.password = "Required";
                        }
                        return errors;
                    }}
                    onSubmit={(input: SigninInput, { setSubmitting }: FormikHelpers<SigninInput>) => {
                        setEmail(input.email);
                        setPassword(input.password);
                        signin();
                        setIsAuth(data && data.signin.ok);
                        setSubmitting(false);
                    }}
                >
                    {/* {console.log({ user })} */}
                    {({ submitForm, isSubmitting }) => (
                        <Form className={classes.root}>
                            {data && data.signin && !!data.signin.ok ? (
                                <Alert variant="outlined" severity="success">
                                    {data.signin.message}
                                </Alert>
                            ) : data && data.signin && !data.signin.ok ? (
                                <Alert variant="outlined" severity="error">
                                    {data.signin.message}
                                </Alert>
                            ) : null}
                            <Field component={TextField} name="email" type="email" label="Email" />
                            {isSubmitting && <LinearProgress />}
                            <Field component={TextField} name="password" type="password" label="Password" />
                            {isSubmitting && <LinearProgress />}
                            <Button onClick={submitForm} color="primary" variant="contained" disabled={isSubmitting}>
                                Connecter
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
            <Box width="50%" bgcolor="info.main">
                <h1>Illustrator</h1>
            </Box>
        </Box>
    );
};

export default Login;
