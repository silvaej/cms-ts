import { LoginResponseModel } from '@src/models/user'

export interface LoginUseCase {
    execute(username: string, password: string): Promise<LoginResponseModel>
}
