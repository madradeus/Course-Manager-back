export interface UserEntity {
    id?: string;
    email: string;
    password: string;
    currentToken?: null | string;
}