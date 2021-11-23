interface UserInterface {
    username: string; 
    email: string;
    bio: string; 
    first_name: string;
    last_name: string;
    location: string;
    is_admin: boolean;
}

interface ContextInterface {
    currUser: UserInterface | null;
}

interface LoginFormInterface {
    username: string;
    password: string; 
}

interface SignUpFormInterface extends LoginFormInterface {
    first_name: string;
    last_name: string; 
    email: string;
    location: string;
}

export type {
    UserInterface,
    ContextInterface,
    LoginFormInterface,
    SignUpFormInterface
}