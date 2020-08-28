export interface IUser {
    ok: boolean;
    message: string;
}

export interface UserContextType {
    isAuth: boolean;
    setIsAuth: (value: boolean) => void;
}

export interface SigninInput {
    email: string;
    password: string;
}
