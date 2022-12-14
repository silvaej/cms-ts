import { ContactRepositoryIf } from '@src/interfaces/repositories/contact-repository'
import { DeleteContactUseCase } from '@src/interfaces/use-cases/contacts'
import { validateId } from '@src/utils/validate'

export class DeleteContact implements DeleteContactUseCase {
    constructor(private repository: ContactRepositoryIf) {}
    async execute(id: string): Promise<void> {
        validateId(id)
        const result = await this.repository.deleteContact(id)
        if (!result.acknowledged) throw new Error(result.error!)
    }
}
