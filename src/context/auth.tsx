import { createContext } from "react";

interface IName {
    first: string;
    last: string;
}

interface IAuthContext {
    at: string;
    _id: string;
    name: IName;
}

const auth_context = createContext<IAuthContext>({
    at: "",
    _id: "",
    name: {
        first: "",
        last: "",
    },
});

export default auth_context;
