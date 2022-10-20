import { UserRepositoryIf } from '@src/interfaces/repositories/user-repository'
import { SignupUseCase } from '@src/interfaces/use-cases/users'
import { UserRequestModel } from '@src/models/user'
import { encrypt } from '@src/utils/hash'

export class Signup implements SignupUseCase {
    constructor(private repository: UserRepositoryIf) {}

    async execute(user: UserRequestModel): Promise<void> {
        const exists = (await this.repository.getUser(user.username)).acknowledged
        if (exists) throw new Error('Username already taken')
        const hashedPassword = await encrypt(user.password)
        const hashedUser: UserRequestModel = {
            first: user.first,
            last: user.last,
            username: user.username,
            password: hashedPassword,
        }
        const result = await this.repository.createUser(hashedUser)
        if (!result.acknowledged && result.error) throw new Error(result.error)
    }
}
