import { createContext } from "react";

interface IName {
    first: string;
    last: string;
}

export interface IAuthContext {
    ok: boolean | string | undefined;
    at: string | undefined;
}

const auth_context = createContext({
    authState: {
        ok: false,
        at: "",
    },
    authActions: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        login: (_: any) => {
            //
        },
    },
});

export default auth_context;
