import { usersService } from "../service/index.js"
import { createHash, createToken, isValidPassword } from "../utils/index.js"


export class SessionController {
    constructor(){
        this.usersService = usersService
    }

    /**
     * The `register` function is an asynchronous function that handles the registration process for a
     * user, including checking if the user already exists, creating a new user, generating a token,
     * and sending a response with the user's information.
     * @param req - The `req` parameter is the request object that contains information about the
     * incoming HTTP request, such as the request headers, request body, and request parameters.
     * @param res - The `res` parameter is the response object that is used to send the response back
     * to the client. It contains methods and properties that allow you to set the response status,
     * headers, and body.
     * @returns a JSON response with the following properties:
     * - status: 'success' or 'error'
     * - result: an object containing the id, first_name, last_name, and email of the created user
     */
    async register (req, res){
        try {            
            const { email, password, first_name, last_name } = req.body
            const userFound = await usersService.getUser({email})
            if(userFound) return res.status(400).json({ status: 'error', message: ['User already exists'] })
            const userNew = { email, password: await createHash(password), first_name, last_name }
            const result = await usersService.createUser(userNew)
            if(!result) return res.status(400).json({ status: 'error', message: ['User could not be created'] })
            const token = await createToken({ id: result.id })
            res.status(200).cookie('token', token, {
                    httpOnly: true,
                    // secure: true,
                    // sameSite: 'none'
            }).json({
                status: 'success',
                payload: {
                    id: result._id,
                    first_name: result.first_name,
                    last_name: result.last_name,
                    email: result.email,                   
                }
            })
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message })
        }
    }

    /**
     * This function handles the login process by checking the user's email and password, creating a 
     * token, and sending a response with the user's information.
     * @param req - The `req` parameter is the request object that contains information about the
     * incoming HTTP request, such as the request headers, request body, and request parameters. It is
     * used to retrieve data from the request, such as the email and password entered by the user.
     * @param res - The `res` parameter is the response object that is used to send the response back
     * to the client. It contains methods and properties that allow you to set the status code,
     * headers, and send the response body.
     * @returns a response object with a status code and a JSON object containing the status and 
     * result.
     */
    async login (req, res){
        try {          
            const { email, password } = req.body
            const userFound = await usersService.getUser({email})
            if(!userFound) return res.status(400).json({ status: 'error', message: ['User not found with this email'] })
            const isMatchPassword = await isValidPassword(password, {password: userFound.password})
            if(!isMatchPassword) return res.status(400).json({ status: 'error', message: ['Password is incorrect'] })
            const token = await createToken({ id: userFound.id, first_name: userFound.first_name, role: userFound.role })  
                // secure: true,
                // sameSite: 'none'
            // })
            res.cookie('token', token, { 
                httpOnly: true, 
                maxAge: 60*60*1000*24, 
                secure: true, 
                sameSite: 'none'
            }).json({ 
                    status: 'success', 
                    payload: {
                        id: userFound._id,
                        first_name: userFound.first_name,
                        last_name: userFound.last_name,
                        email: userFound.email,                   
                    }
                })
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message })
        }
    }
    
    /**
     * The above function is an asynchronous function that handles the logout functionality by clearing
     * the token cookie and sending a 200 status code.
     * @param req - The `req` parameter is the request object, which contains information about the
     * incoming HTTP request such as headers, query parameters, and request body.
     * @param res - The `res` parameter is the response object that is used to send the response back
     * to the client. It contains methods and properties that allow you to set the status code,
     * headers, and body of the response.
     */
    async logout (req, res){
        try {            
            res.status(200).cookie('token', '', {
                    httpOnly: true,
                    // secure: true,
                    expires: new Date(0),
                }).sendStatus(200)
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message })
        }
    }
}