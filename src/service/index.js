import { UserDaoMongo } from "../daos/Mongo/usersDaos.mongo.js"
import { UserRepository } from "../repositories/users.repository.js"

export const usersService = new UserRepository(new UserDaoMongo())

