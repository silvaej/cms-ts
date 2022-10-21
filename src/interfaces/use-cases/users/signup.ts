import { UserRequestModel, UserResponseModel } from '@src/models/user'

export interface SignupUseCase {
    execute(user: UserRequestModel): Promise<void>
}
