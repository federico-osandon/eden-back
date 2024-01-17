import { Router } from 'express'
import { UsersController } from '../../controllers/users.controller.js'
import { authentication, authorization, validateSchema } from '../../middlewares/index.js'
import { registerSchema, userSchema } from '../../schemasValidation/index.js'

const { getUsers, getUser, createUser, updateUser, deleteUser } = new UsersController()
export const usersRouter = Router()

/* The code is defining the routes for the users API. */
usersRouter
    // .get('/',                   [authentication, authorization(['PUBLIC'])], getUsers)
    .get('/',                   [authentication, authorization(['ADMIN'])], getUsers)
    .get('/:uid([a-z0-9]+)',    [authentication, authorization(['ADMIN'])], getUser)
    .post('/',                  [authentication, authorization(['ADMIN']),  validateSchema(registerSchema)], createUser)
    .put('/:uid([a-z0-9]+)',    [authentication, authorization(['ADMIN']),  validateSchema(userSchema)], updateUser)
    .delete('/:uid([a-z0-9]+)', [authentication, authorization(['ADMIN'])], deleteUser)
    // .post('/',       [validateSchema(registerSchema)], createUser)
    // .put('/:uid',    [validateSchema(userSchema)], updateUser)



