import express     from 'express'
import logger      from 'morgan'
import cookie      from 'cookie-parser'
import cors        from 'cors'
import compression from 'express-compression'
import { connectDB, serverConfigObject } from './config/index.js'
import appRouter   from './routes/index.js'


const app = express()
const { PORT, cookieSecret } = serverConfigObject

/* These lines of code are configuring and setting up various middleware functions for the Express
application. */
app.disable('x-powered-by')
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookie(cookieSecret))
// app.use(compression({ brotli: { enabled: true, zlib: {} }}))

app.use(appRouter)

/**
 * The `httpServer` function connects to a database and starts a server listening on a specified port.
 */
export const httpServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error) 
    }
}
