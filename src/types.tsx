export interface IUser {
    isAuth: boolean;
}

export interface UserContextType {
    isAuth: boolean;
    setIsAuth: (value: boolean) => void;
}

export interface SigninInput {
    email: string;
    password: string;
}
