import { verifyToken } from '../utils/index.js'

/**
 * The authentication function checks if a token exists in the request cookies, verifies the token, and
 * sets the user in the request object if the token is valid.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as headers, query parameters, and body data. It is an object that is passed to
 * the middleware function by the Express framework.
 * @param res - The `res` parameter is the response object in Express.js. It is used to send the
 * response back to the client.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically called at the end of the current middleware
 * function to indicate that it has completed its processing and the next middleware function should be
 * called.
 * @returns a middleware function that can be used to authenticate requests.
 */
export const authentication = async (req, res, next) => {
    try {
        const { token } = req.cookies   
        if (!token) return  res.status(401).json({status: 'error', message: 'Not token, authorization denied'})
        const user = await verifyToken(token)
        if (!user) return res.status(401).json({status: 'error', message: 'Invalid token'})
        req.user = user        
        next()
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message})
    }
}

/**
 * The `authorization` function is a middleware that checks if the user has the required role to access
 * a certain route.
 * @returns an asynchronous middleware function.
 */
export const authorization = roleArray => {
    return async (req, res, next) => {
        try {
            if(roleArray[0] === 'PUBLIC') return next()
            if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' })
            if (!roleArray.includes(req.user.role.toUpperCase())) return res.status(403).json({ status: 'error', message: 'Not permission' })
            next()
        } catch (error) {
            return res.status(500).json({ status: 'error', message: error.message })
        }
    }
}

