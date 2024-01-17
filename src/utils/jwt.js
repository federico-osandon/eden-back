import jwt from 'jsonwebtoken'
import { serverConfigObject } from '../config/index.js'

/**
 * The function `createToken` generates a JSON Web Token (JWT) using the provided payload and a secret
 * key, and returns the token as a promise.
 * @param payload - The payload is an object that contains the data that you want to include in the
 * token. This can be any information that you want to associate with the token, such as user details
 * or permissions.
 * @returns a Promise that resolves to a token.
 */
export async function createToken(payload){
    /* The code is creating a new Promise that wraps the `jwt.sign` function. */
    return new Promise((resolve, reject) => {
        jwt.sign(payload, serverConfigObject.jwtSecret, { expiresIn: '1d' }, (error, token) => {
            if(error) reject(error)
            resolve(token)
        })
    })
}

/**
 * The function `verifyToken` is an asynchronous function that verifies a token using a secret key and
 * returns a promise that resolves with the decoded token if it is valid, or rejects with an error if
 * it is not valid.
 * @param token - The `token` parameter is a string representing the JWT (JSON Web Token) that needs to
 * be verified.
 * @returns a Promise object.
 */
export async function verifyToken(token){
    /* The code `return new Promise((resolve, reject) => { ... })` is creating a new Promise object. */
    return new Promise((resolve, reject) => {
        jwt.verify(token, serverConfigObject.jwtSecret, (error, decoded) => {
            if(error) reject(error)
            resolve(decoded)
        })
    })
}


