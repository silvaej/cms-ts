import { UserRequestModel, UserResponseModel } from '@src/models/user'
import { DBResponse } from '../responses/db-response'

export interface UserRepositoryIf {
    createUser(user: UserRequestModel): Promise<DBResponse<UserResponseModel>>
    getUser(username: string): Promise<DBResponse<UserResponseModel>>
}
