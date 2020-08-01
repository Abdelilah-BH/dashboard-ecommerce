import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Formik, FormikHelpers, Form, Field } from "formik";

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

interface SigninInput {
    email: string;
    password: string;
}

interface SigninResult {
    ok: boolean;
    message: string
}

const Signin = gql`
    mutation Signin($email: String!, $password: String!) {
        signin(input: { email: $email, password: $password }) {
            ok
            message
        }
    }
`;

const App: React.FC = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signin, { error, data }] = useMutation<{ signin: SigninResult }, SigninInput>(Signin, {
        variables: { email, password },
    });
    return (
        <Box className="App">
            <header className="App-header">
                <Box width="100%" display="flex">
                    {error ? console.log(error) : null}
                    {data && data.signin ? <p>{JSON.stringify(data.signin)}</p> : null}
                    <Box width="50%">
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validate={(values: SigninInput) => {
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
                                setSubmitting(false);
                            }}
                        >
                            {({ submitForm, isSubmitting }) => (
                                <Form className={classes.root}>
                                    <Field component={TextField} name="email" type="email" label="Email" />
                                    {isSubmitting && <LinearProgress />}
                                    <Field component={TextField} name="password" type="password" label="Password" />
                                    {isSubmitting && <LinearProgress />}
                                    <Button
                                        onClick={submitForm}
                                        color="primary"
                                        variant="contained"
                                        disabled={isSubmitting}
                                    >
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
            </header>
        </Box>
    );
};

// App.propTypes = {};

export default App;
