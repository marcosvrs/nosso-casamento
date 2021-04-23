export default class User {
    readonly id: string;
    readonly token: string;
    readonly refreshToken: string;
    readonly expires: Date;

    constructor(id: string, token: string, refreshToken: string, expires: Date) {
        this.id = id;
        this.token = token;
        this.refreshToken = refreshToken;
        this.expires = expires;
    }
}