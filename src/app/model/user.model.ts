export interface IUser {
    id?: number,
    nom?: string,
    prenom?: string,
    email?: string,
    password?: string,
    username?: string,
    accessToken?: string,
    roles?: string[],
    tokenType?: string,
}