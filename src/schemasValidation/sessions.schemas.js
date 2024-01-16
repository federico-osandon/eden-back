import { z } from 'zod'

/* The code is defining a schema for validating registration data. The schema specifies that the
registration data should be an object with the following properties: */
export const registerSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string({
        required_error: 'Email is required.'
    }).email({
        message: 'is not a valid email.'
    }),
    password: z.string({
        required_error: 'Password is required.'
    }).min(8, {
        message: 'must be at least 8 characters.'
    })
})

/* The code is defining a schema for validating login data. */
export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required.'
    }).email(),
    password: z.string({
        required_error: 'Password is required.'
    }).min(8)
})