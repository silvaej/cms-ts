import { LoginResponseModel, UserResponseModel } from '@src/models/user'

export interface DBResponse<T extends UserResponseModel | Array<UserResponseModel>> {
    acknowledged: boolean
    data: T | null
    error: string | null
}
