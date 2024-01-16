import { Router } from 'express'
import { usersRouter } from './apiV1/users.router.js'
import { sessionsRouter } from './apiV1/sessions.router.js'

const router = Router()

/* The code `router.use('/api/v1/sessions', sessionsRouter)` is setting up a route for handling
requests to the '/api/v1/sessions' endpoint. It is using the `sessionsRouter` to handle these
requests. */
router.use('/api/v1/sessions', sessionsRouter)
router.use('/api/v1/users', usersRouter)

/* The code `router.use('*', (req, res) => {
    res.status(404).send('Not Found')
})` is a catch-all route that is used when none of the previous routes match the requested URL. */
router.use('*', (req, res) => {
    res.status(404).send('Not Found')
})

export default router

