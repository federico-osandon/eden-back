import { Router } from 'express'
import { SessionController } from '../../controllers/sessions.controller.js'
import { validateSchema } from '../../middlewares/index.js'
import { loginSchema, registerSchema } from '../../schemasValidation/sessions.schemas.js'

const { register, login, logout } = new SessionController()
export const sessionsRouter = Router()

/* The code is defining the routes for registering, logging in, and logging out a user. */
sessionsRouter
    .post('/register', [ validateSchema(registerSchema) ], register)
    .post('/login',    [ validateSchema(loginSchema) ],    login)
    .post('/logout', logout)



