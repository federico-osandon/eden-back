import mongoose from "mongoose"
import dotenv from "dotenv"
import { program } from "./commander.js"

const { mode } = program.opts()
dotenv.config({ path: mode === 'development' ? './.env.development' : './.env' })

export const serverConfigObject= {
    PORT: process.env.PORT || 8080,
    HOST: process.env.HOST || 'localhost',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/technicoders',
    cookieSecret: process.env.COOKIE_SECRET || 'secret',
    jwtSecret: process.env.JWT_SECRET || 'secret',
    corsConfig: {
        origin: 'https://65a8f9a9ab924f61f8cd2988--warm-fenglisu-c02f22.netlify.app',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204,
      }
}

export const connectDB = async () => { 
    try {
        await mongoose.connect(process.env.MONGO_URL)
        // await mongoose.connect('mongodb+srv://Federico:Federico1**@coderexample.hjzrdtr.mongodb.net/?retryWrites=true&w=majority')
        console.log('MongoDB Connected')
    } catch (error) {
        console.log(error)
    }
} 

