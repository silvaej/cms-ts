import { DataSource } from '@src/data/interfaces/user-data-source'
import { UserRepositoryIf } from '@src/interfaces/repositories/user-repository'
import { DBResponse } from '@src/interfaces/responses/db-response'
import { UserRequestModel, UserResponseModel } from '@src/models/user'

export class UserRepository implements UserRepositoryIf {
    constructor(private source: DataSource) {}

    async createUser(user: UserRequestModel): Promise<DBResponse<UserResponseModel>> {
        return this.source.insertOne(user)
    }

    async getUser(username: string): Promise<DBResponse<UserResponseModel>> {
        return this.source.findOneByUsername(username)
    }
}
