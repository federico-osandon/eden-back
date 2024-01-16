import { Schema, model } from 'mongoose'
import mongoosePaginate  from 'mongoose-paginate-v2'

/* The code is defining a Mongoose schema for a user object. The schema specifies the structure and
properties of a user document in a MongoDB collection. */
const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
        // select: false // hide password from query results
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'user-premium', 'public'],
        default: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: Date
})

/* `UserSchema.plugin(mongoosePaginate)` is adding pagination functionality to the UserSchema. It is
using the `mongoose-paginate-v2` plugin to enable pagination for querying the user collection. This
allows for easier retrieval of a subset of user documents at a time, rather than retrieving all
documents at once. */
UserSchema.plugin(mongoosePaginate)

/* `export default model('users', UserSchema)` is exporting a Mongoose model for the user schema. */
export default model('users', UserSchema)

