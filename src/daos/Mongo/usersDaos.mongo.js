import userModel from './models/users.model.js'

export class UserDaoMongo {
    constructor(){
        this.userModel = userModel
    }    
    
    /**
     * The function retrieves a paginated list of users with a specified limit and page number, sorted
     * by their creation date in descending order.
     * @returns the result of the `paginate` method called on the `userModel`. The `paginate` method is
     * being passed an empty query object `{}` and an options object `{ limit, page, sort: {created_at:
     * -1}, lean: true }`. The options object specifies the limit and page for pagination, the sorting
     * order based on the `created_at` field in descending
     */
    async get({limit = 10, page = 1}) {
        return await this.userModel.paginate({}, { limit, page, sort: {created_at: -1}, lean: true })
    }
    
    /**
     * The function `getBy` is an asynchronous function that retrieves a single document from the
     * `userModel` collection based on the provided filter.
     * @param filter - The filter parameter is an object that specifies the conditions that the
     * document must meet in order to be returned. It is used to query the database and find a single
     * document that matches the specified filter criteria.
     * @returns The `getBy` function is returning a promise that resolves to the result of the
     * `findOne` method call on the `userModel` with the provided `filter`.
     */
    async getBy(filter){
        return await this.userModel.findOne(filter)
    }
    
    /**
     * The function creates a new user using the provided userNew object.
     * @param userNew - The parameter `userNew` is an object that contains the data for creating a new
     * user.
     * @returns a promise that resolves to the result of creating a new user using the
     * `userModel.create()` method.
     */
    async create(userNew){
        return await this.userModel.create(userNew)
    }
    
    /**
     * The function updates a user document in the database with the provided user update data.
     * @param uid - The uid parameter is the unique identifier of the user that you want to update. It
     * is used to find the user in the database.
     * @param userUpdate - The userUpdate parameter is an object that contains the updated fields and
     * values for the user. It is used to update the user document in the database.
     * @returns The updated user document is being returned.
     */
    async update(uid, userUpdate){
        return await this.userModel.findByIdAndUpdate({_id: uid}, userUpdate, {new: true})
    }
    
    /**
     * The delete function updates the isActive field of a user with the given uid to false.
     * @param uid - The uid parameter is the unique identifier of the user that you want to delete. It
     * is used to find the user in the database and update their isActive field to false.
     * @returns The updated user document with the isActive field set to false.
     */
    async delete(uid){
        return await this.userModel.findByIdAndUpdate({_id: uid}, {isActive: false}, {new: true})
    }
}

