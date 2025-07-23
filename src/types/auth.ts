export interface User {
    id: string;
    email: string;
    // role: 'HR' | 'Employee';
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    fullName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    // role: 'HR' | 'Employee';
}

export interface ErrorResponse {
    message: string;
}