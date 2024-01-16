import { z } from 'zod'

/* The code is defining a user schema using the Zod library in JavaScript. */
export const userSchema = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().email({
        message: 'Invalid email format'
    }).optional(),
    isActive: z.boolean({
        required_error: 'isActive is required'
    }),
    role: z.string({
        required_error: 'role is required'
    }),    
})