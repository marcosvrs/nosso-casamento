import User from "../models/user";

export async function signIn(email: string, password: string) {
    const response = await fetch(`${process.env.AUTH_API_URL}accounts:signInWithPassword?key=${process.env.API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    });

    if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = response.statusText === '' ? `Something went wrong: ${response.status}` : response.statusText;
        if (errorId === 'EMAIL_NOT_FOUND') {
            message = 'This email could not be found!';
        } else if (errorId === 'INVALID_PASSWORD') {
            message = 'This password is not valid!';
        }
        throw new Error(message);
    }

    const responseData = await response.json();
    const expirationDate = new Date(
        new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    return new User(responseData.localId, responseData.idToken, responseData.refreshToken, expirationDate)
}

export async function signUp(email: string, password: string) {
    const response = await fetch(`${process.env.AUTH_API_URL}accounts:signUp?key=${process.env.API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    });

    if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = response.statusText === '' ? `Something went wrong: ${response.status}` : response.statusText;
        if (errorId === 'EMAIL_EXISTS') {
            message = 'This email exists already!';
        }
        throw new Error(message);
    }

    const responseData = await response.json();
    const expirationDate = new Date(
        new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    return new User(responseData.localId, responseData.idToken, responseData.refreshToken, expirationDate)
}

export async function refreshSign(refreshToken: string) {
    const response = await fetch(`${process.env.AUTH_API_URL}token?key=${process.env.API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            returnSecureToken: true
        })
    });

    if (!response.ok) {
        throw new Error(response.statusText === '' ? `Something went wrong: ${response.status}` : response.statusText);
    }

    const responseData = await response.json();
    const expirationDate = new Date(
        new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    return new User(responseData.localId, responseData.idToken, responseData.refreshToken, expirationDate)
}