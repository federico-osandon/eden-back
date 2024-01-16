import { usersService } from "../service/index.js"
import { createHash } from "../utils/index.js"

export class UsersController {

    /**
     * The function `getUsers` is an asynchronous function that retrieves a list of users and sends a
     * response with the users' data.
     * @param req - The `req` parameter is the request object that contains information about the
     * incoming HTTP request, such as headers, query parameters, and request body.
     * @param res - The `res` parameter is the response object that is used to send the response back
     * to the client. It contains methods and properties that allow you to set the status code,
     * headers, and send the response body. In this code snippet, it is used to send a JSON response
     * with the status code
     */
    async getUsers(req, res){
        try {
            // const users = await usersService.getUsers()
            const users = await usersService.getUsers({limit: 5, page: 1})
            res.status(200).json({ status: 'success', results: users })            
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message })
        }
    }

    /**
     * The function `getUser` is an asynchronous function that retrieves a user based on their ID and
     * returns a JSON response with the user's information.
     * @param req - The req parameter is the request object that contains information about the
     * incoming HTTP request, such as headers, query parameters, and request body.
     * @param res - The `res` parameter is the response object that is used to send the response back
     * to the client. It contains methods and properties that allow you to set the status code,
     * headers, and send the response body.
     * @returns a JSON response with the status and result properties. If the user is found, it will
     * return a 200 status code with the user object in the result property. If the user is not found,
     * it will return a 404 status code with an error message. If there is an error during the
     * execution of the function, it will return a 500 status code with the error
     */
    async getUser(req, res){
        try {
            const { uid } = req.params
            const user = await usersService.getUser({_id: uid})        
            if (!user) return res.status(404).json({ status: 'error', message: 'User not found'})           
            res.status(200).json({ status: 'success', result: user })
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message })
        }
    }

    /**
     * This function creates a new user in a database with the provided information, after checking if
     * the user already exists.
     * @param req - The `req` parameter is the request object that contains information about the
     * incoming HTTP request, such as the request headers, request body, and request parameters.
     * @param res - The `res` parameter is the response object that is used to send the response back
     * to the client. It contains methods and properties that allow you to set the status code,
     * headers, and send the response body.
     * @returns a JSON response with the status and result properties. The status property indicates
     * the success or error status of the operation, and the result property contains the user
     * information if the operation was successful.
     */
    async createUser(req, res){
        try {
            const { first_name, last_name, email, password } = req.body
            const userFound = await usersService.getUser({email})
            if (userFound) return res.status(400).json({ status: 'error', message: 'User already exists' })
            const newUser = { first_name, last_name, email, password: await createHash(password) }
            const result = await usersService.createUser(newUser)
            res.status(200).json({ status: 'success', result: {
                    _id: result._id,
                    first_name: result.first_name,
                    last_name: result.last_name,
                    email: result.email,
                    createdAt: result.created_at
                }
            })
        } catch (error) {
            res.status(500).json({ status: 'error', error: error.message })
        }
    }

    /**
     * The function `updateUser` is an asynchronous function that updates a user's information and
     * sends a response with the updated data.
     * @param req - The `req` parameter is the request object that contains information about the
     * incoming HTTP request, such as the request headers, request body, and request parameters.
     * @param res - The `res` parameter is the response object that is used to send the response back
     * to the client. It is an instance of the Express `Response` object.
     */
    async updateUser(req, res){
        try {
            const { uid } = req.params
            const { first_name, last_name, role, isActive } = req.body
            const result = await usersService.updateUser(uid, { first_name, last_name, role, isActive, updated_at: Date.now() })
            res.status(200).send({ status: 'success', data: result })            
        } catch (error) {
            res.status(500).json({ status: 'error', error: error.message })
        }
    }

    /**
     * The deleteUser function is an asynchronous function that deletes a user based on the provided
     * user ID and returns a success message or an error message if an error occurs.
     * @param req - The `req` parameter is the request object that contains information about the
     * incoming HTTP request, such as the request headers, request parameters, request body, etc. It is
     * used to extract the `uid` parameter from the request URL.
     * @param res - The `res` parameter is the response object that is used to send the response back
     * to the client. It contains methods and properties that allow you to set the status code,
     * headers, and send the response body.
     */
    async deleteUser(req, res){
        try {
            const { uid } = req.params
            const result = await usersService.deleteUser(uid)
            res.status(200).json({ status: 'success', data: result })
        } catch (error) {
            res.status(500).json({ status: 'error', error: error.message })
        }
    }
}