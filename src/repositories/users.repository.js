export class UserRepository {
    constructor(dao) {
        this.dao = dao
    }   
    
    /**
     * The `getUsers` function retrieves users from a data source using a pagination filter.
     * @param paginateFilter - The `paginateFilter` parameter is an object that contains information
     * for pagination. It typically includes properties such as `page`, `limit`, and `sort` to specify
     * the page number, number of items per page, and sorting criteria for the query.
     * @returns The getUsers function is returning the result of the dao.get(paginateFilter) function
     * call.
     */
    async getUsers(paginateFilter) {
        return await this.dao.get(paginateFilter)
    }

    /**
     * The function `getUser` asynchronously retrieves a user from the database based on the provided
     * filter.
     * @param filter - The `filter` parameter is used to specify the criteria for filtering the user
     * data. It can be an object containing key-value pairs, where each key represents a field in the
     * user data and the corresponding value represents the desired value for that field. The `getUser`
     * function uses this filter to retrieve the
     * @returns The `getUser` function is returning the result of the `getBy` method called on the
     * `dao` object with the provided `filter`.
     */
    async getUser(filter) {
        return await this.dao.getBy(filter)
    }

    /**
     * The function `createUser` asynchronously creates a new user using the `newUser` object and
     * returns the result of the creation process.
     * @param newUser - The `newUser` parameter is an object that represents the data of a new user. It
     * typically contains properties such as `name`, `email`, `password`, and any other relevant
     * information needed to create a new user.
     * @returns The `createUser` function is returning the result of the `create` method from the `dao`
     * object.
     */
    async createUser(newUser) {
        return await this.dao.create(newUser)
    }

    /**
     * The function `updateUser` updates a user with the given `uid` using the `userToUpdate` object.
     * @param uid - The uid parameter is the unique identifier of the user that needs to be updated. It
     * is used to specify which user record should be updated in the database.
     * @param userToUpdate - The `userToUpdate` parameter is an object that contains the updated
     * information for the user. It could include properties such as name, email, age, address, etc.
     * @returns the result of the update operation performed by the `this.dao.update(uid,
     * userToUpdate)` method.
     */
    async updateUser(uid, userToUpdate) {
        return await this.dao.update(uid, userToUpdate)
    }

    /**
     * The deleteUser function deletes a user with the specified uid using the dao object.
     * @param uid - The `uid` parameter is the unique identifier of the user that you want to delete.
     * @returns The `deleteUser` function is returning the result of the `delete` method call on the
     * `dao` object.
     */
    async deleteUser(uid) {
        return await this.dao.delete(uid)
    }
}