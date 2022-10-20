import { UserRepositoryIf } from '@src/interfaces/repositories/user-repository'
import { DBResponse } from '@src/interfaces/responses/db-response'
import { LoginUseCase } from '@src/interfaces/use-cases/users'
import { LoginResponseModel } from '@src/models/user'
import { verify } from '@src/utils/hash'

export class Login implements LoginUseCase {
    constructor(private repository: UserRepositoryIf) {}
    async execute(username: string, password: string): Promise<LoginResponseModel> {
        const user = await this.repository.getUser(username)
        if (!user.acknowledged && user.error) throw new Error(user.error)
        const hashedPassword = user.data!.password
        const auth = await verify(password, hashedPassword)
        if (!auth) throw new Error('Wrong Password')
        return {
            id: user.data!.id,
            name: `${user.data!.first} ${user.data!.last}`,
        }
    }
}
