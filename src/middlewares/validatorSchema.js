/**
 * The `validateSchema` function is a middleware that validates the request body against a given schema
 * and returns an error response if the validation fails.
 * @param schema - The `schema` parameter is an object that represents the validation schema. It is
 * used to define the structure and constraints for validating the request body.
 * @returns In the catch block, a response with status code 400 is being returned. The response is in
 * JSON format and includes a status field with the value 'error' and a message field with an array of
 * error messages.
 */
export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        return res.status(400).json({ status: 'error', message: error.errors.map(err => err.message) })
    }
}
