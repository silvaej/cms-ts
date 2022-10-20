import { UserRepositoryIf } from '@src/interfaces/repositories/user-repository'
import { SignupUseCase } from '@src/interfaces/use-cases/users'
import { UserRequestModel } from '@src/models/user'

export class Signup implements SignupUseCase {
    constructor(private repository: UserRepositoryIf) {}

    async execute(user: UserRequestModel): Promise<void> {
        const exists = (await this.repository.getUser(user.username)).acknowledged
        if (exists) throw new Error('Username already taken')
        const result = await this.repository.createUser(user)
        if (!result.acknowledged && result.error) throw new Error(result.error)
    }
}
