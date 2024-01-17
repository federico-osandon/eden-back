import bcrypt from 'bcrypt'

/**
 * The function `createHash` takes a password as input and returns a promise that resolves to the
 * hashed password using bcrypt with a salt factor of 10.
 */
export const createHash = password => new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
        if(err) reject(err)
        resolve(hash)
    })
})

/**
 * The function `isValidPassword` checks if a given password matches the hashed password of a user.
 * @param password - The `password` parameter is the password that the user is trying to validate.
 * @param user - The `user` parameter is an object that represents a user. It typically contains
 * information about the user, such as their username, email, and password. In this case, the `user`
 * object is expected to have a `password` property, which is the password that needs to be compared
 * with
 */
export const isValidPassword = (password, user) => new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, result) => {
        if(err) reject(err)
        resolve(result)
    })
})